from rest_framework import serializers
from ..models import Movie, Review
from django.contrib.auth import get_user_model

# Main 영화 리스트


class MovieListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = ('id', 'like_users', 'title', 'overview', 'poster_path',
                  'genres', 'season', 'weather')


# 영화 상세
class MovieSerializer(serializers.ModelSerializer):

    class ReviewSerializer(serializers.ModelSerializer):
        user = UserSerializer(read_only=True)

        class Meta:
            model = Review
            fields = '__all__'
    reviews = ReviewSerializer(many=True, read_only=True)
    # user = UserSerializer(read_only=True)

    class Meta:
        model = Movie
        fields = '__all__'

# 리뷰 리스트 전부


class ReviewListSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Review
        fields = '__all__'


class ReviewSerializer(serializers.ModelSerializer):
    class MovieSerializer(serializers.ModelSerializer):
        class Meta:
            model = Movie
            fields = ('id', 'title', )
    movie = MovieSerializer(read_only=True)
    user = UserSerializer(read_only=True)

    class Meta:
        model = Review
        # fields = ('content', 'user_vote_average', 'created_at', 'user', 'movie','id')
        fields = '__all__'

# 유저 이름


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ('username', )
