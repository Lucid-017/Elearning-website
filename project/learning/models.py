from django.db import models
from django.utils import timezone
from django.utils.text import slugify
from account.models import User

# Create your models here.
class Subject(models.Model):
    name = models.CharField(max_length=100)
    tutor = models.OneToOneField(User, on_delete=models.SET_NULL, null=True)
    description = models.TextField(blank=True, null=True)
    slug = models.SlugField(null=True, blank=True, unique=True)

    def __str__(self):
        return self.name
    
    def save(self, *args, **kwargs):
        if self.slug == "" or self.slug is None:
            self.slug = slugify(self.name)

        super(Subject, self).save(*args, **kwargs)

    

class Topic(models.Model):
    name = models.CharField(max_length=100)    

    def __str__(self):
        return self.name


class YearLevel(models.Model):
    level = models.CharField(max_length=10)

    def __str__(self):
        return self.level


class Course(models.Model):
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE, related_name="courses")
    topic = models.ForeignKey(Topic, null=True, on_delete=models.SET_NULL)
    name = models.CharField(max_length=100)
    grade_level = models.ForeignKey(YearLevel, on_delete=models.SET_NULL, null=True, related_name='year_level_courses')
    students_enrolled = models.ManyToManyField(User, blank=True)
    date_created = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.name

    def total_students_enrolled(self):
        return self.students_enrolled.count()

class Skill(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='skills')
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    students_with_proficiency = models.ManyToManyField(User, blank=True)
    date_created = models.DateTimeField(default=timezone.now)
    slug = models.SlugField(null=True, blank=True, unique=True)

    def __str__(self):
        return self.name
    
    def save(self, *args, **kwargs):
        if self.slug == "" or self.slug is None:
            self.slug = slugify(self.name)

        super(Skill, self).save(*args, **kwargs)

    def total_students_with_proficiency(self):
        return self.students_with_proficiency.count()

class Quiz(models.Model):
    skill = models.OneToOneField(Skill, on_delete=models.CASCADE)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = 'Quizzes'

    def __str__(self):
        return self.skill.name

class Question(models.Model):
    quiz = models.ForeignKey(Quiz, related_name='questions', on_delete=models.CASCADE)
    question = models.TextField(help_text="Write the question for the quiz")

    def __str__(self):
        return self.question

class Answer(models.Model):
    question = models.ForeignKey(Question, related_name='answers', on_delete=models.CASCADE)
    answer = models.CharField(max_length=255, help_text="Write the answer for the questions here")
    is_correct = models.BooleanField(default=False)

    def __str__(self):
        return self.answer

class StudentQuizAttempt(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE)
    questions_answered = models.IntegerField(default=0)
    score = models.FloatField()
    completed_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username}'s attempt at {self.quiz}"