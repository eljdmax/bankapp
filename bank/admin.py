from django.contrib import admin
from .models import *

admin.site.register(Build)

admin.site.register(WeaponFamily)
admin.site.register(ActiveWeaponTalent)
admin.site.register(PassiveWeaponTalent)
admin.site.register(WeaponVariant)
admin.site.register(Weapon)
admin.site.register(WeaponPassiveMembership)


admin.site.register(GearFamily)
admin.site.register(GearType)
admin.site.register(AttributeType)
admin.site.register(Attribute)
admin.site.register(ActiveGearTalent)
admin.site.register(PassiveGearTalent)
admin.site.register(Gear)
admin.site.register(GearPassiveMembership)
admin.site.register(GearMod)
admin.site.register(GearAttribute)
