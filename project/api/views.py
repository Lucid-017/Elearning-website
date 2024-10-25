import requests
from django.contrib.auth import authenticate
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_decode
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView
from social_django.models import UserSocialAuth
from .serializers import RegisterSerializer, PasswordResetSerializer, QuizSerializer, YearLevelSerializer
from account.models import User
from learning.models import Quiz, Question, Answer, StudentQuizAttempt, Course, YearLevel, Subject

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
def quiz_list(request):
    quizzes = Quiz.objects.all()
    serializer = QuizSerializer(quizzes, many=True)
    print(serializer.data)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([AllowAny])
def quiz_detail(request, pk):
    try:
        quiz = Quiz.objects.get(pk=pk)
        serializer = QuizSerializer(quiz)
        print(serializer.data)
        return Response(serializer.data)
    except Quiz.DoesNotExist:
        return Response({'error': 'Quiz not found'}, status=status.HTTP_404_NOT_FOUND)
    


@api_view(['POST'])
@permission_classes([AllowAny])
def submit_question(request, pk):
    question_id = request.data.get('question_id')
    answer_id = request.data.get('answer')
    print('Question:', question_id, "   ", 'Answer:', answer_id)

    try:
        question = Question.objects.get(id=question_id)
        selected_answer = Answer.objects.get(id=answer_id, question=question)

        is_correct = selected_answer.is_correct

        return Response({
            'is_correct': is_correct
        })

    except Question.DoesNotExist:
        return Response({'error': 'Question not found'}, status=404)

    except Answer.DoesNotExist:
        return Response({'error': 'Answer not found'}, status=404)

    

@api_view(['POST'])
@permission_classes([AllowAny])
def submit_quiz(request, pk):
    try:
        quiz = Quiz.objects.get(pk=pk)
        user = request.user

        submitted_answers = request.data.get('answers', {})

        correct_count = 0
        questions_answered = 0
        total_questions = quiz.questions.count()

        for question in quiz.questions.all():
            submitted_answer_id = submitted_answers.get(str(question.id))
            if submitted_answer_id:
                selected_answer = Answer.objects.get(id=submitted_answer_id)
                questions_answered += 1
                if selected_answer.is_correct:
                    correct_count += 1

        score = (correct_count / total_questions) * 100
        StudentQuizAttempt.objects.create(user=user, quiz=quiz, questions_answered=questions_answered, score=score)
        return Response({'score': score}, status=status.HTTP_200_OK)

    except Quiz.DoesNotExist:
        return Response({'error': 'Quiz not found'}, status=status.HTTP_404_NOT_FOUND)