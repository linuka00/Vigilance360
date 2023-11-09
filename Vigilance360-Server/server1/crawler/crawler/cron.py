# from django_cron import CronJobBase, Schedule
# from . import views

# class YourCronJob(CronJobBase):
#     RUN_EVERY_MINS = 60  # Change this to the desired interval (in minutes)
#     schedule = Schedule(run_every_mins=RUN_EVERY_MINS)
#     code = 'your_app.your_cron_job'  # A unique code for this cron job

#     def do(self):
#         # Call your API endpoint function here
#         views.sendDataToHadoop()

def cronTest():
    print("printed cron Test")
