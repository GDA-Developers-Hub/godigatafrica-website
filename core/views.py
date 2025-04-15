from rest_framework import generics, status, throttling, viewsets, permissions, filters
from rest_framework.filters import SearchFilter
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken, OutstandingToken
from django.contrib.auth import authenticate, get_user_model
from django.core.exceptions import PermissionDenied
from django.shortcuts import get_object_or_404
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_decode
from collections import defaultdict
from django.utils.encoding import force_str
from rest_framework.views import APIView
from rest_framework.serializers import Serializer, CharField 
from django.template.loader import render_to_string
from django.utils.html import strip_tags
import logging
import urllib.parse
from datetime import timedelta
from django.utils import timezone
from rest_framework.decorators import action
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.pagination import PageNumberPagination
import smtplib
from django.core.mail import EmailMessage, EmailMultiAlternatives, send_mail
from drf_spectacular.utils import extend_schema, extend_schema_view, OpenApiResponse, OpenApiTypes, OpenApiParameter
from .models import CustomUser, Subscriber, Message, Review, Consultation, Blog, News, Career, Award, ProposalRequest, CaseStudy, TeamMember, CareerApplication, CompanyInfo, Partner
from django_filters.rest_framework import DjangoFilterBackend
from django.core.files.storage import default_storage
from .permissions import IsSuperAdmin, IsAdmin
from django.conf import settings
from .serializers import (
    UserSerializer, 
    RequestPasswordResetSerializer, 
    SubscriberSerializer, 
    MessageSerializer, 
    ReviewSerializer, 
    ConsultationSerializer,
    BlogSerializer,
    NewsSerializer,
    CareerSerializer,
    AwardSerializer,
    ProposalRequestSerializer,
    CaseStudySerializer,
    TeamMemberSerializer,
    TeamGroupedByDepartmentSerializer,
    CareerApplicationSerializer,
    CompanyInfoSerializer,  
    PartnerSerializer
)

User = get_user_model()

class AdminLoginSerializer(Serializer):
    username = CharField()
    password = CharField(write_only=True)


class AdminLoginView(generics.GenericAPIView):
    serializer_class = AdminLoginSerializer  

    @extend_schema(
        request=AdminLoginSerializer,
        responses={200: OpenApiResponse(response={"access": str, "refresh": str, "role": str})},
        summary="Admin Login",
        description="Allows Admins and Super Admins to log in and receive access tokens.",
    )
    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        username = serializer.validated_data.get("username")
        password = serializer.validated_data.get("password")

        user = authenticate(request, username=username, password=password)  

        if user and (user.is_super_admin or user.is_admin):
            refresh = RefreshToken.for_user(user)
            return Response({
                "refresh": str(refresh),
                "access": str(refresh.access_token),
                "role": "Super Admin" if user.is_super_admin else "Admin",
                "username": user.username,  # Added username in the response
            })
        
        return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)


class AdminCreateView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated, IsSuperAdmin]

    @extend_schema(
        request=UserSerializer,
        responses={201: UserSerializer},
        summary="Create Admin",
        description="Super Admins can create new Admin accounts.",
    )
    def perform_create(self, serializer):
        if not self.request.user.is_super_admin:
            raise PermissionDenied("Only super admins can create admins.")  

        is_super_admin = self.request.data.get("is_super_admin", False)
        if is_super_admin and CustomUser.objects.filter(is_super_admin=True).exists():
            raise PermissionDenied("Only one super admin is allowed.")  

        serializer.save(is_admin=True)


class AdminListView(generics.ListAPIView):
    """View to list all Admins and Super Admins"""
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated, IsSuperAdmin]  # Only Super Admins can access

    def get_queryset(self):
        """Fetch only Admins and Super Admins"""
        return User.objects.filter(is_admin=True)  

    @extend_schema(
        responses={200: UserSerializer(many=True)},
        summary="List All Admins with Roles",
        description="Super Admins can retrieve a list of all Admins with their Username, Email, Role, Date Joined, and Last Login.",
    )
    def get(self, request, *args, **kwargs):
        """Handles GET request to list all admins"""
        return self.list(request, *args, **kwargs)


class AdminUpdateView(generics.RetrieveUpdateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated, IsSuperAdmin]

    @extend_schema(
        request=UserSerializer,
        responses={200: UserSerializer},
        summary="Update Admin",
        description="Super Admins can update Admin details.",
    )
    def put(self, request, *args, **kwargs):
        return super().put(request, *args, **kwargs)

class AdminDeleteView(generics.DestroyAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated, IsSuperAdmin]

    @extend_schema(
        responses={204: None},
        summary="Delete Admin",
        description="Super Admins can delete Admin accounts.",
    )
    def delete(self, request, *args, **kwargs):
        return super().delete(request, *args, **kwargs)


