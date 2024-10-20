import requests
from django.contrib.auth import authenticate, login
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_decode
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.generics import CreateAPIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView
from social_django.models import UserSocialAuth

from .serializers import RegisterSerializer, PasswordResetSerializer
from account.models import User

# Create your views here.

@api_view(['GET'])
def get_routes(request):
    routes = [
        {
            'Endpoint': '/api/sign-in/',
            'method': 'POST',
            'body': {'body': ""},
            'description': 'Authenticates and logs in a user'
        },
        {
            'Endpoint': '/api/register/',
            'method': 'POST',
            'body': {'body': ""},
            'description': 'Registers a new user to the database'
        },
        {
            'Endpoint': '/api/password-reset/',
            'method': 'POST',
            'body': {'body': ""},
            'description': 'Starts the password reset process and sends a reset password link'
        },
        {
            'Endpoint': 'api/password-reset-confirm/uidb64/token/',
            'method': 'POST',
            'body': {'body': ""},
            'description': 'Saves the new password'
        },
    ]

    return Response(routes)
 


@api_view(['POST'])
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
def password_reset_request(request):
    serializer = PasswordResetSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(request=request)
        return Response({'message': 'Password reset email has been sent.'}, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
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