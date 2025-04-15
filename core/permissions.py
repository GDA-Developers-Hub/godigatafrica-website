from rest_framework.permissions import BasePermission

class IsSuperAdmin(BasePermission):
    """
    Allows access only to super admins.
    """
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and request.user.is_super_admin)


class IsAdmin(BasePermission):
    """
    Allows access to both super admins and admins.
    """
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and (request.user.is_admin or request.user.is_super_admin))
