__author__ = 'adaro'
from django.contrib.auth import authenticate, logout


def authenticate_digi_user(username, password):
    user = authenticate(username=username, password=password)
    if user is not None:
        # the password verified for the user
        if user.is_active:
            print("User is valid, active and authenticated")
            return True
        else:
            print("The password is valid, but the account has been disabled!")
            return True
    else:
        # the authentication system was unable to verify the username and password
        print("The username and password were incorrect.")
        return False


def logout_digi_user(request):
    logout(request)