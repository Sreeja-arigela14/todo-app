from django.db import models
from django.conf import settings

class Folder(models.Model):

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE
    )

    name = models.CharField(
        max_length=100
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return self.name
class Todo(models.Model):

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE
    )

    folder = models.ForeignKey(
        Folder,
        on_delete=models.CASCADE,
        related_name="todos"
    )

    title = models.CharField(max_length=200)

    description = models.TextField()

    completed = models.BooleanField(default=False)

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    deadline = models.DateField(
        null=True,
        blank=True
    )
    attachment = models.FileField(
        upload_to="attachments/",
        null=True,
        blank=True
    )