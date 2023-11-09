
from django.db import models
class Software(models.Model):
    name=models.CharField(max_length=100)
    publisher=models.CharField(max_length=100)
    version=models.CharField(max_length=100)
    # def __init__(self, name:str, publisher:str, version:str):
    #     self.name=name
    #     self.publisher=publisher
    #     self.version=version
    class Meta:
        app_label = 'software'
