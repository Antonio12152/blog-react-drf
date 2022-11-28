from .models import Post,Category
from rest_framework import generics,viewsets
from .serializers import PostSerializer,CatSerializer
from rest_framework.response import Response
from rest_framework.views import APIView
from django.forms import model_to_dict
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAdminUser, IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from .permissions import IsAdminOrReadOnly, IsOwnerOrReadOnly

class PostAPIList(generics.ListCreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = (IsAuthenticated, )
#    authentication_classes = (TokenAuthentication,)

class PostAPIUpdate(generics.RetrieveUpdateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = (IsOwnerOrReadOnly, )

class PostAPIDelete(generics.RetrieveDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = (IsAdminOrReadOnly, )

class CatViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CatSerializer
    permission_classes = (IsAdminUser, )

# class PostAPIView(APIView):
#     def get(self, request):
#         lst = Post.objects.all()
#         return Response({'posts': PostSerializer(lst, many=True).data})
#
#     def post(self, request):
#         serializer = PostSerializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         serializer.save()
#         return Response({'post': serializer.data})
#
#     def put(self, request, *args, **kwargs):
#         pk = kwargs.get('pk', None)
#         if not pk:
#             return Response({'error': 'method put not allowed'})
#         try:
#             instance = Post.objects.get(pk=pk)
#         except:
#             return Response({'error': 'object does not exist'})
#         serializer = PostSerializer(data=request.data,instance=instance)
#         serializer.is_valid(raise_exception=True)
#         serializer.save()
#         return Response({'post': serializer.data})
#
#     def delete(self, request, *args, **kwargs):
#         pk = kwargs.get('pk', None)
#         if not pk:
#             return Response({'error': 'method delete not allowed'})
#         try:
#             instance = Post.objects.get(pk=pk)
#         except:
#             return Response({'error': 'object does not exist'})
#         instance.delete()
#         return Response({'post': f'delete post {str(pk)}'})
