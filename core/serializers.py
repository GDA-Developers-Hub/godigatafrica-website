import re
from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.utils.timezone import localtime
from django.core.mail import send_mail
from django.utils.encoding import force_bytes, force_str
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.contrib.auth.tokens import default_token_generator
from .models import Subscriber, Message, Review, Consultation, Blog, News, Career, Award, ProposalRequest, CaseStudy, TeamMember, CareerApplication, CompanyInfo, Partner
from django.conf import settings 
from drf_spectacular.utils import extend_schema_field
from collections import defaultdict
import validators

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    role = serializers.SerializerMethodField()
    confirm_password = serializers.CharField(write_only=True)
    date_joined = serializers.SerializerMethodField()
    last_login = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = [
            'id', 'username', 'email', 'role', 'password', 'confirm_password',
            'is_super_admin', 'is_admin', 'is_staff', 'is_superuser', 
            'date_joined', 'last_login'
        ]
        extra_kwargs = {'password': {'write_only': True}}

    def get_role(self, obj):
        """Returns user role based on flags."""
        if obj.is_super_admin:
            return "Super Admin"
        elif obj.is_admin:
            return "Admin"
        return "User"

    def get_date_joined(self, obj):
        """Formats date joined."""
        return localtime(obj.date_joined).strftime("%b %d, %Y") if obj.date_joined else "N/A"

    def get_last_login(self, obj):
        """Formats last login."""
        return localtime(obj.last_login).strftime("%b %d, %Y") if obj.last_login else "Never"

    def validate(self, data):
        """Validates password strength and confirmation."""
        password = data.get("password")
        confirm_password = data.get("confirm_password")

        if password != confirm_password:
            raise serializers.ValidationError({"confirm_password": "Passwords do not match."})

        if len(password) < 8:
            raise serializers.ValidationError({"password": "Password must be at least 8 characters long."})
        if not re.search(r'[A-Z]', password):
            raise serializers.ValidationError({"password": "Password must contain at least one uppercase letter."})
        if not re.search(r'[a-z]', password):
            raise serializers.ValidationError({"password": "Password must contain at least one lowercase letter."})
        if not re.search(r'\d', password):
            raise serializers.ValidationError({"password": "Password must contain at least one number."})
        if not re.search(r'[@$!%*?&]', password):
            raise serializers.ValidationError({"password": "Password must contain at least one special character (@, $, !, %, *, ?, &)."})

        return data

    def create(self, validated_data):
        validated_data.pop("confirm_password")  # Remove confirm_password before saving

        is_super_admin = validated_data.get("is_super_admin", False)
        is_admin = validated_data.get("is_admin", False)

        # Ensure only one super admin exists
        if is_super_admin and User.objects.filter(is_super_admin=True).exists():
            raise serializers.ValidationError("A super admin already exists. Only one super admin is allowed.")

        # Assign roles correctly
        if is_super_admin:
            validated_data.update({
                "is_admin": True,
                "is_staff": True,
                "is_superuser": True
            })
        elif is_admin:
            validated_data.update({
                "is_admin": True,
                "is_staff": True
            })

        # Hash password before saving
        password = validated_data.pop("password")
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user


class RequestPasswordResetSerializer(serializers.Serializer):
    email = serializers.EmailField()

    def validate_email(self, value):
        """
        Validate email and send a password reset link if the user exists.
        To prevent user enumeration, return success even if the email is not found.
        """
        user = User.objects.filter(email=value).first()
        if user:
            # Generate and send the reset email
            uidb64 = urlsafe_base64_encode(force_bytes(user.pk))
            token = default_token_generator.make_token(user)
            reset_url = f"{settings.FRONTEND_URL}/admin/forgot-password/{uidb64}/{token}"
            
            try:
                send_mail(
                    "Password Reset Request",
                    f"Click the link below to reset your password:\n{reset_url}",
                    settings.DEFAULT_FROM_EMAIL,
                    [user.email],
                    fail_silently=False,
                )
            except Exception as e:
                # Log the error (optional)
                print(f"Error sending password reset email: {e}")

        # Always return success message to avoid user enumeration
        return value


class SubscriberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subscriber
        fields = ['id', 'email', 'subscribed_at', 'is_active']
        read_only_fields = ['id', 'subscribed_at']

    def validate_email(self, value):
        """
        Ensure the email is unique and properly formatted.
        """
        if Subscriber.objects.filter(email=value).exists():
            raise serializers.ValidationError("This email is already subscribed.")
        return value

    def create(self, validated_data):
        """
        Automatically handle new subscriber creation.
        """
        return Subscriber.objects.create(**validated_data)


class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = '__all__'

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'

class ConsultationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Consultation
        fields = '__all__'

class BlogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blog
        fields = '__all__'

class NewsSerializer(serializers.ModelSerializer):
    class Meta:
        model = News
        fields = "__all__"

class CareerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Career
        fields = "__all__"


class CareerApplicationSerializer(serializers.ModelSerializer):
    resume = serializers.FileField(required=True)

    class Meta:
        model = CareerApplication
        fields = "__all__"
        read_only_fields = ['applied_at']  # Prevents modification of the application date

    def validate_resume(self, value):
        if not value.name.endswith(('.pdf', '.doc', '.docx')):
            raise serializers.ValidationError("Only PDF, DOC, and DOCX files are allowed.")
        return value


class AwardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Award
        fields = "__all__"
    
    
class ProposalRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProposalRequest
        fields = "__all__"

    def create(self, validated_data):
        validated_data["status"] = "pending"  # Ensure new requests are always pending
        return super().create(validated_data)

    def update(self, instance, validated_data):
        request = self.context.get("request")
        if request and not request.user.is_staff:  # Only allow admins to update status
            validated_data.pop("status", None)
        return super().update(instance, validated_data)
    
    def to_representation(self, instance):
        """
        Customize response:
        - Show all fields for GET requests
        - Show only necessary fields for POST requests
        """
        data = super().to_representation(instance)
        request = self.context.get("request")

        if request and request.method == "POST":
            # Include the ID and email for better frontend handling
            return {
                "id": data["id"],
                "name": data["name"],
                "email": data["email"],  # Add this to confirm submission
                "service_interest": data["service_interest"],
                "details": data["details"],
                "status": data["status"],
            }

        return data


class CaseStudySerializer(serializers.ModelSerializer):
    class Meta:
        model = CaseStudy
        fields = '__all__'

    def validate_image(self, value):
        if not validators.url(value):  # Check if URL is valid
            raise serializers.ValidationError("Invalid image URL.")
        return value



class TeamMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeamMember
        fields = ['id', 'name', 'role', 'country', 'department', 'description', 'image', 'linkedin', 'twitter']

class DepartmentSerializer(serializers.Serializer):
    department = serializers.CharField()
    members = TeamMemberSerializer(many=True)

class TeamGroupedByDepartmentSerializer(serializers.Serializer):
    team = DepartmentSerializer(many=True)



class CompanyInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompanyInfo
        fields = "__all__"


class PartnerSerializer(serializers.ModelSerializer):
    @extend_schema_field(str)
    def get_logo_url(self, obj):
        return obj.logo.url if obj.logo else None

    class Meta:
        model = Partner
        fields = "__all__"
