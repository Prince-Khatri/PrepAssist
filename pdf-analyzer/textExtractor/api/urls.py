from django.urls import path
from . import views 

urlpatterns = [
    path('extract-text/', views.process_pdf_and_send_text, name='extract_text'),
]