# Admin Logout View
class AdminLogoutView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    @extend_schema(
        summary="Admin Logout",
        description="Logs out an authenticated admin by blacklisting their refresh token.",
        request={
            "application/json": {
                "type": "object",
                "properties": {
                    "refresh": {"type": "string", "example": "your-refresh-token-here"}
                },
                "required": ["refresh"]
            }
        },
        responses={
            200: OpenApiResponse(description="Logout successful."),
            400: OpenApiResponse(description="Invalid token."),
        }
    )
    def post(self, request):
        try:
            refresh_token = request.data.get("refresh")
            if not refresh_token:
                return Response({"error": "Refresh token is required."}, status=status.HTTP_400_BAD_REQUEST)

            token = RefreshToken(refresh_token)
            token.blacklist()  # Blacklist the refresh token

            return Response({"message": "Logout successful."}, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({"error": "Invalid token."}, status=status.HTTP_400_BAD_REQUEST)


class RequestPasswordResetView(generics.GenericAPIView):
    serializer_class = RequestPasswordResetSerializer
    throttle_classes = [throttling.AnonRateThrottle]

    @extend_schema(
        request=RequestPasswordResetSerializer,
        responses={200: {"message": "Password reset link sent."}},
        summary="Request Password Reset",
        description="Sends a password reset link to the user's email.",
    )
    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response({"message": "Password reset link sent."}, status=status.HTTP_200_OK)

class ResetPasswordView(generics.GenericAPIView):
    class ResetPasswordSerializer(Serializer):
        password = CharField(write_only=True, min_length=8)
        confirm_password = CharField(write_only=True, min_length=8)

    serializer_class = ResetPasswordSerializer

    @extend_schema(
        request=ResetPasswordSerializer,
        responses={200: {"message": "Password reset successful."}},
        summary="Reset Password",
        description="Allows users to reset their password using a valid reset link.",
    )
    def post(self, request, uidb64, token):
        try:
            uid = force_str(urlsafe_base64_decode(uidb64))
            user = get_object_or_404(User, pk=uid)
        except (User.DoesNotExist, ValueError):
            return Response({"error": "Invalid reset link."}, status=status.HTTP_400_BAD_REQUEST)

        if not default_token_generator.check_token(user, token):
            return Response({"error": "Invalid or expired token."}, status=status.HTTP_400_BAD_REQUEST)

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        password = serializer.validated_data["password"]
        confirm_password = serializer.validated_data["confirm_password"]

        if password != confirm_password:
            return Response({"error": "Passwords do not match."}, status=status.HTTP_400_BAD_REQUEST)

        user.set_password(password)
        user.save()

        return Response({"message": "Password reset successful."}, status=status.HTTP_200_OK)


# Subscribe to Newsletter
class SubscribeView(APIView):
    permission_classes = [permissions.AllowAny]

    @extend_schema(
        summary="Subscribe to Newsletter",
        description="Allows users to subscribe to the newsletter using their email.",
        request=SubscriberSerializer,
        responses={
            201: OpenApiResponse(description="Subscription successful!"),
            400: OpenApiResponse(description="Email already subscribed or invalid request."),
        }
    )
    def post(self, request):
        try:
            serializer = SubscriberSerializer(data=request.data)
            if serializer.is_valid():
                email = serializer.validated_data['email']
                if Subscriber.objects.filter(email=email).exists():
                    return Response({"message": "Email already subscribed!"}, status=status.HTTP_400_BAD_REQUEST)
                
                serializer.save()
                return Response({"message": "Subscription successful!"}, status=status.HTTP_201_CREATED)
            
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        except IntegrityError as e:
            return Response({"error": "Database constraint error. Email may already exist."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# List All Subscribers (Admin & SuperAdmin Only)
class SubscriberListView(generics.ListAPIView):
    queryset = Subscriber.objects.all()  # Show both active and inactive subscribers
    serializer_class = SubscriberSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsAdmin | IsSuperAdmin]  

    @extend_schema(
        summary="List All Subscribers",
        description="Retrieves all subscribers, both active and inactive (Admin & SuperAdmin only).",
        responses={200: SubscriberSerializer(many=True)}
    )
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)


# Unsubscribe (Self-Serve)
class UnsubscribeView(APIView):
    permission_classes = [permissions.AllowAny]

    @extend_schema(
        summary="Unsubscribe from Newsletter",
        description="Allows users to unsubscribe from the newsletter by marking them as inactive and deleting their record.",
        responses={200: OpenApiResponse(description="Unsubscribed successfully and deleted from records.")}
    )
    def post(self, request, email):
        decoded_email = urllib.parse.unquote(email)  # Decode URL-encoded email

        try:
            subscriber = Subscriber.objects.get(email=decoded_email)

            if not subscriber.is_active:
                return Response(
                    {"success": False, "message": "You are already unsubscribed."}, 
                    status=status.HTTP_400_BAD_REQUEST
                )

            # Mark as inactive first
            subscriber.is_active = False
            subscriber.save()

            # Delete subscriber from database
            subscriber.delete()

            return Response(
                {"success": True, "message": "You've been successfully unsubscribed and removed from our records."},
                status=status.HTTP_200_OK
            )

        except Subscriber.DoesNotExist:
            return Response(
                {"success": False, "message": "Email not found."}, 
                status=status.HTTP_404_NOT_FOUND
            )


# Delete Subscriber (Admin & SuperAdmin Only)
class SubscriberDeleteView(generics.DestroyAPIView):
    queryset = Subscriber.objects.all()
    serializer_class = SubscriberSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsAdmin | IsSuperAdmin]  

    @extend_schema(
        summary="Delete a Subscriber",
        description="Allows Admin & SuperAdmin to delete a subscriber.",
        responses={204: OpenApiResponse(description="Subscriber deleted successfully.")}
    )
    def delete(self, request, *args, **kwargs):
        return super().delete(request, *args, **kwargs)


