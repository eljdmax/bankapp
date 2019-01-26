from django.db import models

class Banks(models.Model):
	# bank name
	name = models.CharField(max_length=255, null=False)
	# bank country
	country = models.CharField(max_length=255, null=False)
	
	def __str__(self):
		return "Name: {} - Country: {}".format(self.name, self.country)

