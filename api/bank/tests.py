from django.urls import reverse
from rest_framework.test import APITestCase, APIClient
from rest_framework.views import status
from .models import Banks
from .serializers import BanksSerializer

# tests for views

class BaseViewTest(APITestCase):
	client = APIClient()

	@staticmethod
	def create_bank(name="", country=""):
		if name != "" and country != "":
			Banks.objects.create(name=name, country=country)

	def setUp(self):
		# add test data
		self.create_bank("bank1", "cameroon")
		self.create_bank("bank2", "senegal")
		self.create_bank("bank3", "england")
		self.create_bank("bank4", "usa")
		
	
class GetAllSongsTest(BaseViewTest):
	def test_get_all_songs(self):
		"""
		This test ensures that all banks added in the setUp method
		exist when we make a GET request to the banks/ endpoint
		"""
		# hit the API endpoint
		response = self.client.get(
			reverse("banks-all", kwargs={"version": "v1"})
		)
		# fetch the data from db
		expected = Banks.objects.all()
		serialized = BanksSerializer(expected, many=True)
		self.assertEqual(response.data, serialized.data)
		self.assertEqual(response.status_code, status.HTTP_200_OK)