from django.urls import path
from .views import (TodoListCreateView,TodoDetailView,FolderListCreateView,FolderDetailView)

urlpatterns = [
    path(
        '',
        TodoListCreateView.as_view()
    ),
    path(
        '<int:pk>/',TodoDetailView.as_view()
    ),
    path(
    'folders/',
    FolderListCreateView.as_view()
    ),
    path(
    'folders/<int:pk>/',
    FolderDetailView.as_view()
),
]