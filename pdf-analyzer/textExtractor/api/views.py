import os
import requests
from django.http import JsonResponse
from PyPDF2 import PdfReader
from django.conf import settings

def save_pdf_and_extract_text(request):
    # Get the PDF link from the request
    pdf_url = request.GET.get('url')
    if not pdf_url:
        return JsonResponse({'error': 'No PDF URL provided'}, status=400)

    try:
        # Download the PDF
        response = requests.get(pdf_url)
        response.raise_for_status()

        # Save the PDF locally
        filename = pdf_url.split('/')[-1] or 'downloaded.pdf'
        filepath = os.path.join(settings.PDF_STORAGE_DIR, filename)
        with open(filepath, 'wb') as pdf_file:
            pdf_file.write(response.content)

        # Extract text from the PDF
        reader = PdfReader(filepath)
        text = ''
        for page in reader.pages:
            text += page.extract_text()

        return JsonResponse({
            'message': 'PDF saved and text extracted successfully',
            'file_path': filepath,
            'extracted_text': text
        }, status=200)

    except requests.exceptions.RequestException as e:
        return JsonResponse({'error': f'Failed to download PDF: {str(e)}'}, status=500)
    except Exception as e:
        return JsonResponse({'error': f'Error processing PDF: {str(e)}'}, status=500)
