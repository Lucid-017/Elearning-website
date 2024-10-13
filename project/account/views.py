# from django.shortcuts import render, redirect
# from django.contrib import messages
# from django.contrib.auth.hashers import make_password
# from .models import User

# def register(request):
#     if request.method == 'POST':
#         # Retrieve data from the form
#         username = request.POST.get('username')
#         email = request.POST.get('email')
#         phone_number = request.POST.get('phone_number')
#         country = request.POST.get('country')
#         password1 = request.POST.get('password1')
#         password2 = request.POST.get('password2')

#         # Validate passwords
#         if password1 != password2:
#             messages.error(request, "Passwords do not match.")
#             return redirect('register')

#         # Create the user
#         try:
#             user = User(
#                 username=username,
#                 email=email,
#                 phone_number=phone_number,
#                 country=country,
#                 password=make_password(password1)  # Hash the password
#             )
#             user.save()
#             messages.success(request, 'Registration successful! You can now log in.')
#             return redirect('login')  # Redirect to the login page
#         except Exception as e:
#             messages.error(request, "There was an error with your registration. Please try again.")

#     return render(request, 'registration/register.html')