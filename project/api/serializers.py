from rest_framework import serializers
from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.forms import PasswordResetForm
from account.models import User
from learning.models import Quiz, Question, Answer, StudentQuizAttempt, YearLevel, Course, Skill, Topic
from django.contrib.auth import get_user_model

User = get_user_model()

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    password2 = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = [
            'first_name',
            'last_name',
            'username',
            'email',
            'phone_number',
            'date_of_birth',
            'gender',
            'address',
            'country',
            'password',
            'password2'
        ]


    def validate(self, data):
        if User.objects.filter(username=data['username']).exists():
            raise serializers.ValidationError('User with this username already exists.')
        if User.objects.filter(email=data['email']).exists():
            raise serializers.ValidationError('User with this email already exists.')
        if User.objects.filter(phone_number=data['phone_number']).exists():
            raise serializers.ValidationError('User with this phone number already exists.')
        if data['password'] != data['password2']:
            raise serializers.ValidationError('Passwords do not match.')
        return data
    
    def create(self, validated_data):
        user = User(
            username = validated_data['username'],
            email = validated_data['email'],
            phone_number = validated_data['phone_number'],
            country = validated_data['country'],
            address = validated_data['address'],
            date_of_birth = validated_data['date_of_birth'],
            gender = validated_data['gender'],
        )

        user.set_password(validated_data['password']) # saving/hashing the password to the user
        user.save()
        return user
    

class PasswordResetSerializer(serializers.Serializer):
    email = serializers.EmailField()

    def validate_email(self, value):
        # chacking if the submitted email exists in the database
        if not User.objects.filter(email=value).exists():
            raise ValidationError(_("No user is registered with this email address."))
        return value
    
    def save(self, request):
        # creating the password reset form and initiating the reset process
        form = PasswordResetForm(data=self.validated_data)
        if form.is_valid():
            form.save(
                request=request,
                use_https=request.is_secure(),
                from_email=None,
                email_template_name='account/password_reset_email.html',
                subject_template_name='account/password_reset_subject.txt'
            )


class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = ['id', 'answer', 'is_correct']

class QuestionSerializer(serializers.ModelSerializer):
    answers = AnswerSerializer(many=True)

    class Meta:
        model = Question
        fields = ['id', 'question', 'question_type', 'answers']


class QuizSerializer(serializers.ModelSerializer):
    questions = QuestionSerializer(many=True)
    title = serializers.SerializerMethodField(read_only=True)
    subject = serializers.SerializerMethodField(read_only=True)
    grade_level = serializers.SerializerMethodField(read_only=True)
    slug = serializers.SerializerMethodField(read_only=True)
    attempt_completed = serializers.SerializerMethodField(read_only=True)
    current_question = serializers.SerializerMethodField(read_only=True)
    questions_answered = serializers.SerializerMethodField(read_only=True)
    time_spent = serializers.SerializerMethodField(read_only=True)


    class Meta:
        model = Quiz
        fields = ['id', 'title', 'subject', 'grade_level', 'slug', 'attempt_completed', 'current_question', 'questions_answered', 'time_spent', 'questions']

    def get_title(self, obj):
        try:
            return obj.__str__()
        except:
            return obj.id
        
    def get_slug(self, obj):
        return obj.get_slug

    
    def get_attempt_completed(self, obj):
        quiz_attempt = self.context.get('quiz_attempt')
        return quiz_attempt.completed
    
    def get_current_question(self, obj):
        quiz_attempt = self.context.get('quiz_attempt')
        return quiz_attempt.current_question
    
    def get_questions_answered(self, obj):
        quiz_attempt = self.context.get('quiz_attempt')
        return quiz_attempt.questions_answered
    
    def get_time_spent(self, obj):
        quiz_attempt = self.context.get('quiz_attempt')
        return quiz_attempt.time_spent
    
    def get_subject(self, obj):
        return obj.skill.course.subject.name
    
    def get_grade_level(self, obj):
        return obj.skill.course.grade_level.level

class StudentAttemptSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentQuizAttempt
        fields = ['user', 'quiz', 'questions_answered', 'score', 'completed_at']


class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ['name', 'order_number', 'description', 'slug']


class CourseSerializer(serializers.ModelSerializer):
    skills = SkillSerializer(many=True)
    class Meta:
        model = Course
        fields = ['id', 'name', 'order_number', 'skills']


class YearLevelSerializer(serializers.ModelSerializer):
    skills = serializers.SerializerMethodField()
    total_skills = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = YearLevel
        fields = ['id', 'level', 'total_skills', 'slug', 'order_number', 'skills']

    def get_skills(self, obj):
        slug = self.context.get('slug')
        courses = obj.year_level_courses.filter(subject__slug=slug)
        skills = Skill.objects.filter(course__in=courses).distinct().order_by('?')
        return SkillSerializer(skills, many=True).data[:6]
    
    def get_total_skills(self, obj):
        slug = self.context.get('slug')
        courses = obj.year_level_courses.filter(subject__slug=slug)
        skills = Skill.objects.filter(course__in=courses).distinct()
        return len(SkillSerializer(skills, many=True).data)


class TopicSerializer(serializers.ModelSerializer):
    skills = serializers.SerializerMethodField()
    total_skills = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = Topic
        fields = ['id', 'name', 'slug', 'total_skills', 'order_number', 'skills']

    def get_skills(self, obj):
        skills = Skill.objects.filter(related_topics__id=obj.id).distinct().order_by('?')
        return SkillSerializer(skills, many=True).data[:6]
    
    def get_total_skills(self, obj):
        skills = Skill.objects.filter(related_topics__id=obj.id).distinct()
        return len(SkillSerializer(skills, many=True).data)


class StudentStatisticSerializer(serializers.ModelSerializer):
    total_time_spent = serializers.SerializerMethodField(read_only=True)
    total_questions_answered = serializers.SerializerMethodField(read_only=True)
    total_quiz_completed = serializers.SerializerMethodField(read_only=True)
    recent_quizzes = serializers.SerializerMethodField()
    class Meta:
        model = StudentQuizAttempt
        fields = ['total_time_spent', 'total_questions_answered', 'total_quiz_completed', 'recent_quizzes']

    def get_total_time_spent(self, obj):
        return obj.get_total_time_spent
    
    def get_total_questions_answered(self, obj):
        return obj.get_total_question_answered
    
    def get_total_quiz_completed(self, obj):
        return obj.get_total_quiz_completed
    
    def get_recent_quizzes(self, obj):
        quizzes = Quiz.objects.filter(studentquizattempt__user=obj.user).distinct()
        serialized_data =  QuizSerializer(quizzes, context={'quiz_attempt': obj}, many=True).data[:8]
        filtered_data = [{'slug': quiz['slug'], 'title': quiz['title'], 'subject': quiz['subject'], 'grade_level': quiz['grade_level']} for quiz in serialized_data]
        return filtered_data
        