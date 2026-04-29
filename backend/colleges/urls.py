from django.urls import path
from . import views

urlpatterns = [
    path('colleges/', views.get_colleges, name='college-list'),
    path('colleges/<int:pk>/', views.get_college, name='college-detail'),
    path('search/', views.search_colleges, name='college-search'),
    path('cities/', views.get_cities, name='college-cities'),
    path('courses/', views.get_courses, name='college-courses'),
    path('predict/', views.predict_colleges, name='college-predict'),
]