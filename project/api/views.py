import requests
from django.contrib.auth import authenticate, login
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_decode
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView

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
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'username': user.username
        }, status=status.HTTP_200_OK)
    else:
        return Response({'error': 'Invalid username or password'}, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['POST'])
def register_user(request):
    if request.method == "POST":
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'User registered successfully'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    



class GoogleLogin(APIView):
    def post(self, request):
        token = request.data.get('token')
        # Verify the token with Google
        try:
            response = requests.get(f'https://oauth2.googleapis.com/tokeninfo?id_token={token}')
            user_info = response.json()
            
            if 'email' not in user_info:
                return Response({'error': 'Invalid token'}, status=status.HTTP_400_BAD_REQUEST)

            email = user_info['email']
            name = user_info.get('name', '')
            picture = user_info.get('picture', '')

            # Get or create user
            user, created = User.objects.get_or_create(email=email, defaults={'username': name})
            if created:
                user.first_name = name.split()[0]
                user.last_name = name.split()[1] if len(name.split()) > 1 else ''
                user.save()

            # Create JWT tokens
            refresh = RefreshToken.for_user(user)

            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'user': {
                    'email': user.email,
                    'name': user.get_full_name(),
                    'picture': picture
                }
            })
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


    
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