import os
import sys
import django

sys.path.append(os.path.dirname(os.path.abspath(__file__)))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from colleges.models import College

# Comprehensive college data
colleges_data = [
    {
        "name": "Indian Institute of Technology Delhi",
        "city": "New Delhi",
        "state": "Delhi",
        "course": "B.Tech Computer Science",
        "description": "IIT Delhi is one of the premier engineering institutions in India.",
        "fees": 220000,
        "rating": 4.8,
        "placement_percentage": 98.5,
        "avg_salary": 2500000,
        "courses_offered": ["B.Tech CSE", "B.Tech ECE", "B.Tech ME", "M.Tech", "PhD"],
        "reviews": [{"user": "Amit S.", "rating": 5, "comment": "Excellent placements!"}],
        "established_year": 1961,
        "exam_accepted": ["JEE Advanced", "GATE"],
        "ownership": "Government"
    },
    {
        "name": "Indian Institute of Technology Bombay",
        "city": "Mumbai",
        "state": "Maharashtra",
        "course": "B.Tech Computer Science",
        "description": "IIT Bombay is the oldest IIT with exceptional academic standards.",
        "fees": 210000,
        "rating": 4.9,
        "placement_percentage": 99.2,
        "avg_salary": 2800000,
        "courses_offered": ["B.Tech CSE", "B.Tech ECE", "B.Tech ME", "MBA", "PhD"],
        "reviews": [{"user": "Rahul K.", "rating": 5, "comment": "Best IIT!"}],
        "established_year": 1958,
        "exam_accepted": ["JEE Advanced", "GATE"],
        "ownership": "Government"
    },
    {
        "name": "Indian Institute of Technology Madras",
        "city": "Chennai",
        "state": "Tamil Nadu",
        "course": "B.Tech Computer Science",
        "description": "IIT Madras is known for excellent research output.",
        "fees": 210000,
        "rating": 4.8,
        "placement_percentage": 98.8,
        "avg_salary": 2600000,
        "courses_offered": ["B.Tech CSE", "B.Tech ECE", "B.Tech ME", "PhD"],
        "reviews": [{"user": "Vijay P.", "rating": 5, "comment": "Great research!"}],
        "established_year": 1959,
        "exam_accepted": ["JEE Advanced", "GATE"],
        "ownership": "Government"
    },
    {
        "name": "Birla Institute of Technology and Science Pilani",
        "city": "Pilani",
        "state": "Rajasthan",
        "course": "B.Tech Computer Science",
        "description": "BITS Pilani is a premier private engineering university.",
        "fees": 450000,
        "rating": 4.6,
        "placement_percentage": 96.5,
        "avg_salary": 2200000,
        "courses_offered": ["B.Tech CSE", "B.Tech ECE", "B.Tech ME", "MBA", "PhD"],
        "reviews": [{"user": "Arjun M.", "rating": 4, "comment": "Great placements!"}],
        "established_year": 1964,
        "exam_accepted": ["BITSAT", "JEE Advanced"],
        "ownership": "Private"
    },
    {
        "name": "Vellore Institute of Technology",
        "city": "Vellore",
        "state": "Tamil Nadu",
        "course": "B.Tech Computer Science",
        "description": "VIT is one of the largest private engineering universities.",
        "fees": 350000,
        "rating": 4.5,
        "placement_percentage": 95.8,
        "avg_salary": 1800000,
        "courses_offered": ["B.Tech CSE", "B.Tech ECE", "B.Tech ME", "MBA", "PhD"],
        "reviews": [{"user": "Karthik R.", "rating": 4, "comment": "Good placements!"}],
        "established_year": 1984,
        "exam_accepted": ["VITEEE", "JEE Main"],
        "ownership": "Private"
    },
    {
        "name": "National Institute of Technology Trichy",
        "city": "Tiruchirappalli",
        "state": "Tamil Nadu",
        "course": "B.Tech Computer Science",
        "description": "NIT Trichy is one of the top NITs in India.",
        "fees": 150000,
        "rating": 4.4,
        "placement_percentage": 94.2,
        "avg_salary": 1600000,
        "courses_offered": ["B.Tech CSE", "B.Tech ECE", "B.Tech ME", "M.Tech", "PhD"],
        "reviews": [{"user": "Prashant S.", "rating": 4, "comment": "Good placements!"}],
        "established_year": 1964,
        "exam_accepted": ["JEE Main"],
        "ownership": "Government"
    },
    {
        "name": "Indian Institute of Technology Hyderabad",
        "city": "Hyderabad",
        "state": "Telangana",
        "course": "B.Tech Computer Science",
        "description": "IIT Hyderabad is known for research in emerging technologies.",
        "fees": 200000,
        "rating": 4.5,
        "placement_percentage": 96.8,
        "avg_salary": 2300000,
        "courses_offered": ["B.Tech CSE", "B.Tech ECE", "B.Tech ME", "M.Tech", "PhD"],
        "reviews": [{"user": "Harsha V.", "rating": 5, "comment": "Great AI/ML!"}],
        "established_year": 2008,
        "exam_accepted": ["JEE Advanced", "GATE"],
        "ownership": "Government"
    },
    {
        "name": "Delhi Technological University",
        "city": "New Delhi",
        "state": "Delhi",
        "course": "B.Tech Computer Science",
        "description": "DTU is a leading technical university in Delhi.",
        "fees": 180000,
        "rating": 4.3,
        "placement_percentage": 93.5,
        "avg_salary": 1500000,
        "courses_offered": ["B.Tech CSE", "B.Tech ECE", "B.Tech ME", "MBA"],
        "reviews": [{"user": "Vikram B.", "rating": 4, "comment": "Good placements!"}],
        "established_year": 1941,
        "exam_accepted": ["JEE Main", "DTU CET"],
        "ownership": "Government"
    },
    {
        "name": "Thapar Institute of Engineering and Technology",
        "city": "Patiala",
        "state": "Punjab",
        "course": "B.Tech Computer Science",
        "description": "Thapar University is a premier private engineering college.",
        "fees": 380000,
        "rating": 4.4,
        "placement_percentage": 94.8,
        "avg_salary": 1700000,
        "courses_offered": ["B.Tech CSE", "B.Tech ECE", "B.Tech ME", "MBA", "PhD"],
        "reviews": [{"user": "Gurpreet S.", "rating": 4, "comment": "Excellent record!"}],
        "established_year": 1956,
        "exam_accepted": ["JEE Main", "Thapar JEE"],
        "ownership": "Private"
    },
    {
        "name": "Manipal Academy of Higher Education",
        "city": "Manipal",
        "state": "Karnataka",
        "course": "B.Tech Computer Science",
        "description": "MAHE is a premier private university in Karnataka.",
        "fees": 400000,
        "rating": 4.3,
        "placement_percentage": 93.2,
        "avg_salary": 1650000,
        "courses_offered": ["B.Tech CSE", "B.Tech ECE", "B.Tech ME", "MBBS"],
        "reviews": [{"user": "Aditya R.", "rating": 4, "comment": "Great campus!"}],
        "established_year": 1953,
        "exam_accepted": ["MET", "JEE Main"],
        "ownership": "Private"
    },
    {
        "name": "College of Engineering Guindy",
        "city": "Chennai",
        "state": "Tamil Nadu",
        "course": "B.Tech Computer Science",
        "description": "CEG is one of the oldest engineering colleges in Asia.",
        "fees": 80000,
        "rating": 4.5,
        "placement_percentage": 95.5,
        "avg_salary": 1800000,
        "courses_offered": ["B.Tech CSE", "B.Tech ECE", "B.Tech ME", "M.Tech", "PhD"],
        "reviews": [{"user": "Kavin P.", "rating": 5, "comment": "Oldest college!"}],
        "established_year": 1794,
        "exam_accepted": ["TNEA", "JEE Main"],
        "ownership": "Government"
    },
    {
        "name": "Jadavpur University",
        "city": "Kolkata",
        "state": "West Bengal",
        "course": "B.Tech Computer Science",
        "description": "Jadavpur University is a premier technical university.",
        "fees": 12000,
        "rating": 4.4,
        "placement_percentage": 94.0,
        "avg_salary": 1550000,
        "courses_offered": ["B.Tech CSE", "B.Tech ECE", "B.Tech ME", "M.Tech", "PhD"],
        "reviews": [{"user": "Sayan D.", "rating": 4, "comment": "Great research!"}],
        "established_year": 1955,
        "exam_accepted": ["WBJEE", "JEE Main"],
        "ownership": "Government"
    }
]

# Clear and add new colleges
College.objects.all().delete()

added = 0
for college_data in colleges_data:
    College.objects.create(**college_data)
    added += 1
    print(f"✓ Added: {college_data['name']}")

print(f"\n✓ Successfully added {added} colleges!")
print(f"Total: {College.objects.count()}")