import requests
from django.conf import settings


# function to verify the payment from paystack
def verify_payment(reference_number):
    url = f"https://api.paystack.co/transaction/verify/{reference_number}"
    headers = {
        "Authorization": f"Bearer {settings.PAYSTACK_SECRET_KEY}"
    }


    response = requests.get(url, headers=headers)
    return response.json()