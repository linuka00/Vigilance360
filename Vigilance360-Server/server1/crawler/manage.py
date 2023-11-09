#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os
import sys
# import threading
# from api.scheduled_tasks import run_scheduled_task


def main():
    """Run administrative tasks."""
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'crawler.settings')
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc

    # Start the scheduled task in a separate thread
    # scheduler_thread = threading.Thread(target=run_scheduled_task)
    # scheduler_thread.start()

    execute_from_command_line(sys.argv)


if __name__ == '__main__':
    main()
