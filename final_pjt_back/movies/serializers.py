from rest_framework import serializers
from ..models import Movie, Review
from django.contrib.auth import get_user_model

# movie list


class MovieListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = ('id', 'like_users', 'title', 'overview', 'poster_path',
                  'genres', 'season', 'weather')


# movie detail
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


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ('username', )
