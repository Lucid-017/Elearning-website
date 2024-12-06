from datetime import timedelta
from django.db import models
from django.db.models import Sum
from django.utils import timezone
from django.utils.text import slugify
from account.models import User
from api.utils import format_quiz_duration, format_total_time_spent

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
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE, null=True)
    name = models.CharField(max_length=100, unique=True)
    order_number = models.IntegerField(unique=True, null=True)
    slug = models.SlugField(unique=True, null=True)

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name
    
    def save(self, *args, **kwargs):
        if self.slug == "" or self.slug is None:
            self.slug = slugify(self.name)

        super(Topic, self).save(*args, **kwargs)


class YearLevel(models.Model):
    level = models.CharField(max_length=10)
    order_number = models.CharField(max_length=2, unique=True, null=True)
    slug = models.SlugField(unique=True, null=True)


    class Meta:
        ordering = ['id']

    def __str__(self):
        return self.level


class Course(models.Model):
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE, related_name="courses")
    topic = models.ForeignKey(Topic, on_delete=models.SET_NULL,null=True, related_name="topics")
    name = models.CharField(max_length=100)
    grade_level = models.ForeignKey(YearLevel, on_delete=models.SET_NULL, null=True, related_name='year_level_courses')
    order_number = models.CharField(max_length=1, null=True)
    students_enrolled = models.ManyToManyField(User, blank=True)
    date_created = models.DateTimeField(default=timezone.now)

    class Meta:
        ordering = ['grade_level', 'order_number']

    def __str__(self):
        return self.name

    def total_students_enrolled(self):
        return self.students_enrolled.count()

class Skill(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='skills')
    related_topics = models.ManyToManyField(Topic, blank=True)
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    students_with_proficiency = models.ManyToManyField(User, blank=True)
    order_number = models.IntegerField(null=True)
    date_created = models.DateTimeField(default=timezone.now)
    slug = models.SlugField(null=True, blank=True, unique=True)

    class Meta:
        ordering = ['course', 'order_number']

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
    
    @property
    def get_slug(self):
        return self.skill.slug
    

QUESTION_TYPES = [
    ('Multiple Choice', 'Multiple Choice'),
    ('Fill in the Blank', 'Fill in the Blank')
]


class Question(models.Model):
    quiz = models.ForeignKey(Quiz, related_name='questions', on_delete=models.CASCADE)
    question = models.TextField(help_text="Write the question for the quiz")
    question_type = models.CharField(max_length=20, choices=QUESTION_TYPES, default='Fill in the Blank', help_text="Multiple Choice: Use when the question requires options to be presented, Fill in the Blank: Use for questions needing a text respons")
    order_number = models.IntegerField(default=0)
    

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
    current_question = models.IntegerField(default=0)
    total_questions = models.IntegerField(default=0)
    questions_answered = models.IntegerField(default=0)
    score = models.FloatField(null=True)
    completed = models.BooleanField(default=False)
    time_spent = models.DurationField(default=timedelta(seconds=0), help_text="Duration of the quiz attempt (e.g., HH:MM:SS)")
    completed_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username}'s attempt at {self.quiz}"
    
    @property
    def formatted_time_spent(self):
        return format_quiz_duration(self.time_spent)
   
    @property
    def get_total_time_spent(self):
        total_time = StudentQuizAttempt.objects.filter(user=self.user).aggregate(Sum('time_spent'))['time_spent__sum']
        print(total_time)
        return format_total_time_spent(total_time) or timedelta(seconds=0)  # Return 0 if no attempts exist
    
    @property
    def get_total_question_answered(self):
        total_questions = StudentQuizAttempt.objects.filter(user=self.user, completed=True).aggregate(Sum('questions_answered'))['questions_answered__sum']
        return total_questions or 0 # Return 0 if no attempts exist
    
    @property
    def get_total_quiz_completed(self):
        total_quiz = StudentQuizAttempt.objects.filter(user=self.user, completed=True).count()
        return total_quiz
