from rest_framework import serializers
from .models import *

import logging
import pprint
logger = logging.getLogger('django')


class WeaponCreateSerializer(serializers.ModelSerializer):
	passiveTalentIds = serializers.ListField(
		child=serializers.IntegerField(),
		required=False
	)
	
	class Meta:
		model = Weapon
		fields = '__all__'
		depth = 0
		
	def create(self, validated_data):
		
		talentData = []
		if 'passiveTalentIds' in validated_data:
			talentData = validated_data.pop('passiveTalentIds')
		weapon = Weapon.objects.create(**validated_data)
		for k in talentData:
			talent = PassiveWeaponTalent.objects.get(pk=k)
			WeaponPassiveMembership.objects.create(weapon=weapon, talent=talent)
		
		return weapon
		
	def update(self, instance, validated_data):
		talentData = None
		if 'passiveTalentIds' in validated_data:
			talentData = validated_data.pop('passiveTalentIds')
		
		instance.score = validated_data.get('score', instance.score)
		instance.dmg = validated_data.get('dmg', instance.dmg)
		instance.variant = validated_data.get('variant', instance.variant)

		if ('trash' in validated_data):
			instance.trash = validated_data.get('trash', instance.trash)
		
		if ('activeTalent' in validated_data):
			instance.activeTalent = validated_data.get('activeTalent', instance.activeTalent)

			
		if talentData != None:
			WeaponPassiveMembership.objects.filter(weapon=instance).delete()
			for k in talentData:
				talent = PassiveWeaponTalent.objects.get(pk=k)
				WeaponPassiveMembership.objects.create(weapon=instance, talent=talent)
		
		instance.save()
		
		return instance

class WeaponGetSerializer(serializers.ModelSerializer):
	class Meta:
		model = Weapon
		fields = '__all__'
		depth = 1

		
class GearAttributeSerializer(serializers.ModelSerializer):
	class Meta:
		model = GearAttribute
		fields = ('value', 'attribute')
		depth = 1
		
class GearGetSerializer(serializers.ModelSerializer):
	gearAttributes = GearAttributeSerializer(source="gearattribute_set", many=True, read_only=True)
	class Meta:
		model = Gear
		fields = '__all__'
		depth = 1

class IdValue(serializers.Serializer):
	id = serializers.IntegerField()
	value = serializers.DecimalField(max_digits=10, decimal_places=2)
		
class GearCreateSerializer(serializers.ModelSerializer):
	passiveTalentIds = serializers.ListField(
		child=serializers.IntegerField(),
		required=False
	)
	
	modIds = serializers.ListField(
		child=serializers.IntegerField(),
		required=False
	)

	buildIds = serializers.ListField(
		child=serializers.IntegerField(),
		required=False
	)
	
	attributeIds = IdValue(many=True, required=False)
	
	class Meta:
		model = Gear
		fields = '__all__'
		depth = 0
		
	def create(self, validated_data):
		
		talentData = []
		if 'passiveTalentIds' in validated_data:
			talentData = validated_data.pop('passiveTalentIds')
			
		gearModData = []
		if 'modIds' in validated_data:
			gearModData = validated_data.pop('modIds')
		
		gearAttributeData = []
		if 'attributeIds' in validated_data:
			gearAttributeData = validated_data.pop('attributeIds')
		
		gear = Gear.objects.create(**validated_data)
		for k in talentData:
			talent = PassiveGearTalent.objects.get(pk=k)
			GearPassiveMembership.objects.create(gear=gear, talent=talent)
			
		for k in gearModData:
			type = AttributeType.objects.get(pk=k)
			GearMod.objects.create(gear=gear, type=type)
			
		for k in gearAttributeData:
			attribute = Attribute.objects.get(pk=k.get('id'))
			GearAttribute.objects.create(gear=gear, attribute=attribute, value=k.get('value'))
		
		return gear
		
	def update(self, instance, validated_data):
		talentData = None
		if 'passiveTalentIds' in validated_data:
			talentData = validated_data.pop('passiveTalentIds')
		
		gearModData = None
		if 'modIds' in validated_data:
			gearModData = validated_data.pop('modIds')
		
		gearAttributeData = None
		if 'attributeIds' in validated_data:
			gearAttributeData = validated_data.pop('attributeIds')

		gearBuildData = None
		if 'buildIds' in validated_data:
			gearBuildData = validated_data.pop('buildIds')
		
		instance.score = validated_data.get('score', instance.score)
		instance.armor = validated_data.get('armor', instance.armor)
		instance.type = validated_data.get('type', instance.type)
		instance.family = validated_data.get('family', instance.family)
		
		
		if ('trash' in validated_data):
			instance.trash = validated_data.get('trash', instance.trash)
			
		if ('activeTalent' in validated_data):
			instance.activeTalent = validated_data.get('activeTalent', instance.activeTalent)

		
		if talentData != None:
			GearPassiveMembership.objects.filter(gear=instance).delete()
			for k in talentData:
				talent = PassiveGearTalent.objects.get(pk=k)
				GearPassiveMembership.objects.create(gear=instance, talent=talent)
		
		if gearModData != None:
			GearMod.objects.filter(gear=instance).delete()
			for k in gearModData:
				type = AttributeType.objects.get(pk=k)
				GearMod.objects.create(gear=instance, type=type)

		if gearAttributeData != None:
			GearAttribute.objects.filter(gear=instance).delete()
			for k in gearAttributeData:
				attribute = Attribute.objects.get(pk=k.get('id'))
				GearAttribute.objects.create(gear=instance, attribute=attribute, value=k.get('value'))

		if gearBuildData != None:
			GearBuild.objects.filter(gear=instance).delete()
			for k in gearBuildData:
				build = Build.objects.get(pk=k)
				GearBuild.objects.create(gear=instance, build=build)

		instance.save()
		
		return instance

class WeaponFamilyGetSerializer(serializers.ModelSerializer):
	class Meta:
		model = WeaponFamily
		fields = '__all__'
		depth = 1
		
class ActiveWeaponTalentGetSerializer(serializers.ModelSerializer):
	class Meta:
		model = ActiveWeaponTalent
		fields = '__all__'
		depth = 1
		
class PassiveWeaponTalentGetSerializer(serializers.ModelSerializer):
	class Meta:
		model = PassiveWeaponTalent
		fields = '__all__'
		depth = 1
		
class WeaponVariantGetSerializer(serializers.ModelSerializer):
	class Meta:
		model = WeaponVariant
		fields = '__all__'
		depth = 1
		
class GearFamilyGetSerializer(serializers.ModelSerializer):
	class Meta:
		model = GearFamily
		fields = '__all__'
		depth = 1
		
class GearTypeGetSerializer(serializers.ModelSerializer):
	class Meta:
		model = GearType
		fields = '__all__'
		depth = 1
		
class AttributeTypeGetSerializer(serializers.ModelSerializer):
	class Meta:
		model = AttributeType
		fields = '__all__'
		depth = 1
		
class AttributeGetSerializer(serializers.ModelSerializer):
	class Meta:
		model = Attribute
		fields = '__all__'
		depth = 1
		
class ActiveGearTalentGetSerializer(serializers.ModelSerializer):
	class Meta:
		model = ActiveGearTalent
		fields = '__all__'
		depth = 1
		
class PassiveGearTalentGetSerializer(serializers.ModelSerializer):
	class Meta:
		model = PassiveGearTalent
		fields = '__all__'
		depth = 1

class BuildGetSerializer(serializers.ModelSerializer):
	class Meta:
		model = Build
		fields = '__all__'
		depth = 1