logger = logging.getLogger(__name__)

class SendNewsletterView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    @extend_schema(
        summary="Send Newsletter",
        description="Allows authenticated users to send HTML newsletters to subscribers.",
        request={
            'type': 'object',
            'properties': {
                'subject': {'type': 'string'},
                'htmlContent': {'type': 'string'},
                'recipients': {'type': 'array', 'items': {'type': 'string'}},
                'isTest': {'type': 'boolean'}
            }
        },
        responses={
            200: OpenApiResponse(description="Newsletter sent successfully!"),
            400: OpenApiResponse(description="No recipients found.")
        }
    )
    def post(self, request):
        # Extract newsletter details from request
        subject = request.data.get("subject", "Newsletter")
        html_content = request.data.get("htmlContent", "")
        recipients = request.data.get("recipients", [])
        is_test = request.data.get("isTest", False)

        # If it's not a test, get all active subscribers
        if not is_test:
            subscribers = list(Subscriber.objects.filter(is_active=True).values_list("email", flat=True))
        else:
            subscribers = recipients

        if not subscribers:
            return Response(
                {"message": "No recipients found."}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            # Create plain text version of the HTML content
            plain_message = strip_tags(html_content)

            # Create email message
            email = EmailMultiAlternatives(
                subject=subject,
                body=plain_message,
                from_email=settings.DEFAULT_FROM_EMAIL,
                to=[],  # We'll use bcc for mass emails
                bcc=subscribers  # Send to all subscribers via BCC
            )
            
            # Attach HTML version
            email.attach_alternative(html_content, "text/html")
            
            # Send email
            email.send()

            # Log successful newsletter send
            logger.info(f"Newsletter {'test' if is_test else 'mass'} sent to {len(subscribers)} recipients")

            return Response(
                {
                    "message": "Newsletter sent successfully!", 
                    "recipients": len(subscribers)
                }, 
                status=status.HTTP_200_OK
            )

        except smtplib.SMTPAuthenticationError:
            logger.error("SMTP Authentication failed")
            return Response(
                {"error": "SMTP Authentication failed. Check your email settings."}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
        except smtplib.SMTPException as e:
            logger.error(f"SMTP error: {str(e)}")
            return Response(
                {"error": f"SMTP error: {str(e)}"}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
        except Exception as e:
            logger.error(f"Unexpected error sending newsletter: {str(e)}")
            return Response(
                {"error": "An unexpected error occurred while sending the newsletter."}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class DashboardStatsView(APIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsAdmin | IsSuperAdmin]  

    @extend_schema(
        responses={
            200: {
                "total_subscribers": int,
                "total_admins": int,
                "total_blogs": int,
                "total_reviews": int,
                "total_careers": int,
                "total_messages": int,
                "total_news": int,
                "total_consultations": int,
                "total_case_studies": int,
                "total_proposals": int,
                "total_awards": int,
                "total_career_applications": int,
                "recent_activities": list,
            }
        },
        summary="Get Dashboard Stats",
        description="Returns statistics such as total subscribers, total admins, active sessions, blogs, reviews, careers, awards, news, consultations, case studies, proposals, career applications, and recent activities.",
    )
    def get(self, request):
        total_subscribers = Subscriber.objects.count()
        total_admins = CustomUser.objects.filter(is_admin=True).count()
        total_blogs = Blog.objects.count()
        total_reviews = Review.objects.count()
        total_careers = Career.objects.count()
        total_messages = Message.objects.count()
        total_news = News.objects.count()
        total_consultations = Consultation.objects.count()
        total_case_studies = CaseStudy.objects.count()
        total_proposals = ProposalRequest.objects.count()
        total_awards = Award.objects.count()
        total_career_applications = CareerApplication.objects.count()

        # Fetch recent activities
        recent_activities = []

        def add_activity(model, message, category):
            """Helper function to add recent activities"""
            # Determine the correct timestamp field to use
            timestamp_field = 'created_at' if hasattr(model, 'created_at') else 'date' if hasattr(model, 'date') else None

            if timestamp_field:
                latest_entry = model.objects.order_by(f'-{timestamp_field}').first()
                if latest_entry:
                    timestamp = getattr(latest_entry, timestamp_field, None)
                    if timestamp:
                        recent_activities.append({
                            "message": message,
                            "date": timestamp.strftime("%b %d, %Y"),
                            "category": category
                        })

        # Add activities for all categories
        add_activity(Blog, "New blog post published", "Blog")
        add_activity(Review, "New review added", "Reviews")
        add_activity(Career, "New career position added", "Careers")
        add_activity(Message, "New Message received", "Messages")
        add_activity(News, "New news update", "News")
        add_activity(Consultation, "New consultation request", "Consultation")
        add_activity(CaseStudy, "New case study published", "Case Study")
        add_activity(ProposalRequest, "New proposal submitted", "Proposal")
        add_activity(Award, "New award received", "Awards")
        add_activity(CareerApplication, "New career application submitted", "Career Applications")

        # New Subscribers Activity (last 24h count)
        new_subscribers_count = Subscriber.objects.filter(subscribed_at__gte=timezone.now() - timedelta(days=1)).count()
        if new_subscribers_count > 0:
            recent_activities.append({
                "message": f"{new_subscribers_count} new subscribers",
                "date": timezone.now().strftime("%b %d, %Y"),
                "category": "Subscribers"
            })

        return Response({
            "total_subscribers": total_subscribers,
            "total_admins": total_admins,
            "total_blogs": total_blogs,
            "total_reviews": total_reviews,
            "total_careers": total_careers,
            "total_messages": total_messages,
            "total_news": total_news,
            "total_consultations": total_consultations, 
            "total_case_studies": total_case_studies,
            "total_proposals": total_proposals,
            "total_awards": total_awards,
            "total_career_applications": total_career_applications,
            "recent_activities": recent_activities,
        })


class MessageViewSet(viewsets.ModelViewSet):
    """API endpoint for managing messages."""
    
    queryset = Message.objects.all().order_by('-created_at')
    serializer_class = MessageSerializer
    permission_classes = [permissions.AllowAny]
    http_method_names = ['get', 'post', 'delete']

    @extend_schema(
        summary="List Messages",
        description="Retrieve all messages, ordered by creation date.",
        responses={200: MessageSerializer(many=True)}
    )
    def list(self, request, *args, **kwargs):
        """Retrieve all messages with proper ordering."""
        return super().list(request, *args, **kwargs)

    @extend_schema(
        summary="Create Message",
        description="Create a new message entry.",
        request=MessageSerializer,
        responses={201: MessageSerializer, 400: "Bad Request"}
    )
    def create(self, request, *args, **kwargs):
        """Create a new message with validation."""
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @extend_schema(
        summary="Delete Message",
        description="Delete a specific message by ID.",
        responses={204: "No Content", 404: "Not Found"}
    )
    def destroy(self, request, *args, **kwargs):
        """Delete a message by ID."""
        return super().destroy(request, *args, **kwargs)


class ReviewViewSet(viewsets.ModelViewSet):
    """API endpoint for managing reviews."""

    queryset = Review.objects.all().order_by('-created_at')
    serializer_class = ReviewSerializer
    parser_classes = [MultiPartParser, FormParser]
    permission_classes = [permissions.AllowAny]
    http_method_names = ['get', 'post', 'put', 'delete']  # Allow DELETE method

    @extend_schema(
        summary="List Reviews",
        description="Retrieve all reviews, ordered by creation date.",
        responses={200: ReviewSerializer(many=True)}
    )
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)

    @extend_schema(
        summary="Create Review",
        description="Create a new review entry.",
        request=ReviewSerializer,
        responses={201: ReviewSerializer}
    )
    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)

    @extend_schema(
        summary="Update Review",
        description="Update an existing review.",
        request=ReviewSerializer,
        responses={200: ReviewSerializer}
    )
    def update(self, request, *args, **kwargs):
        return super().update(request, *args, **kwargs)

    @extend_schema(
        summary="Toggle Review Status",
        description="Toggles the review status between 'ON' and 'OFF'.",
        responses={200: OpenApiResponse(description="Status toggled successfully.")}
    )
    @action(detail=True, methods=['put'], permission_classes=[IsAdmin])
    def toggle(self, request, pk=None):
        review = self.get_object()
        review.status = 'OFF' if review.status == 'ON' else 'ON'
        review.save()
        return Response({'status': review.status})

    @extend_schema(
        summary="Delete a Review",
        description="Allows Admin & SuperAdmin to delete a specific review.",
        responses={204: OpenApiResponse(description="Review deleted successfully.")}
    )
    @action(detail=True, methods=['delete'], permission_classes=[IsAdmin | IsSuperAdmin])
    def delete_review(self, request, pk=None):
        review = self.get_object()
        review.delete()
        return Response({"message": "Review deleted successfully."}, status=status.HTTP_204_NO_CONTENT)


class ConsultationViewSet(viewsets.ModelViewSet):
    """API endpoint for managing consultations."""

    queryset = Consultation.objects.all().order_by('-created_at')
    serializer_class = ConsultationSerializer
    permission_classes = [permissions.AllowAny]
    http_method_names = ['get', 'post', 'delete']

    @extend_schema(
        summary="List Consultations",
        description="Retrieve all consultations, ordered by creation date.",
        responses={200: ConsultationSerializer(many=True)}
    )
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)

    @extend_schema(
        summary="Create Consultation",
        description="Create a new consultation request.",
        request=ConsultationSerializer,
        responses={201: ConsultationSerializer}
    )
    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)

    @extend_schema(
        summary="Delete Consultation",
        description="Delete a specific consultation by ID.",
        responses={204: "No Content"}
    )
    def destroy(self, request, *args, **kwargs):
        return super().destroy(request, *args, **kwargs)


