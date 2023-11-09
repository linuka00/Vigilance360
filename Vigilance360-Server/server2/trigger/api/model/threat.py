from django.db import models
class Threat(models.Model):
    id=models.CharField(max_length=100)
    user_id=models.CharField(max_length=100)
    name=models.CharField(max_length=100)
    description=models.CharField(max_length=100)
    platform=models.CharField(max_length=100)
    platform_id=models.CharField(max_length=100)
    status=models.IntegerField
    # def __init__(self, name:str, publisher:str, version:str):
    #     self.name=name
    #     self.publisher=publisher
    #     self.version=version
    class Meta:
        app_label = 'threat'