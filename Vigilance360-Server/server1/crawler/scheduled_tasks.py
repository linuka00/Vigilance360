import os
import django
import schedule
import time
import requests
from django.core.wsgi import get_wsgi_application
from django.http import HttpRequest

# Set up Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'crawler.settings')
django.setup()
# application = get_wsgi_application()

# Import views here (direct import without relative path)


def your_task_function():
    # This is your scheduled task function
    from api import views
    endpoint_url = 'http://127.0.0.1:8000/sendData'
    # views.sendDataToHadoop()
    try:
        # Send data as JSON in the request body
        response = requests.get(endpoint_url)
        response.raise_for_status()
    except requests.exceptions.RequestException as e:
        print(f"Error: {e}")
    print("ok")


# Schedule the task to run every day at 12 P.M.
# schedule.every().day.at("12:00").do(your_task_function)
# Schedule the method call every second
# schedule.every(1).second.do(your_task_function)
# schedule.every(3).minutes.do(your_task_function)
schedule.every(10).seconds.do(your_task_function)


while True:
    schedule.run_pending()
    time.sleep(1)
