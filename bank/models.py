from django.db import models

## Builds
class Build(models.Model):
	#id
	id = models.AutoField(primary_key=True)
	#name
	name = models.CharField(max_length=255, null=False)

	def __str__(self):
		return "Id: {} - Name: {}".format(self.id, self.name)

## Weapons
class WeaponFamily(models.Model):
	# id
	id = models.AutoField(primary_key=True)
	# weapon name
	name = models.CharField(max_length=255, null=False)
	
	def __str__(self):
		return "Id: {} - Name: {}".format(self.id, self.name)
		
		
class ActiveWeaponTalent(models.Model):
	# id
	id = models.AutoField(primary_key=True)
	# weapon talent name
	name = models.CharField(max_length=255, null=False)
	
	def __str__(self):
		return "Id: {} - Name: {}".format(self.id, self.name)
		

class PassiveWeaponTalent(models.Model):
	# id
	id = models.AutoField(primary_key=True)
	# weapon talent name
	name = models.CharField(max_length=255, null=False)
	
	def __str__(self):
		return "Id: {} - Name: {}".format(self.id, self.name)
		
		
class WeaponVariant(models.Model):
	# id
	id = models.AutoField(primary_key=True)
	# weapon variant name
	name = models.CharField(max_length=255, null=False)
	# best to keep
	best = models.BooleanField(default=False)
	# weapon family
	family = models.ForeignKey(WeaponFamily, on_delete=models.CASCADE, null=False)
	
	def __str__(self):
		return "Id: {} - Name: {}".format(self.id, self.name)
		
		

class Weapon(models.Model):
	# id
	id = models.AutoField(primary_key=True)
	# score
	score = models.PositiveSmallIntegerField(null=False)
	# dmg
	dmg = models.DecimalField(max_digits=6, decimal_places=2, null=False)
	# is it trash
	trash = models.BooleanField(default=False)
	# weapon variant
	variant = models.ForeignKey(WeaponVariant, on_delete=models.CASCADE, null=False)
	# active talent
	activeTalent = models.ForeignKey(ActiveWeaponTalent, on_delete=models.CASCADE, null=True, blank = True)
	# passive talent
	passiveTalents = models.ManyToManyField(
        PassiveWeaponTalent,
        through='WeaponPassiveMembership',
        through_fields=('weapon', 'talent'),
    )
	
	def __str__(self):
		return "Id: {} - Score: {}".format(self.id, self.score)
		
		
class WeaponPassiveMembership(models.Model):
	weapon = models.ForeignKey(Weapon, on_delete=models.CASCADE, null=False)
	talent = models.ForeignKey(PassiveWeaponTalent, on_delete=models.CASCADE, null=False)
	
		
## Gears
class GearFamily(models.Model):
	# id
	id = models.AutoField(primary_key=True)
	# family name
	name = models.CharField(max_length=255, null=False)
	
	def __str__(self):
		return "Id: {} - Name: {}".format(self.id, self.name)
		
		
class GearType(models.Model):
	# id
	id = models.AutoField(primary_key=True)
	# type name
	name = models.CharField(max_length=255, null=False)
	
	def __str__(self):
		return "Id: {} - Name: {}".format(self.id, self.name)
		
		
class AttributeType(models.Model):
	# id
	id = models.AutoField(primary_key=True)
	# attribute type name
	name = models.CharField(max_length=255, null=False)
	
	def __str__(self):
		return "Id: {} - Name: {}".format(self.id, self.name)

class Attribute(models.Model):
	# id
	id = models.AutoField(primary_key=True)
	# attribute name
	name = models.CharField(max_length=255, null=False)
	# type
	type = models.ForeignKey(AttributeType, on_delete=models.CASCADE, null=False)
	
	def __str__(self):
		return "Id: {} - Name: {}".format(self.id, self.name)
		

class ActiveGearTalent(models.Model):
	# id
	id = models.AutoField(primary_key=True)
	# gear talent name
	name = models.CharField(max_length=255, null=False)
	
	def __str__(self):
		return "Id: {} - Name: {}".format(self.id, self.name)
		
class PassiveGearTalent(models.Model):
	# id
	id = models.AutoField(primary_key=True)
	# gear talent name
	name = models.CharField(max_length=255, null=False)
	
	def __str__(self):
		return "Id: {} - Name: {}".format(self.id, self.name)
		

class Gear(models.Model):
	# id
	id = models.AutoField(primary_key=True)
	# score
	score = models.PositiveSmallIntegerField(null=False)
	# dmg
	armor = models.DecimalField(max_digits=6, decimal_places=2, null=False)
	# is it trash
	trash = models.BooleanField(default=False)
	# is it star
	star = models.BooleanField(default=False)
	# gear type
	type = models.ForeignKey(GearType, on_delete=models.CASCADE, null=False)
	# gear family
	family = models.ForeignKey(GearFamily, on_delete=models.CASCADE, null=False)
	# active talent
	activeTalent = models.ForeignKey(ActiveGearTalent, on_delete=models.CASCADE, null=True, blank = True)
	# passive talent
	passiveTalents = models.ManyToManyField(
        PassiveGearTalent,
        through='GearPassiveMembership',
        through_fields=('gear', 'talent'),
    )
	# mods
	gearMods = models.ManyToManyField(
        AttributeType,
        through='GearMod',
        through_fields=('gear', 'type'),
    )
	# attributes
	gearAttributes = models.ManyToManyField(
        Attribute,
        through='GearAttribute',
        through_fields=('gear', 'attribute'),
    )
	
	# builds
	builds = models.ManyToManyField(
		Build,
		through='GearBuild',
		through_fields=('gear', 'build'),
	)

	def __str__(self):
		return "Id: {} - Score: {}".format(self.id, self.score)
		
		
class GearPassiveMembership(models.Model):
	gear = models.ForeignKey(Gear, on_delete=models.CASCADE, null=False)
	talent = models.ForeignKey(PassiveGearTalent, on_delete=models.CASCADE, null=False)
	

class GearMod(models.Model):
	gear = models.ForeignKey(Gear, on_delete=models.CASCADE, null=False)
	type = models.ForeignKey(AttributeType, on_delete=models.CASCADE, null=False)
	filled = models.BooleanField(default=False)
	

class GearAttribute(models.Model):
	gear = models.ForeignKey(Gear, on_delete=models.CASCADE, null=False)
	attribute = models.ForeignKey(Attribute, on_delete=models.CASCADE, null=False)
	value = models.DecimalField(max_digits=10, decimal_places=2, null=False,default=0)
	
class GearBuild(models.Model):
	gear = models.ForeignKey(Gear, on_delete=models.CASCADE, null=False)
	build = models.ForeignKey(Build, on_delete=models.CASCADE, null=False)