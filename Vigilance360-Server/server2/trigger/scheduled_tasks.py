import os
import time
import django
import schedule
import requests
from django.http import HttpRequest  # Add this import statement
# Set up Django enviroment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'trigger.settings')
django.setup()  # Add this line to initialize the Django application


# def task_function():
#     from api import views
#     value = views.get_all_user_ids()

# def task_function():
#     from api import views
#     user_ids = views.get_all_user_ids()

#     # Loop through the list of user IDs
#     for user_id in user_ids:
#         # Perform actions for each user ID
#         views.trigger(HttpRequest(), userId=user_id)
#         print(f"Processing user ID: {user_id}")

def task_function():
    from api import views

    user_ids = views.get_all_user_ids()

    # Loop through the list of user IDs
    for user_id in user_ids:
        # Perform actions for each user ID by making a POST request to the trigger endpoint
        endpoint_url = 'http://127.0.0.1:8000/trigger'
        data = {
            'userId': user_id,
        }

        try:
            # Send data as JSON in the request body
            response = requests.post(endpoint_url, json=data)
            response.raise_for_status()
            print(f"Processing user ID: {user_id}")
        except requests.exceptions.RequestException as e:
            print(f"Error processing user ID: {user_id}. Error: {e}")


# Schedule the task to run every day at 4 A.M
schedule.every(30).seconds.do(task_function)

while True:
    schedule.run_pending()
    time.sleep(1)
