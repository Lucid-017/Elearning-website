from django.urls import path
# from rest_framework_simplejwt.views import TokenObtainPairView
from . import views

urlpatterns = [
    path('apis/', views.get_routes, name='routes'),
    path('api/sign-in/', views.login_user, name='login_user'),
    # path('api/obtain-pair/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/google-login/', views.GoogleLogin.as_view(), name='google_login'),
    path('api/google-login/register/', views.CompleteGoogleRegistration.as_view(), name='google_complete_registeration'),
    path('api/register/', views.register_user, name='register_user'),
    path('api/password-reset/', views.password_reset_request, name="password_reset"),
    path('api/password-reset-confirm/<uidb64>/<token>/', views.password_reset_confirm, name='password_reset_confirm')
]