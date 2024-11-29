from datetime import timedelta
import requests
from django.contrib.auth import authenticate
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_decode
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.decorators import api_view, permission_classes
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import AllowAny
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView
from social_django.models import UserSocialAuth
from .serializers import RegisterSerializer, PasswordResetSerializer, QuizSerializer, YearLevelSerializer, TopicSerializer, CourseSerializer
from account.models import User
from learning.models import Quiz, Question, Answer, StudentQuizAttempt, Course, YearLevel, Subject, Topic, Skill

# Create your views here.

# auth views

@api_view(['GET'])
@permission_classes([AllowAny])
def get_routes(request):
    routes = [
        {
            'Endpoint': '/api/sign-in/',
            'method': 'POST',
            'description': 'Authenticates and logs in a user'
        },
        {
            'Endpoint': '/api/register/',
            'method': 'POST',
            'description': 'Registers a new user to the database'
        },
        {
            'Endpoint': '/api/password-reset/',
            'method': 'POST',
            'description': 'Starts the password reset process and sends a reset password link'
        },
        {
            'Endpoint': 'api/password-reset-confirm/uidb64/token/',
            'method': 'POST',
            'description': 'Saves the new password'
        },
        {
            'Endpoint': 'api/year-levels/<str:slug>/',
            'method': 'GET',
            'description': 'Lists all the year level and skills for a particular subject'
        },
        {
            'Endpoint': 'api/year-levels/<str:subject_slug>/<str:grade_level_slug>/',
            'method': 'GET',
            'description': 'Lists all the courses and skills for a particular year level'
        },
        {
            'Endpoint': 'api/topics/<str:slug>/',
            'method': 'GET',
            'description': 'Lists all the courses and skills for a particular subject'
        },
        {
            'Endpoint': 'api/topics/<str:subject_slug>/<str:topic_slug>/',
            'method': 'GET',
            'description': 'Lists all the courses and skills for a particular topic'
        },
        {
            'Endpoint': 'api/quizzes/',
            'method': 'GET',
            'description': 'Lists al quizzes'
        },
        {
            'Endpoint': 'api/quizzes/<int:pk>/',
            'method': 'GET',
            'description': 'Gets all the questions and anser of a particular quiz via primary key'
        },
        {
            'Endpoint': 'api/quizzes/<int:pk>/submit-question/',
            'method': 'POST',
            'description': 'Submits a questions in a quiz'
        },
        {
            'Endpoint': 'api/quizzes/<int:pk>/submit/',
            'method': 'POST',
            'description': 'Submits an entire quiz'
        },

    ]

    return Response(routes)
 

#  Authentication views


