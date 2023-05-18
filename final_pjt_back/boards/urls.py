"""final_pjt_back URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.urls import path, include
from . import views

app_name = 'boards'

urlpatterns = [
    path("boards/", views.index, name="board_list"),
    path("boards/<int:board_pk>/", views.board_detail, name="board_detail"),
    path("comments/", views.comment_list, name="comment_list"),
    path("comments/<int:board_pk>/comments/",
         views.comment_create, name="comment_create"),
    path("comments/<int:comment_pk>/",
         views.comment_detail, name="comment_detail"),
]