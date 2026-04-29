"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
# from django.contrib import admin
# # from django.urls import path
# from django.urls import path, views

# urlpatterns = [
#     path('admin/', admin.site.urls),
#     path('colleges/', views.get_colleges),
#     path('search/', views.search_colleges),
# ]
from django.contrib import admin
from django.urls import path, include   # include add karo

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('colleges.urls')),  # 👈 IMPORTANT
]