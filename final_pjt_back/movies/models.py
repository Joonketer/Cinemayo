from django.db import models
from django.conf import settings
# Create your models here.


class Genre(models.Model):
    name = models.CharField(max_length=50)  # 장르 가져올 모델

# Main - Popular, Top Rated, Upcoming


class Movie(models.Model):
    like_users = models.ManyToManyField(
        settings.AUTH_USER_MODEL, related_name='like_movie')
    title = models.CharField(max_length=100)  # 영화제목
    movie_id = models.IntegerField()  # 영화 아이디
    youtube_id = models.CharField(max_length=100)   # 유튜브용 아이디
    overview = models.TextField()       # 줄거리
    release_date = models.DateField()   # 개봉일
    vote_average = models.FloatField()  # 평점
    poster_path = models.CharField(max_length=200)  # 이미지
    genres = models.ManyToManyField(Genre)  # 장르
    season = models.CharField(max_length=50)    # 영화와 어울리는 계절 태그
    weather = models.CharField(max_length=50)   # 현재 날씨와 어울리는 영화 추천 위한 태그


class Review(models.Model):
    content = models.TextField()  # 댓글 내용
    movie = models.ForeignKey(
        Movie, related_name="reviews", on_delete=models.CASCADE)    # 어떤 영화인지
    vote_average = models.IntegerField()    # 리뷰 평점
    created_at = models.DateTimeField(auto_now_add=True)  # 생성일
    updated_at = models.DateTimeField(auto_now=True)    # 수정일
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE)    # 리뷰 단 유저
