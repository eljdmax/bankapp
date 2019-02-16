from django.urls import path
from .views import ListBanksView, UtilsRest

urlpatterns = [
	path('banks/', ListBanksView.as_view(), name="banks-all"),
	path('utils/', UtilsRest.getTime)
]
