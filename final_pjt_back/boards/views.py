from django.shortcuts import render, redirect
from django.views.decorators.http import require_http_methods, require_POST, require_safe
from django.contrib.auth.decorators import login_required
# from django.http import HttpResponse, HttpResponseForbidden
from .models import Board, Comment
from .serializers import BoardListSerializer, BoardSerializer, CommentListSerializer, CommentSerializer
from django.http import JsonResponse

# Create your views here.


@api_view(['GET', 'POST'])
def index(reqeust):
    # 모든 게시글
    if reqeust.method == 'GET':
        boards = Board.objects.all()
        serializer = BoardListSerializer(boards, many=True)
        return Response(serializer.data)
    # 게시글 생성
    elif reqeust.method == 'POST':
        serializer = BoardSerializer(data=reqeust.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(user=reqeust.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['GET', 'DELETE', 'PUT'])
def board_detail(request, board_pk):
    board = get_object_or_404(Board, pk=board_pk)

    if request.method == 'GET':
        serializer = BoardListSerializer(board)
        return Response(serializer.data)
    elif request.method == 'DELETE':
        board.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    elif request.method == 'PUT':
        serializer = BoardListSerializer(board, data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)


@api_view(['GET', 'POST'])
def comment_list(reqeust, board_pk):
    # 게시글 가져오기
    board = get_object_or_404(Board, pk=board_pk)

    # 모든 댓글
    if reqeust.method == 'GET':
        comments = article.comment_set.all()
        serializer = CommentListSerializer(boards, many=True)
        return Response(serializer.data)

    # 댓글 작성
    elif reqeust.method == 'POST':
        serializer = CommenntSerializer(data=reqeust.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(board=board, user=reqeust.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
