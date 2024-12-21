from django.urls import path
from . import views 

urlpatterns = [
    path('extract-text/', views.save_pdf_and_extract_text, name='extract_text'),
]
