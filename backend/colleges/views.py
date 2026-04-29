from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Q
from .models import College
from .serializers import CollegeSerializer

@api_view(['GET'])
def get_colleges(request):
    """List all colleges with search, filters, and pagination"""
    try:
        # Get query parameters
        search = request.GET.get('search', '')
        city = request.GET.get('city', '')
        course = request.GET.get('course', '')
        min_fees = request.GET.get('min_fees', 0)
        max_fees = request.GET.get('max_fees', 0)
        min_rating = request.GET.get('min_rating', 0)
        page = int(request.GET.get('page', 1))
        per_page = int(request.GET.get('per_page', 12))
        
        # Base queryset
        colleges = College.objects.all()
        
        # Apply filters
        if search:
            colleges = colleges.filter(
                Q(name__icontains=search) | 
                Q(city__icontains=search) |
                Q(course__icontains=search)
            )
        
        if city:
            colleges = colleges.filter(city__icontains=city)
        
        if course:
            colleges = colleges.filter(course__icontains=course)
        
        if min_fees:
            colleges = colleges.filter(fees__gte=int(min_fees))
        
        if max_fees:
            colleges = colleges.filter(fees__lte=int(max_fees))
        
        if min_rating:
            colleges = colleges.filter(rating__gte=float(min_rating))
        
        # Get total count
        total = colleges.count()
        
        # Pagination
        start = (page - 1) * per_page
        end = start + per_page
        colleges = colleges[start:end]
        
        serializer = CollegeSerializer(colleges, many=True)
        
        return Response({
            'colleges': serializer.data,
            'pagination': {
                'page': page,
                'per_page': per_page,
                'total': total,
                'pages': (total + per_page - 1) // per_page
            }
        })
    except Exception as e:
        return Response(
            {'error': str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@api_view(['GET'])
def get_college(request, pk):
    """Get single college by ID with full details"""
    try:
        college = get_object_or_404(College, pk=pk)
        serializer = CollegeSerializer(college)
        return Response(serializer.data)
    except College.DoesNotExist:
        return Response(
            {'error': 'College not found'},
            status=status.HTTP_404_NOT_FOUND
        )
    except Exception as e:
        return Response(
            {'error': str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@api_view(['GET'])
def search_colleges(request):
    """Search and filter colleges by name and city"""
    try:
        name = request.GET.get('name', '')
        city = request.GET.get('city', '')
        
        colleges = College.objects.all()
        
        if name:
            colleges = colleges.filter(name__icontains=name)
        if city:
            colleges = colleges.filter(city__icontains=city)
            
        serializer = CollegeSerializer(colleges, many=True)
        return Response(serializer.data)
    except Exception as e:
        return Response(
            {'error': str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@api_view(['GET'])
def get_cities(request):
    """Get all unique cities"""
    try:
        cities = list(College.objects.values_list('city', flat=True).distinct())
        return Response({'cities': cities})
    except Exception as e:
        return Response(
            {'error': str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@api_view(['GET'])
def get_courses(request):
    """Get all unique courses"""
    try:
        courses = list(College.objects.values_list('course', flat=True).distinct())
        return Response({'courses': courses})
    except Exception as e:
        return Response(
            {'error': str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@api_view(['POST'])
def predict_colleges(request):
    """College predictor based on exam and rank"""
    try:
        exam = request.data.get('exam', 'JEE')
        rank = int(request.data.get('rank', 0))
        
        # Rule-based prediction based on rank ranges
        if rank <= 1000:
            colleges = College.objects.filter(fees__gte=100000).order_by('-rating')[:10]
        elif rank <= 5000:
            colleges = College.objects.filter(fees__gte=50000).order_by('-rating')[:10]
        elif rank <= 20000:
            colleges = College.objects.filter(fees__gte=30000).order_by('-rating')[:10]
        elif rank <= 50000:
            colleges = College.objects.filter(fees__gte=20000).order_by('-rating')[:10]
        else:
            colleges = College.objects.order_by('-rating')[:10]
        
        serializer = CollegeSerializer(colleges, many=True)
        return Response({
            'predicted_colleges': serializer.data,
            'input': {'exam': exam, 'rank': rank}
        })
    except Exception as e:
        return Response(
            {'error': str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )