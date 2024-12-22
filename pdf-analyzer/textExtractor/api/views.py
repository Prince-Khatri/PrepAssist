import os
import logging
import tempfile
import requests
from typing import Optional
from django.http import JsonResponse, HttpRequest
from django.conf import settings
from PyPDF2 import PdfReader
from pdf2image import convert_from_path
import pytesseract
from PIL import Image, ImageEnhance, ImageFilter

# Configure logging
logger = logging.getLogger(__name__)

def extract_text_from_pdf(pdf_path: str) -> Optional[str]:
    try:
        # Read the PDF
        reader = PdfReader(pdf_path)
        embedded_text = ''.join([page.extract_text() for page in reader.pages if page.extract_text()])
        
        if embedded_text:
            return clean_extracted_text(embedded_text)

        # If no text, fallback to OCR
        logger.info("No embedded text found. Falling back to OCR...")
        pages = convert_from_path(pdf_path, dpi=600)  # Increased DPI for better OCR quality
        
        ocr_text = ''.join(ocr_page(page) for page in pages)
        
        return clean_extracted_text(ocr_text)

    except Exception as e:
        logger.error(f"Failed to process PDF: {str(e)}")
        return None

def ocr_page(page: Image.Image) -> str:
    # Preprocessing the page image to improve OCR accuracy
    page = page.convert('L')  # Convert to grayscale
    enhancer = ImageEnhance.Contrast(page)  # Enhance contrast
    page = enhancer.enhance(2)
    page = page.filter(ImageFilter.MedianFilter())  # Apply median filter to reduce noise
    
    return pytesseract.image_to_string(page)

def clean_extracted_text(text: str) -> str:
    # Clean text (e.g., remove unwanted characters)
    text = text.replace('\u2019', "'")  # Replace apostrophes from OCR
    text = text.replace('\u2013', '-')  # Replace en-dashes with regular dashes
    text = text.replace('\u2014', '--')  # Replace em-dashes with double dashes
    return text

def download_pdf(pdf_url: str) -> Optional[bytes]:
    try:
        response = requests.get(pdf_url)
        response.raise_for_status()
        return response.content
    except requests.exceptions.RequestException as e:
        logger.error(f"Failed to download PDF: {str(e)}")
        return None

def process_pdf_and_send_text(request: HttpRequest) -> JsonResponse:
    pdf_url = request.GET.get('url')
    if not pdf_url:
        return JsonResponse({'error': 'No PDF URL provided'}, status=400)

    pdf_content = download_pdf(pdf_url)
    if not pdf_content:
        return JsonResponse({'error': 'Failed to download PDF'}, status=500)

    try:
        with tempfile.NamedTemporaryFile(delete=False, suffix='.pdf') as temp_pdf:
            temp_pdf.write(pdf_content)
            temp_pdf_path = temp_pdf.name

        extracted_text = extract_text_from_pdf(temp_pdf_path)
        if extracted_text is None:
            return JsonResponse({'error': 'Failed to extract text from PDF'}, status=500)

        return JsonResponse({
            'extracted_text': extracted_text
        }, status=200)

    except Exception as e:
        logger.error(f"Error processing PDF: {str(e)}")
        return JsonResponse({'error': f'Error processing PDF: {str(e)}'}, status=500)

    finally:
        if os.path.exists(temp_pdf_path):
            os.remove(temp_pdf_path)