class BlogViewSet(viewsets.ModelViewSet):
    """API endpoint for managing blogs."""

    queryset = Blog.objects.all().order_by('-date')
    serializer_class = BlogSerializer
    permission_classes = [permissions.AllowAny]

    @extend_schema(
        summary="List Blogs",
        description="Retrieve all blog posts, ordered by creation date.",
        responses={200: BlogSerializer(many=True)}
    )
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)

    @extend_schema(
        summary="Create Blog",
        description="Create a new blog post.",
        request=BlogSerializer,
        responses={201: BlogSerializer}
    )
    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)

    @extend_schema(
        summary="Retrieve Blog",
        description="Retrieve details of a specific blog post.",
        responses={200: BlogSerializer}
    )
    def retrieve(self, request, *args, **kwargs):
        return super().retrieve(request, *args, **kwargs)

    @extend_schema(
        summary="Update Blog",
        description="Update an existing blog post.",
        request=BlogSerializer,
        responses={200: BlogSerializer}
    )
    def update(self, request, *args, **kwargs):
        return super().update(request, *args, **kwargs)

    @extend_schema(
        summary="Delete Blog",
        description="Delete a specific blog post.",
        responses={204: OpenApiResponse(description="Blog deleted successfully.")}
    )
    def destroy(self, request, *args, **kwargs):
        return super().destroy(request, *args, **kwargs)

    @extend_schema(
        summary="Like Blog",
        description="Increase the like count of a blog post.",
        responses={200: OpenApiResponse(description="Like count updated successfully.")}
    )
    @action(detail=True, methods=['post'])
    def like(self, request, pk=None):
        """Increase like count for a blog post."""
        blog = get_object_or_404(Blog, pk=pk)
        blog.likes += 1
        blog.save()
        return Response({'likes': blog.likes}, status=status.HTTP_200_OK)


