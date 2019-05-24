from rest_framework import generics
from .models import *
from .serializers import *

from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser

from bank.business.Utils import Utils

class ListBanksView(generics.ListAPIView):
	"""
	Provides a get method handler.
	"""
	queryset = Banks.objects.all()
	serializer_class = BanksSerializer

class ListWeapons(generics.ListAPIView):
	"""
	Provides a get method handler.
	"""
	queryset = Weapon.objects.select_related('variant').all()
	print(queryset)
	serializer_class = WeaponSerializer
	
	
class UtilsRest:
	
	@csrf_exempt
	def getTime(request, version=None):
		
		if request.method == 'GET':
			time = Utils.getTime()
			data = {'time': time, 'version' : version}
			return JsonResponse(data, safe=False)
			
		
		
class GearsRest:

	def getGear(request, version=None):
		data = {'msg': 'in construction'}
		return JsonResponse(data, safe=False)


class WeaponsRest:

	def getWeapon(request, version=None):
		allWeapons = list(Weapon.objects.all())
			
		#data = {'msg': 'in construction'}
		return JsonResponse(allWeapons, safe=False)