from django.contrib.auth import get_user_model
from django.db.models.signals import post_migrate
from django.dispatch import receiver

User = get_user_model()

@receiver(post_migrate)
def create_super_admin(sender, **kwargs):
    if not User.objects.filter(is_super_admin=True).exists():
        User.objects.create_superuser(
            username="admin",
            email="admin@example.com",
            password="Admin@1234",
            is_super_admin=True
        )