@extend_schema_view(
    list=extend_schema(
        summary="Retrieve a list of news articles",
        description="Returns a paginated list of news articles with optional filtering, searching, and ordering.",
        parameters=[
            OpenApiParameter(name='search', description='Search in title and content', required=False, type=str),
            OpenApiParameter(name='category', description='Filter by category', required=False, type=str),
            OpenApiParameter(name='ordering', description='Order by date', required=False, type=str),
        ]
    )
)

class NewsViewSet(viewsets.ModelViewSet):
    """API endpoint for managing news articles."""
    
    queryset = News.objects.all().order_by('-created_at')
    serializer_class = NewsSerializer
    permission_classes = [permissions.AllowAny]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['category']
    search_fields = ['title', 'content']
    ordering_fields = ['created_at']
    ordering = ['-created_at']


@extend_schema_view(
    list=extend_schema(
        summary="Retrieve a list of career opportunities",
        description="Returns a paginated list of career postings with optional filtering, searching, and ordering.",
        parameters=[
            OpenApiParameter(name='search', description='Search in title and description', required=False, type=str),
            OpenApiParameter(name='application_deadline', description='Filter by application deadline', required=False, type=str),
            OpenApiParameter(name='ordering', description='Order by posted date", required=False, type=str'),
        ]
    )
)


