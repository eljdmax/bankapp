from django.urls import path
from .views import ListBanksView

urlpatterns = [
	path('banks/', ListBanksView.as_view(), name="banks-all")
]
