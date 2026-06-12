from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from .models import Todo,Folder
from .serializers import TodoSerializer,FolderSerializer
from rest_framework import status
from rest_framework.permissions import IsAuthenticated


class TodoListCreateView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        todos = Todo.objects.filter(
            user=request.user
        )

        serializer = TodoSerializer(
            todos,
            many=True
        )

        return Response(serializer.data)

    def post(self, request):

      print("REQUEST DATA:", request.data)

      serializer = TodoSerializer(
        data=request.data
      )

      if serializer.is_valid():

        serializer.save(
            user=request.user
        )

        return Response(serializer.data)

        print("SERIALIZER ERRORS:", serializer.errors)

      return Response(
        serializer.errors,
        status=400
    )
    
class TodoDetailView(APIView):

    permission_classes = [IsAuthenticated]

    def get_object(self, pk, user):

        return Todo.objects.get(
            id=pk,
            user=user
        )

    def put(self, request, pk):

        todo = self.get_object(
            pk,
            request.user
        )

        serializer = TodoSerializer(
            todo,
            data=request.data
        )

        if serializer.is_valid():

            serializer.save()

            return Response(
                serializer.data
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )

    def delete(self, request, pk):

        todo = self.get_object(
            pk,
            request.user
        )

        todo.delete()

        return Response(
            {
                "message": "Deleted"
            }
        )
    
class FolderListCreateView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        folders = Folder.objects.filter(
            user=request.user
        )

        serializer = FolderSerializer(
            folders,
            many=True
        )

        return Response(serializer.data)

    def post(self, request):

        serializer = FolderSerializer(
            data=request.data
        )

        if serializer.is_valid():

            serializer.save(
                user=request.user
            )

            return Response(
                serializer.data
            )

        return Response(
            serializer.errors,
            status=400
        )
    
class FolderDetailView(APIView):

    permission_classes = [IsAuthenticated]

    def delete(self, request, pk):

        folder = Folder.objects.get(
            id=pk,
            user=request.user
        )

        folder.delete()

        return Response(
            {
                "message":
                "Folder Deleted"
            }
        )