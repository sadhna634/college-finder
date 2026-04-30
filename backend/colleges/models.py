from django.db import models

class College(models.Model):
    name = models.CharField(max_length=200)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100, default='')
    course = models.CharField(max_length=200)
    description = models.TextField()
    fees = models.IntegerField(default=0)
    rating = models.FloatField(default=0.0)
    placement_percentage = models.FloatField(default=0.0)
    avg_salary = models.IntegerField(default=0)
    courses_offered = models.JSONField(default=list)
    reviews = models.JSONField(default=list)
    image_url = models.URLField(default='')
    established_year = models.IntegerField(default=2000)
    exam_accepted = models.JSONField(default=list)
    ownership = models.CharField(max_length=50, default='Private')
    
    def __str__(self):
        return self.name
