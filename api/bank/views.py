from rest_framework import generics
from .models import Banks
from .serializers import BanksSerializer

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

	
class UtilsRest:
	
	@csrf_exempt
	def getTime(request, version=None):
		
		if request.method == 'GET':
			time = Utils.getTime()
			data = {'time': time, 'version' : version}
			return JsonResponse(data, safe=False)
			
		