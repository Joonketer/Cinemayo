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

app_name = 'movies'

urlpatterns = [
    path("movies/", views.movie_list, name="movie_list"),   # 전체 영화
    path('movies/<int:movie_pk>/', views.movie_detail),  # 상세 영화
    path('movies/<int:movie_pk>/review/', views.review_create),  # 영화 리뷰 작성
    path('movies/<int:movie_pk>/like/', views.movie_like),  # 영화 좋아요
    path('reviews/', views.review_list),    # 전체 리뷰
    path('reviews/<int:review_pk>/', views.review_detail),  # 내가 쓴 리뷰
    path('reviews/<int:review_pk>/like/', views.review_like),  # 영화 좋아요



]