@extend_schema_view(
    list=extend_schema(
        summary="Retrieve a list of job listings",
        description="Returns a paginated list of job listings with optional filtering, searching, and ordering.",
        parameters=[
            OpenApiParameter(name='search', description='Search in title and description', required=False, type=str),
            OpenApiParameter(name='location', description='Filter by job location', required=False, type=str),
            OpenApiParameter(name='job_type', description='Filter by job type', required=False, type=str),
            OpenApiParameter(name='active_listing', description='Filter by active listings', required=False, type=bool),
            OpenApiParameter(name='application_deadline', description='Filter by application deadline', required=False, type=str),
            OpenApiParameter(name='ordering', description='Order by date', required=False, type=str),
        ]
    )
)


class CareerViewSet(viewsets.ModelViewSet):
    """API endpoint for managing job listings."""

    queryset = Career.objects.filter(active_listing=True).order_by('-created_at')
    serializer_class = CareerSerializer
    permission_classes = [permissions.AllowAny]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['location', 'job_type', 'active_listing', 'application_deadline']
    search_fields = ['title', 'description']
    ordering_fields = ['created_at']
    ordering = ['-created_at']


@extend_schema_view(
    list=extend_schema(
        summary="List all career applications",
        description="Retrieves all career applications with optional filters by career ID and status.",
        responses={200: CareerApplicationSerializer(many=True)}
    ),
    retrieve=extend_schema(
        summary="Retrieve a specific career application",
        description="Fetches a specific application by ID. If status is 'pending', it updates it to 'reviewed'.",
        responses={200: CareerApplicationSerializer}
    ),
    create=extend_schema(
        summary="Submit a new career application",
        description="Creates a new career application. **Uploads resume** as a file.",
        request={
            "multipart/form-data": {
                "type": "object",
                "properties": {
                    "applicant_name": {"type": "string"},
                    "applicant_email": {"type": "string", "format": "email"},
                    "cover_letter": {"type": "string"},
                    "career": {"type": "integer"},
                    "resume": {"type": "string", "format": "binary"}  # ✅ Enable file uploads
                }
            }
        },
        responses={201: CareerApplicationSerializer}
    ),
    update=extend_schema(
        summary="Update an application",
        description="Allows an admin to update an application status and trigger email notifications.",
        request=CareerApplicationSerializer,
        responses={200: CareerApplicationSerializer}
    ),
)
class CareerApplicationViewSet(viewsets.ModelViewSet):
    """Viewset for managing Career Applications."""
    
    queryset = CareerApplication.objects.all()
    serializer_class = CareerApplicationSerializer
    parser_classes = (MultiPartParser, FormParser)
    permission_classes = [permissions.IsAdminUser]  # Only admin can update

    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['career', 'status']
    search_fields = ['applicant_name', 'applicant_email']
    ordering_fields = ['applied_at']
    ordering = ['-applied_at']

    def create(self, request, *args, **kwargs):
        """Prevents applications for inactive job listings"""
        career_id = request.data.get("career")
        try:
            career = Career.objects.get(id=career_id, active_listing=True)
        except Career.DoesNotExist:
            return Response({"error": "This job listing is no longer active."}, status=status.HTTP_400_BAD_REQUEST)

        return super().create(request, *args, **kwargs)

    def retrieve(self, request, *args, **kwargs):
        """Auto-update status to 'Reviewed' when admin views an application."""
        instance = self.get_object()

        if instance.status == "pending":
            instance.status = "reviewed"
            instance.save()  # Save change to Reviewed

        serializer = self.get_serializer(instance)
        return Response(serializer.data)

    def update(self, request, *args, **kwargs):
        """Allow admin to change status and trigger email."""
        instance = self.get_object()
        old_status = instance.status
        response = super().update(request, *args, **kwargs)  # Call default update

        # If status changes, send email
        if old_status != instance.status:
            instance.send_email_notification()

        return response

    @extend_schema(
        summary="Shortlist an applicant",
        description="Admin can manually **shortlist** an applicant and send an interview email.",
        responses={200: {"type": "object", "properties": {"message": {"type": "string"}}}}
    )
    @action(detail=True, methods=['POST'])
    def shortlist(self, request, pk=None):
        """Admin manually shortlists an applicant and sends an interview email"""
        instance = self.get_object()
        instance.status = "shortlisted"
        instance.save()
        return Response({"message": "Applicant shortlisted and interview email sent"}, status=status.HTTP_200_OK)

    @extend_schema(
        summary="Reject an applicant",
        description="Admin can manually **reject** an applicant and send a rejection email.",
        responses={200: {"type": "object", "properties": {"message": {"type": "string"}}}}
    )
    @action(detail=True, methods=['POST'])
    def reject(self, request, pk=None):
        """Admin manually rejects an applicant and sends rejection email"""
        instance = self.get_object()
        instance.status = "rejected"
        instance.save()
        return Response({"message": "Applicant rejected and rejection email sent"}, status=status.HTTP_200_OK)

    @extend_schema(
        summary="Hire an applicant",
        description="Admin can manually **hire** an applicant and send a hiring email.",
        responses={200: {"type": "object", "properties": {"message": {"type": "string"}}}}
    )
    @action(detail=True, methods=['POST'])
    def hire(self, request, pk=None):
        """Admin manually hires an applicant and sends hiring email"""
        instance = self.get_object()
        instance.status = "hired"
        instance.save()
        return Response({"message": "Applicant hired and hiring email sent"}, status=status.HTTP_200_OK)


