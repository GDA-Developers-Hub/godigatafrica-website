from django.urls import path, include, re_path
from rest_framework.routers import DefaultRouter
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework_simplejwt.views import TokenRefreshView


# Import Views
from .views import (
    AdminLoginView, AdminCreateView, AdminDeleteView, AdminLogoutView,
    RequestPasswordResetView, ResetPasswordView,
    SubscribeView, UnsubscribeView, SubscriberListView, SubscriberDeleteView,
    DashboardStatsView,
    MessageViewSet, ReviewViewSet, ConsultationViewSet, BlogViewSet, 
    NewsViewSet, CareerViewSet, AwardViewSet, SendNewsletterView, AdminListView, AdminUpdateView,
    ProposalRequestViewSet, CaseStudyListCreateView, CaseStudyDetailView,
    TeamListGroupedByDepartmentView, CareerApplicationViewSet, CompanyInfoViewSet, 
    PartnerViewSet
)


# API Documentation Setup
schema_view = get_schema_view(
    openapi.Info(
        title="Admin API Documentation",
        default_version='v1',
        description="API endpoints for the Admin Dashboard",
        terms_of_service="https://www.godigitalafrica.com/terms/",
        contact=openapi.Contact(email="support@godigitalafrica.com"),
        license=openapi.License(name="MIT License"),
    ),
    public=True,
    permission_classes=[permissions.AllowAny],
)


# DRF Router (Register ViewSets)
router = DefaultRouter()
router.register(r'messages', MessageViewSet, basename='message')
router.register(r'reviews', ReviewViewSet, basename='review')
router.register(r'consultations', ConsultationViewSet, basename='consultation')
router.register(r'proposals', ProposalRequestViewSet, basename='proposalrequest')
router.register(r'blogs', BlogViewSet)
router.register(r'news', NewsViewSet)
router.register(r'careers', CareerViewSet)
router.register(r'apply', CareerApplicationViewSet, basename="apply")
router.register(r'awards', AwardViewSet)
router.register(r'company-info', CompanyInfoViewSet)
router.register(r'partners', PartnerViewSet)

# URL Patterns
urlpatterns = [
    # API Documentation
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    re_path(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),

    # API Router URLs
    path('api/v1/', include(router.urls)),

    # Authentication & Admin Management
    path('api/v1/admins/', AdminListView.as_view(), name='admin-list'),
    path('api/v1/admin/login/', AdminLoginView.as_view(), name='admin-login'),
    path('api/v1/admin/create/', AdminCreateView.as_view(), name='admin-create'),
    path('api/v1/admin/<int:pk>/', AdminUpdateView.as_view(), name='admin-update'),
    path('api/v1/admin/delete/<int:pk>/', AdminDeleteView.as_view(), name='admin-delete'),
    path('api/v1/admin/logout/', AdminLogoutView.as_view(), name='admin-logout'),

    # Token Management
    path('api/v1/token/refresh/', TokenRefreshView.as_view(), name='token-refresh'),

    # Subscription Management
    path('api/v1/subscribe/', SubscribeView.as_view(), name='subscribe'),
    path('api/v1/unsubscribe/<str:email>/', UnsubscribeView.as_view(), name='unsubscribe'),
    path('api/v1/list/subscribers/', SubscriberListView.as_view(), name='subscriber-list'),
    path('api/v1/subscribers/delete/<int:pk>/', SubscriberDeleteView.as_view(), name='subscriber-delete'),

    # Api to send Newsletter
    path("api/v1/send-newsletter/", SendNewsletterView.as_view(), name="send-newsletter"),

    # Password Reset
    path('api/v1/password-reset/', RequestPasswordResetView.as_view(), name='password-reset'),
    path('api/v1/password-reset-confirm/<uidb64>/<token>/', ResetPasswordView.as_view(), name='password-reset-confirm'),

    # Dashboard Statistics
    path('api/v1/dashboard/stats/', DashboardStatsView.as_view(), name='dashboard-stats'),

    # Endpoint for CaseStudies
    path('api/v1/case-studies/', CaseStudyListCreateView.as_view(), name='case-study-list-create'),
    path('api/v1/case-studies/<int:pk>/', CaseStudyDetailView.as_view(), name='case-study-detail'),

    #Endpoint for Team Members
    path('api/v1/team/', TeamListGroupedByDepartmentView.as_view(), name='team-grouped'),
    path('api/v1/team/<int:pk>/', TeamListGroupedByDepartmentView.as_view(), name='team-detail'),
]