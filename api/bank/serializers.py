from rest_framework import serializers
from .models import *


class BanksSerializer(serializers.ModelSerializer):
	class Meta:
		model = Banks
		fields = ("name", "country")
		
class WeaponSerializer(serializers.ModelSerializer):
	class Meta:
		model = Weapon
		fields = '__all__' #("id", "score", "dmg")