class AwardViewSet(viewsets.ModelViewSet):
    """API endpoint for managing awards."""
    
    queryset = Award.objects.all().order_by('-created_at')
    serializer_class = AwardSerializer
    permission_classes = [permissions.AllowAny]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['awarded_date']
    search_fields = ['title', 'description']
    ordering_fields = ['awarded_date']
    ordering = ['-awarded_date']


class ProposalRequestViewSet(viewsets.ModelViewSet):
    queryset = ProposalRequest.objects.all()
    serializer_class = ProposalRequestSerializer
    permission_classes = [permissions.AllowAny]
    parser_classes = [MultiPartParser, FormParser]  # Enable file upload

    @extend_schema(
        summary="Send Proposal Document",
        description="Allows an admin to upload a proposal document and send it via email to the recipient.",
        request={"multipart/form-data": {
            "admin_response": "string",
            "proposal_document": "file"
        }},
        responses={200: {"status": "Proposal sent successfully and email delivered."}},
    )
    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAdminUser])
    def send_proposal(self, request, pk=None):
        """
        Admins can send a proposal document with a response message via email.
        """
        proposal = self.get_object()
        admin_response = request.data.get("admin_response")
        proposal_document = request.FILES.get("proposal_document")

        if not admin_response or not proposal_document:
            return Response({"error": "Admin response and document are required."}, status=status.HTTP_400_BAD_REQUEST)

        if not proposal.email:
            return Response({"error": "Proposal email is missing."}, status=status.HTTP_400_BAD_REQUEST)

        # Save the document correctly
        try:
            file_path = default_storage.save(f"proposals/{proposal_document.name}", proposal_document)
            proposal.proposal_document = file_path  # Store file path, not the file object
            proposal.status = "sent"
            proposal.save()
        except Exception as e:
            return Response({"error": f"Failed to save document: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        # Read file content
        try:
            with default_storage.open(file_path, "rb") as doc_file:
                file_content = doc_file.read()
        except Exception as e:
            return Response({"error": f"Failed to read document: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        # Send email
        try:
            email = EmailMessage(
                subject=f"Your Proposal from Go Digital Africa {request.user}",
                body=f"Hello {proposal.name},\n\n{admin_response}\n\nPlease find your proposal document attached below.",
                from_email=settings.DEFAULT_FROM_EMAIL,
                to=[proposal.email],
            )
            content_type = proposal_document.content_type or "application/pdf"
            email.attach(proposal_document.name, file_content, content_type)
            email.send()
        except Exception as e:
            return Response({"error": f"Failed to send email: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response({"status": "Proposal sent successfully and email delivered."}, status=status.HTTP_200_OK)

    @extend_schema(
        summary="Mark Proposal as Reviewed",
        description="Allows an admin to mark a proposal as 'reviewed'.",
        responses={200: {"status": "Proposal marked as reviewed."}},
    )
    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAdminUser])
    def mark_reviewed(self, request, pk=None):
        """
        Mark a proposal request as reviewed.
        """
        proposal = self.get_object()
        if proposal.status == "reviewed":
            return Response({"status": "Proposal is already marked as reviewed."}, status=status.HTTP_200_OK)

        proposal.status = "reviewed"
        proposal.save()

        return Response({"status": "Proposal marked as reviewed."}, status=status.HTTP_200_OK)


class CaseStudyPagination(PageNumberPagination):
    page_size = 10  # Set how many case studies per page
    page_size_query_param = 'page_size'
    max_page_size = 50

@extend_schema(
    summary="List and Create Case Studies",
    description="Allows users to view case studies, while only admins can create new ones. Supports filtering by industry and searching by title or description.",
    parameters=[
        OpenApiParameter("page", OpenApiTypes.INT, description="Page number for pagination"),
        OpenApiParameter("page_size", OpenApiTypes.INT, description="Number of items per page"),
        OpenApiParameter("industry", OpenApiTypes.STR, description="Filter by industry"),
        OpenApiParameter("search", OpenApiTypes.STR, description="Search by title or description"),
    ],
    responses={
        200: CaseStudySerializer(many=True),
        201: CaseStudySerializer(),
    },
)
class CaseStudyListCreateView(generics.ListCreateAPIView):
    queryset = CaseStudy.objects.all().order_by('-created_at')
    serializer_class = CaseStudySerializer
    pagination_class = CaseStudyPagination
    filter_backends = [DjangoFilterBackend, SearchFilter]
    filterset_fields = ['industry']  # Filter by industry
    search_fields = ['title', 'description']  # Search by title & description

    def get_permissions(self):
        if self.request.method == "POST":
            return [permissions.IsAuthenticated(), permissions.IsAdminUser()]
        return [permissions.AllowAny()]

@extend_schema(
    summary="Retrieve, Update, or Delete a Case Study",
    description="Allows anyone to retrieve case studies, but only admins can update or delete them.",
    responses={
        200: CaseStudySerializer(),
        403: OpenApiResponse(description="Permission Denied"),
        404: OpenApiResponse(description="Not Found"),
    },
)
class CaseStudyDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = CaseStudy.objects.all()
    serializer_class = CaseStudySerializer

    def get_permissions(self):
        if self.request.method in ["PUT", "PATCH", "DELETE"]:
            return [permissions.IsAuthenticated(), permissions.IsAdminUser()]
        return [permissions.AllowAny()]


@extend_schema(
    summary="Manage Company Information",
    description="Allows only admins to view, update, or delete company information such as phone number, email, and office location.",
    responses={
        200: CompanyInfoSerializer(),
        403: OpenApiResponse(description="Permission Denied"),
        404: OpenApiResponse(description="Not Found"),
    },
)
class CompanyInfoViewSet(viewsets.ModelViewSet):
    queryset = CompanyInfo.objects.all()
    serializer_class = CompanyInfoSerializer
    permission_classes = [permissions.AllowAny]


@extend_schema(
    summary="Manage Partners",
    description="Allows only admins to add, update, or delete company partners.",
    responses={
        200: PartnerSerializer(many=True),
        201: PartnerSerializer(),
        403: OpenApiResponse(description="Permission Denied"),
    },
)
class PartnerViewSet(viewsets.ModelViewSet):
    queryset = Partner.objects.all()
    serializer_class = PartnerSerializer
    permission_classes = [permissions.AllowAny]


# Decorate the view with the extend_schema
@extend_schema(
    summary="List Team Members Grouped by Department",
    description="Returns all team members, grouped under their respective departments, ordered by rank.",
    responses={200: TeamGroupedByDepartmentSerializer()},
    request=TeamMemberSerializer  # Add this to document the input fields for POST requests
)
class TeamListGroupedByDepartmentView(APIView):
    permission_classes = [permissions.AllowAny]  # Allow all users for GET request

    def get(self, request, pk=None):
        if pk:
            # Retrieve a single team member by ID
            try:
                member = TeamMember.objects.get(pk=pk)
                return Response(TeamMemberSerializer(member).data)
            except TeamMember.DoesNotExist:
                return Response({"detail": "Team member not found."}, status=status.HTTP_404_NOT_FOUND)
        else:
            # Queryset to fetch all team members, ordered by department
            members = TeamMember.objects.all().order_by('department')

            # Group members by department
            department_dict = defaultdict(list)
            for member in members:
                department = member.department if member.department else "Unassigned"
                department_dict[department].append(TeamMemberSerializer(member).data)

            # Convert dictionary to structured response
            structured_data = [{"department": dept, "members": members} for dept, members in department_dict.items()]

            return Response({"team": structured_data})

    def post(self, request):
        """
        Create a new team member (Admin only).
        """
        if not request.user.is_staff:
            return Response({"detail": "You do not have permission to add a team member."}, status=status.HTTP_403_FORBIDDEN)

        serializer = TeamMemberSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk=None):
        """
        Update an existing team member (Admin only).
        """
        if not request.user.is_staff:
            return Response({"detail": "You do not have permission to update a team member."}, status=status.HTTP_403_FORBIDDEN)

        try:
            member = TeamMember.objects.get(pk=pk)
        except TeamMember.DoesNotExist:
            return Response({"detail": "Team member not found."}, status=status.HTTP_404_NOT_FOUND)

        serializer = TeamMemberSerializer(member, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk=None):
        """
        Delete a team member (Admin only).
        """
        if not request.user.is_staff:
            return Response({"detail": "You do not have permission to delete a team member."}, status=status.HTTP_403_FORBIDDEN)

        try:
            member = TeamMember.objects.get(pk=pk)
            member.delete()
            return Response({"detail": "Team member deleted successfully."}, status=status.HTTP_204_NO_CONTENT)
        except TeamMember.DoesNotExist:
            return Response({"detail": "Team member not found."}, status=status.HTTP_404_NOT_FOUND)