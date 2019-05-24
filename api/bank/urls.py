from django.urls import path
from .views import *

urlpatterns = [
	path('banks/', ListBanksView.as_view(), name="banks-all"),
	path('utils/', UtilsRest.getTime),
	path('gears/', GearsRest.getGear),
	path('gear/<int:id>/', GearsRest.getGear),
	path('weapons/', ListWeapons.as_view()),
	#path('weapons/', WeaponsRest.getWeapon),
	path('weapon/<int:id>/', WeaponsRest.getWeapon),
]
