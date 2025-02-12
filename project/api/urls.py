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
    path('api/password-reset-confirm/<uidb64>/<token>/', views.password_reset_confirm, name='password_reset_confirm'),
    path('api/year-levels/<str:slug>/', views.year_levels, name='year_level'),
    path('api/year-levels/<str:subject_slug>/<str:grade_level_slug>/', views.year_level_courses, name="year_level_courses"),
    path('api/topics/<str:slug>/', views.topic, name='topics'),
    path('api/topics/<str:subject_slug>/<str:topic_slug>/', views.topic_courses, name='topic_courses'),
    path('api/quizzes/', views.quiz_list, name='quiz-list'),
    path('api/quizzes/<str:slug>/', views.quiz_detail, name='quiz-detail'),
    path('api/quizzes/<str:slug>/submit-question/', views.submit_question, name="submit-question"),
    path('api/quizzes/<str:slug>/submit/', views.submit_quiz, name='submit-quiz'),
    path('api/create-quiz/', views.create_quiz_with_questions, name='create_quiz'),
    path('api/get-student-statistics/', views.student_statistics, name="student_statistics"),
    path('api/get-student-statistics/weekly/', views.student_weekly_statistics, name="student_weekly_statistics"),
    path('api/get-subscription-plans/', views.subscription_plan_list, name="subsciption_plans"),
    path('api/initiate-payment/', views.initiate_payment, name="initiate_payment"),
    path('api/verify-payment/<str:reference_number>/', views.verify_payment, name='verify_payment')
]