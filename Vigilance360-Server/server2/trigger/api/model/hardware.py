from django.db import models
class Hardware(models.Model):
    name=models.CharField(max_length=100)
    brand=models.CharField(max_length=100)
    category=models.CharField(max_length=100)
    model=models.CharField(max_length=100)
    # def __init__(self, name:str, publisher:str, version:str):
    #     self.name=name
    #     self.publisher=publisher
    #     self.version=version
    class Meta:
        app_label = 'hardware'