from rest_framework import generics
from .models import *
from .serializers import *

from django.http import HttpResponse, JsonResponse, Http404
from django.db import transaction
from django.views.decorators.csrf import csrf_exempt
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser

from bank.business.Utils import Utils

	
	
class UtilsRest:
	
	@csrf_exempt
	def getTime(request, version=None):
		
		if request.method == 'GET':
			time = Utils.getTime()
			data = {'time': time, 'version' : version}
			return JsonResponse(data, safe=False)
			

class GearsRest:

	class _ListGears_(generics.ListAPIView):
		serializer_class = GearGetSerializer
		
		queryset = Gear.objects.all()
		
	class _GetGear_(generics.RetrieveAPIView):
		serializer_class = GearGetSerializer
		
		def get_object(self):
			id =  self.kwargs['id']
			return Gear.objects.get(pk=id)
	
	class _UpdateGear_(generics.UpdateAPIView):
		serializer_class = GearCreateSerializer
		
		def get_object(self):
			id =  self.kwargs['id']
			return Gear.objects.get(pk=id)
			
	class _CreateGear_(generics.CreateAPIView):
		serializer_class = GearCreateSerializer
		
	class _DeleteGear_(generics.DestroyAPIView):
		serializer_class = GearGetSerializer
		
		def get_object(self):
			id =  self.kwargs['id']
			return Gear.objects.get(pk=id)
		
	
	class _GetGearFamilies_(generics.ListAPIView):
		serializer_class = GearFamilyGetSerializer
		queryset = GearFamily.objects.all()
		
	
	class _GetGearTypes_(generics.ListAPIView):
		serializer_class = GearTypeGetSerializer
		queryset = GearType.objects.all()
		
		
	class _GetAttributeTypes_(generics.ListAPIView):
		serializer_class = AttributeTypeGetSerializer
		queryset = AttributeType.objects.all()
		
	class _GetAttributes_(generics.ListAPIView):
		serializer_class = AttributeGetSerializer
		queryset = Attribute.objects.all()
		
	class _GetActiveGearTalents_(generics.ListAPIView):
		serializer_class = ActiveGearTalentGetSerializer
		queryset = ActiveGearTalent.objects.all()
	
	class _GetPassiveGearTalents_(generics.ListAPIView):
		serializer_class = PassiveGearTalentGetSerializer
		queryset = PassiveGearTalent.objects.all()
		
	@csrf_exempt
	@transaction.atomic
	def processGears(request, *args, **kwargs):
		view = GearsRest._ListGears_.as_view()
		return view(request, *args, **kwargs)

	@csrf_exempt
	@transaction.atomic
	def processGear(request, *args, **kwargs):
		view = GearsRest._CreateGear_.as_view()
		return view(request, *args, **kwargs)
		
	@csrf_exempt
	@transaction.atomic
	def processGearId(request, *args, **kwargs):
		if request.method == 'GET':
			view = GearsRest._GetGear_.as_view()
			return view(request, *args, **kwargs)
			
		elif request.method == 'PUT':
			view = GearsRest._UpdateGear_.as_view()
			return view(request, *args, **kwargs)
		
		elif request.method == 'DELETE':
			view = GearsRest._DeleteGear_.as_view()
			return view(request, *args, **kwargs)
		
		else :
			raise Http404("Method not allowed")


	@csrf_exempt
	@transaction.atomic
	def processGearFamilies(request, *args, **kwargs):
		view = GearsRest._GetGearFamilies_.as_view()
		return view(request, *args, **kwargs)
			
	@csrf_exempt
	@transaction.atomic
	def processGearTypes(request, *args, **kwargs):
		view = GearsRest._GetGearTypes_.as_view()
		return view(request, *args, **kwargs)
		
	@csrf_exempt
	@transaction.atomic
	def processAttributeTypes(request, *args, **kwargs):
		view = GearsRest._GetAttributeTypes_.as_view()
		return view(request, *args, **kwargs)
		
	@csrf_exempt
	@transaction.atomic
	def processAttributes(request, *args, **kwargs):
		view = GearsRest._GetAttributes_.as_view()
		return view(request, *args, **kwargs)
		
	@csrf_exempt
	@transaction.atomic
	def processActiveTalents(request, *args, **kwargs):
		view = GearsRest._GetActiveGearTalents_.as_view()
		return view(request, *args, **kwargs)
	
	@csrf_exempt
	@transaction.atomic
	def processPassiveTalents(request, *args, **kwargs):
		view = GearsRest._GetPassiveGearTalents_.as_view()
		return view(request, *args, **kwargs)
			