@api_view(['POST'])
@permission_classes([AllowAny])
def login_user(request):
    username = request.data.get('username')
    password = request.data.get('password')

    user = authenticate(request, username=username, password=password)


    if user is not None:
         # Generate JWT token and login user
        refresh = RefreshToken.for_user(user)
        
        return Response({
            'refresh_token': str(refresh),
            'access_token': str(refresh.access_token),
            'username': user.username
        }, status=status.HTTP_200_OK)
    else:
        return Response({'error': 'Invalid username or password'}, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    if request.method == "POST":
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            # Generate JWT token and login user
            refresh = RefreshToken.for_user(user)

            return Response({
                'message': 'User registered successfully',
                'refresh_token': str(refresh),
                'access_token': str(refresh.access_token),
                'username': user.username
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    



class GoogleLogin(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        token = request.data.get('token')
        try:
            # Verify the Google token with Google
            response = requests.get(f'https://oauth2.googleapis.com/tokeninfo?id_token={token}')
            user_info = response.json()

            if 'email' not in user_info:
                return Response({'error': 'Invalid token'}, status=status.HTTP_400_BAD_REQUEST)

            email = user_info['email']
            name = user_info.get('name', '')
            first_name, last_name = name.split(' ') if ' ' in name else (name, '')
            picture = user_info.get('picture', '')

            # Check if user already has a social auth association with Google
            user_social_auth = UserSocialAuth.objects.filter(provider='google-oauth2', uid=email).first()

            if user_social_auth:
                # User exists, get the associated user
                user = user_social_auth.user
                refresh = RefreshToken.for_user(user)
                return Response({
                    'refresh_token': str(refresh),
                    'access_token': str(refresh.access_token),
                    'username': user.username,
                    'user_exists': True,  # Existing user flag
                    'user': {
                        'email': user.email,
                        'first_name': user.first_name,
                        'last_name': user.last_name,
                    }
                }, status=status.HTTP_200_OK)

            # Check if user exists but doesn't have Google social auth yet
            try:
                user = User.objects.get(email=email)
                # Create a social auth entry for this user
                UserSocialAuth.objects.create(user=user, provider='google-oauth2', uid=email)
                refresh = RefreshToken.for_user(user)
                return Response({
                    'refresh_token': str(refresh),
                    'access_token': str(refresh.access_token),
                    'username': user.username,
                    'user_exists': True,  # Existing user flag
                    'user': {
                        'email': user.email,
                        'first_name': user.first_name,
                        'last_name': user.last_name,
                    }
                }, status=status.HTTP_200_OK)

            except User.DoesNotExist:
                # If user does not exist, return Google info for registration
                return Response({
                    'user_exists': False,
                    'email': email,
                    'first_name': first_name,
                    'last_name': last_name,
                })

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        

class CompleteGoogleRegistration(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        # Get the data from the request
        first_name = request.data.get('first_name')
        last_name = request.data.get('last_name')
        username = request.data.get('username')
        email = request.data.get('email')
        phone_number = request.data.get('phone_number')
        date_of_birth = request.data.get('date_of_birth')
        address = request.data.get('address')
        country = request.data.get('country')

        try:
            # Check if the user already exists (should not happen)
            if User.objects.filter(email=email).exists():
                return Response({'error': 'User with this email already exists.'}, status=status.HTTP_400_BAD_REQUEST)

            # Create the new user
            user = User.objects.create(
                first_name=first_name,
                last_name=last_name,
                username=username,
                email=email,
                phone_number=phone_number,
                date_of_birth=date_of_birth,
                address=address,
                country=country
            )
            user.set_unusable_password()  # No password needed for Google login
            user.save()

            # Link Google account with the user in UserSocialAuth
            UserSocialAuth.objects.create(user=user, provider='google-oauth2', uid=email)

            # Create JWT tokens for the user
            refresh = RefreshToken.for_user(user)

            return Response({
                'refresh_token': str(refresh),
                'access_token': str(refresh.access_token),
                'username': user.username,
                'user': {
                    'email': user.email,
                    'first_name': user.first_name,
                    'last_name': user.last_name,
                }
            }, status=status.HTTP_201_CREATED)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


    
@api_view(['POST'])
@permission_classes([AllowAny])
def password_reset_request(request):
    serializer = PasswordResetSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(request=request)
        return Response({'message': 'Password reset email has been sent.'}, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([AllowAny])
def password_reset_confirm(request, uidb64, token):
    try:
        uid = urlsafe_base64_decode(uidb64).decode()
        user = User.objects.get(pk=uid)
    except (TypeError, ValueError, OverflowError, User.DoesNotExist):
        user = None

    if user is not None and default_token_generator.check_token(user, token):
        new_password = request.data.get('new_password')
        confirm_password = request.data.get('confirm_password')

        if new_password != confirm_password:
            return Response({"error": "Passwords do not match"}, status=status.HTTP_400_BAD_REQUEST)

        # Set the new password
        user.set_password(new_password)
        user.save()
        # user.password = make_password(new_password)

        return Response({"message": "Password has been reset successfully"}, status=status.HTTP_200_OK)
    else:
        return Response({"error": "Invalid token or user"}, status=status.HTTP_400_BAD_REQUEST)
    


# Learning views
@api_view(['GET'])
@permission_classes([AllowAny])
def year_levels(request, slug):
    try:
        subject = Subject.objects.get(slug=slug)
    except Subject.DoesNotExist:
        return Response({'error': 'Subject not found'}, status=status.HTTP_404_NOT_FOUND)
    
    year_levels = YearLevel.objects.all()
    serializer = YearLevelSerializer(year_levels, many=True, context={'slug': slug})
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([AllowAny])
def topic(request, slug):
    try:
        subject = Subject.objects.get(slug=slug)
    except Subject.DoesNotExist:
        return Response({'error': 'Subject not found'}, status=status.HTTP_404_NOT_FOUND)
    
    topics = Topic.objects.filter(subject=subject)
    serializer = TopicSerializer(topics, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([AllowAny])
def year_level_courses(request, subject_slug, grade_level_slug):
    try:
        subject = Subject.objects.get(slug=subject_slug)
        grade_level = YearLevel.objects.get(slug=grade_level_slug)
    except (Subject.DoesNotExist, YearLevel.DoesNotExist):
        return Response({'error': 'Subject or grade level not found'}, status=status.HTTP_404_NOT_FOUND)
    
    courses = Course.objects.filter(subject=subject, grade_level=grade_level)
    serializer = CourseSerializer(courses, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([AllowAny])
def topic_courses(request, subject_slug, topic_slug):
    try:
        subject = Subject.objects.get(slug=subject_slug)
        topic = Topic.objects.get(subject=subject, slug=topic_slug)
    except (Subject.DoesNotExist, Topic.DoesNotExist):
        return Response({'error': 'Subject or topic not found'}, status=status.HTTP_404_NOT_FOUND)
    
    courses = Course.objects.filter(subject=subject, topic=topic)
    serializer = CourseSerializer(courses, many=True)
    return Response(serializer.data)



@api_view(['GET'])
@permission_classes([AllowAny])
def quiz_list(request):
    quizzes = Quiz.objects.all()
    serializer = QuizSerializer(quizzes, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def quiz_detail(request, slug):
    try:
        skill = Skill.objects.get(slug=slug)
        quiz = skill.quiz
        quiz_attempt, created = StudentQuizAttempt.objects.get_or_create(user=request.user, quiz=quiz, completed=False)
        if created:
            total_question = quiz.questions.all().count()
            quiz_attempt.total_questions = total_question
            quiz_attempt.save()
        serializer = QuizSerializer(quiz, context={'quiz_attempt': quiz_attempt})
        print(serializer.data['attempt_completed'])
        return Response(serializer.data)
    except (Skill.DoesNotExist, Quiz.DoesNotExist):
        return Response({'error': 'Quiz not found'}, status=status.HTTP_404_NOT_FOUND)
    


@api_view(['POST'])
def submit_question(request, slug):
    question_id = request.data.get('question_id')
    answer_id = request.data.get('answer')
    attempt_id = request.data.get('attempt_id')
    print('Question:', question_id, "   ", 'Answer:', answer_id)

    try:
        question = Question.objects.get(id=question_id)
        print('attempt_id', attempt_id)
        quiz_attempt, created = StudentQuizAttempt.objects.get_or_create(user=request.user, quiz=question.quiz, completed=False)
        if created:
            total_question = question.quiz.questions.all().count()
            quiz_attempt.total_questions = total_question
        if question.question_type == 'Multiple Choice':
            selected_answer = Answer.objects.get(id=answer_id, question=question)

            is_correct = selected_answer.is_correct
        else:
            correct_answer = Answer.objects.filter(question=question, is_correct=True).first()
            if correct_answer.answer == answer_id:
                is_correct = True
            else:
                is_correct = False
        
        
        if is_correct:
            quiz_attempt.questions_answered += 1
            score =  (quiz_attempt.questions_answered / quiz_attempt.total_questions) * 100
            quiz_attempt.score = round(score, 2)
            if not quiz_attempt.questions_answered >= quiz_attempt.total_questions:
                quiz_attempt.current_question = quiz_attempt.questions_answered + 1
        quiz_attempt.save()
        return Response({
            'is_correct': is_correct,
            'quiz_attempt_id': quiz_attempt.id,
            'score': quiz_attempt.score,
            'total_answered': quiz_attempt.questions_answered,
            'current_question': quiz_attempt.current_question
        })

    except (Question.DoesNotExist, Answer.DoesNotExist):
        return Response({'error': 'Question or answers not found'}, status=404)



    

@api_view(['POST'])
def submit_quiz(request, slug):
    try:
        skill = Skill.objects.get(slug=slug)
        quiz = skill.quiz
        user = request.user
        duration = request.data.get('time_spent', 0)
        quiz_duration = timedelta(minutes=duration)

        student_attempt = StudentQuizAttempt.objects.get(user=user, quiz=quiz, completed=False)
        student_attempt.completed = True
        student_attempt.time_spent = quiz_duration
        student_attempt.save()
        return Response({
            'score': student_attempt.score,
            'time_spent': student_attempt.formatted_time_spent,
            'question_answered': f"{student_attempt.questions_answered} / {student_attempt.total_questions}"
        
        }, status=status.HTTP_200_OK)

    except Quiz.DoesNotExist:
        return Response({'error': 'Quiz not found'}, status=status.HTTP_404_NOT_FOUND)
    

@api_view(['GET'])
@permission_classes([AllowAny])
def create_quiz_with_questions(request):
    skill = Skill.objects.get(name="Mental Addition")

#     quiz_data = {
#     'skill_id': skill.id,  # Replace with the actual skill ID for "Counting to 100"
#     "questions": [
#         {
#             "question": "What is 5 + 3?",
#             "answers": [{"answer": "8", "is_correct": True}],
#             "question_type": "Fill in the Blank"
#         },
#         {
#             "question": "Calculate 7 + 2.",
#             "answers": [{"answer": "9", "is_correct": True}],
#             "question_type": "Fill in the Blank"
#         },
#         {
#             "question": "What is the sum of 4 + 6?",
#             "answers": [{"answer": "10", "is_correct": True}],
#             "question_type": "Fill in the Blank"
#         },
#         {
#             "question": "What is 9 + 5?",
#             "answers": [{"answer": "14", "is_correct": True}],
#             "question_type": "Fill in the Blank"
#         },
#         {
#             "question": "Add 8 + 7.",
#             "answers": [{"answer": "15", "is_correct": True}],
#             "question_type": "Fill in the Blank"
#         },
#         {
#             "question": "What is 3 + 4?",
#             "answers": [{"answer": "7", "is_correct": True}],
#             "question_type": "Fill in the Blank"
#         },
#         {
#             "question": "Find the sum of 6 + 9.",
#             "answers": [{"answer": "15", "is_correct": True}],
#             "question_type": "Fill in the Blank"
#         },
#         {
#             "question": "What is the result of 2 + 8?",
#             "answers": [{"answer": "10", "is_correct": True}],
#             "question_type": "Fill in the Blank"
#         },
#         {
#             "question": "Calculate 5 + 9.",
#             "answers": [{"answer": "14", "is_correct": True}],
#             "question_type": "Fill in the Blank"
#         },
#         {
#             "question": "Add 12 + 7.",
#             "answers": [{"answer": "19", "is_correct": True}],
#             "question_type": "Fill in the Blank"
#         },
#         {
#             "question": "What is 15 + 3?",
#             "answers": [{"answer": "18", "is_correct": True}],
#             "question_type": "Fill in the Blank"
#         },
#         {
#             "question": "Find the sum of 8 + 10.",
#             "answers": [{"answer": "18", "is_correct": True}],
#             "question_type": "Fill in the Blank"
#         },
#         {
#             "question": "What is 11 + 9?",
#             "answers": [{"answer": "20", "is_correct": True}],
#             "question_type": "Fill in the Blank"
#         },
#         {
#             "question": "Add 4 + 5 + 6.",
#             "answers": [{"answer": "15", "is_correct": True}],
#             "question_type": "Fill in the Blank"
#         },
#         {
#             "question": "What is the sum of 7 + 8 + 5?",
#             "answers": [{"answer": "20", "is_correct": True}],
#             "question_type": "Fill in the Blank"
#         }
#     ]
# }



#     quiz = Quiz.objects.create(
#         skill_id=quiz_data['skill_id'],
#         created_by= User.objects.get(username='Quest')
#     )
    
#     for question_data in quiz_data['questions']:
#         question = Question.objects.create(
#             quiz=quiz,
#             question=question_data['question'],
#             question_type=question_data['question_type']
#         )
        
#         for answer_data in question_data['answers']:
#             is_correct = answer_data.get('is_correct', False)
#             if question_data['question_type'] == 'Fill in the Blank':
#                 is_correct = True
            
#             Answer.objects.create(
#                 question=question,
#                 answer=answer_data['answer'],
#                 is_correct=is_correct
#             )
            
    return Response({"message": "Quiz created successfully"}, status=201)