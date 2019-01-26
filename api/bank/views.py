from rest_framework import generics
from .models import Banks
from .serializers import BanksSerializer

class ListBanksView(generics.ListAPIView):
	"""
	Provides a get method handler.
	"""
	queryset = Banks.objects.all()
	serializer_class = BanksSerializer