class WeaponsRest:

	class _ListWeapons_(generics.ListAPIView):
		serializer_class = WeaponGetSerializer
		queryset = Weapon.objects.all()
		
	class _GetWeapon_(generics.RetrieveAPIView):
		serializer_class = WeaponGetSerializer
		
		def get_object(self):
			id =  self.kwargs['id']
			return Weapon.objects.get(pk=id)
	
	class _UpdateWeapon_(generics.UpdateAPIView):
		serializer_class = WeaponCreateSerializer
		
		def get_object(self):
			id =  self.kwargs['id']
			return Weapon.objects.get(pk=id)
			
	class _CreateWeapon_(generics.CreateAPIView):
		serializer_class = WeaponCreateSerializer
		
	class _DeleteWeapon_(generics.DestroyAPIView):
		serializer_class = WeaponGetSerializer
		
		def get_object(self):
			id =  self.kwargs['id']
			return Weapon.objects.get(pk=id)
		
		
	class _GetWeaponFamilies_(generics.ListAPIView):
		serializer_class = WeaponFamilyGetSerializer
		queryset = WeaponFamily.objects.all()
		
		
	class _GetWeaponVariants_(generics.ListAPIView):
		serializer_class = WeaponVariantGetSerializer
		queryset = WeaponVariant.objects.all()
	
	class _GetActiveWeaponTalents_(generics.ListAPIView):
		serializer_class = ActiveWeaponTalentGetSerializer
		queryset = ActiveWeaponTalent.objects.all()
	
	class _GetPassiveWeaponTalents_(generics.ListAPIView):
		serializer_class = PassiveWeaponTalentGetSerializer
		queryset = PassiveWeaponTalent.objects.all()
	
	@csrf_exempt
	@transaction.atomic
	def processWeapons(request, *args, **kwargs):
		view = WeaponsRest._ListWeapons_.as_view()
		return view(request, *args, **kwargs)

	@csrf_exempt
	@transaction.atomic
	def processWeapon(request, *args, **kwargs):
		view = WeaponsRest._CreateWeapon_.as_view()
		return view(request, *args, **kwargs)
		
	@csrf_exempt
	@transaction.atomic
	def processWeaponId(request, *args, **kwargs):
		if request.method == 'GET':
			view = WeaponsRest._GetWeapon_.as_view()
			return view(request, *args, **kwargs)
			
		elif request.method == 'PUT':
			view = WeaponsRest._UpdateWeapon_.as_view()
			return view(request, *args, **kwargs)
		
		elif request.method == 'DELETE':
			view = WeaponsRest._DeleteWeapon_.as_view()
			return view(request, *args, **kwargs)
		
		else :
			raise Http404("Method not allowed")
	
	
	@csrf_exempt
	@transaction.atomic
	def processWeaponFamilies(request, *args, **kwargs):
		view = WeaponsRest._GetWeaponFamilies_.as_view()
		return view(request, *args, **kwargs)
		
	@csrf_exempt
	@transaction.atomic
	def processWeaponVariants(request, *args, **kwargs):
		view = WeaponsRest._GetWeaponVariants_.as_view()
		return view(request, *args, **kwargs)


	@csrf_exempt
	@transaction.atomic
	def processActiveTalents(request, *args, **kwargs):
		view = WeaponsRest._GetActiveWeaponTalents_.as_view()
		return view(request, *args, **kwargs)
	
	@csrf_exempt
	@transaction.atomic
	def processPassiveTalents(request, *args, **kwargs):
		view = WeaponsRest._GetPassiveWeaponTalents_.as_view()
		return view(request, *args, **kwargs)

class BuildsRest:
	class _ListBuilds_(generics.ListAPIView):
		serializer_class = BuildGetSerializer
		queryset = Build.objects.all()

	@csrf_exempt
	@transaction.atomic
	def processBuilds(request, *args, **kwargs):
		view = BuildsRest._ListBuilds_.as_view()
		return view(request, *args, **kwargs)