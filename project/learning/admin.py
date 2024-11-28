from django.contrib import admin
from .models import Course, Skill, Subject, YearLevel, Topic, Quiz, Question, Answer,StudentQuizAttempt
# Register your models here.
class SubjectAdmin(admin.ModelAdmin):
    list_display = ['name', 'tutor', 'description']
    search_fields = ['name', 'tutor__username']
    prepopulated_fields = {'slug': ['name']}

class YearLevelAdmin(admin.ModelAdmin):
    prepopulated_fields = {'slug': ['level']}
    list_display = ['level']


class TopicAdmin(admin.ModelAdmin):
    prepopulated_fields = {'slug': ['name']}
    list_display = ['name']


class SkillInline(admin.TabularInline):
    model = Skill
    fields = ['name']


class CourseAdmin(admin.ModelAdmin):
    inlines = [SkillInline]
    search_fields = ['subject__name', 'name', 'topic__name']
    list_display = ['name', 'subject', 'grade_level', 'total_students_enrolled']
    list_filter = ['subject', 'grade_level', 'date_created']

class SkillAdmin(admin.ModelAdmin):
    prepopulated_fields = {'slug': ['name']}
    search_fields = ['name', 'course__name']
    list_display = ['name', 'course', 'total_students_with_proficiency', 'date_created']
    list_filter = ['course', 'date_created']


class QuestionInline(admin.TabularInline):
    model = Question
    fields = ['quiz', 'question']


class AnswerInline(admin.TabularInline):
    model = Answer
    fields = ['question', 'answer', 'is_correct']


class QuizAdmin(admin.ModelAdmin):
    inlines = [QuestionInline]
    search_fields = ['skill__name', 'created_by__username']
    list_display = ['skill', 'created_by', 'created_at']
    list_filter = ['created_by', 'created_at']

class QuestionAdmin(admin.ModelAdmin):
    inlines = [AnswerInline]
    search_fields = ['question', 'quiz__skill__name']
    list_display = ['question', 'quiz']
    list_filter = ['quiz']

class AnswerAdmin(admin.ModelAdmin):
    search_fields = ['question__question', 'answer']
    list_display = ['answer', 'question', 'is_correct']
    list_filter = ['question', 'is_correct']

class StudentQuizAttemptAdmin(admin.ModelAdmin):
    search_fields = ['user__username', 'quiz__str__']
    list_display = ['user', 'quiz', 'questions_answered', 'score', 'completed_at']
    list_filter = ['quiz', 'completed_at']


admin.site.register(Subject, SubjectAdmin)
admin.site.register(YearLevel, YearLevelAdmin)
admin.site.register(Course, CourseAdmin)
admin.site.register(Skill, SkillAdmin)
admin.site.register(Topic, TopicAdmin)
admin.site.register(Quiz, QuizAdmin)
admin.site.register(Question, QuestionAdmin)
admin.site.register(Answer, AnswerAdmin)
admin.site.register(StudentQuizAttempt, StudentQuizAttemptAdmin)