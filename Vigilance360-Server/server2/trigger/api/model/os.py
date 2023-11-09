from django.db import models
class Os(models.Model):
    name=models.CharField(max_length=100)
    edition=models.CharField(max_length=100)
    system_type=models.CharField(max_length=100)
    version=models.CharField(max_length=100)
    # def __init__(self, name:str, publisher:str, version:str):
    #     self.name=name
    #     self.publisher=publisher
    #     self.version=version
    class Meta:
        app_label = 'os'