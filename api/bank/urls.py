from django.urls import path
from .views import *

urlpatterns = [
	path('utils/', UtilsRest.getTime),
	
	path('gears/', GearsRest.processGears ),
	path('gear/', GearsRest.processGear ),
	path('gear/<int:id>/', GearsRest.processGearId ),
	path('gear/families/', GearsRest.processGearFamilies ),
	path('gear/types/', GearsRest.processGearTypes ),
	path('gear/attributetypes/', GearsRest.processAttributeTypes ),
	path('gear/attributes/', GearsRest.processAttributes ),
	path('gear/activetalents/', GearsRest.processActiveTalents ),
	path('gear/passivetalents/', GearsRest.processPassiveTalents ),
	
	path('weapons/', WeaponsRest.processWeapons ),
	path('weapon/', WeaponsRest.processWeapon ),
	path('weapon/<int:id>/', WeaponsRest.processWeaponId ),

	path('weapon/families/', WeaponsRest.processWeaponFamilies ),
	path('weapon/variants/', WeaponsRest.processWeaponVariants ),
	path('weapon/activetalents/', WeaponsRest.processActiveTalents ),
	path('weapon/passivetalents/', WeaponsRest.processPassiveTalents ),
	
	path('builds/', BuildsRest.processBuilds )
	
]
