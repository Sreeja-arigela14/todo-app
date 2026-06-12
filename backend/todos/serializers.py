from rest_framework import serializers
from .models import Todo, Folder


class TodoSerializer(serializers.ModelSerializer):

    folder_name = serializers.CharField(
        source='folder.name',
        read_only=True
    )

    class Meta:
        model = Todo
        fields = "__all__"
        read_only_fields = ['user']


class FolderSerializer(serializers.ModelSerializer):

    class Meta:
        model = Folder
        fields = ["id", "name"]