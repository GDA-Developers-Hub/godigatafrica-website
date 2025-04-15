from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.core.exceptions import ValidationError
from .models import CustomUser, Subscriber, Message, Review, Consultation, Blog, News, Career, Award, ProposalRequest, CaseStudy, TeamMember, CareerApplication, CompanyInfo, Partner

class CustomUserAdmin(UserAdmin):
    list_display = ('id', 'username', 'email', 'role', 'is_super_admin', 'is_admin', 'is_staff', 'is_active', 'last_login', "date_joined")
    list_filter = ('is_super_admin', 'is_admin', 'is_staff', 'is_active')
    search_fields = ('email', 'username')
    ordering = ('username',)

    fieldsets = (
        (None, {'fields': ('username', 'email', 'password')}),
        ('Permissions', {'fields': ('is_super_admin', 'is_admin', 'is_staff', 'is_active', 'groups', 'user_permissions')}),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'email', 'password1', 'password2', 'is_super_admin', 'is_admin', 'is_staff', 'is_active'),
        }),
    )

    def save_model(self, request, obj, form, change):
        """
        Ensure that only one super admin exists.
        """
        if obj.is_super_admin:
            existing_super_admin = CustomUser.objects.filter(is_super_admin=True).exclude(pk=obj.pk)
            if existing_super_admin.exists():
                raise ValidationError("Only one super admin can exist.")
        
        # Ensure super admin is also marked as admin
        if obj.is_super_admin:
            obj.is_admin = True  

        # Hash the password if it has been changed
        if change:  # Only hash when editing
            if 'password' in form.changed_data:
                obj.password = make_password(obj.password)

        super().save_model(request, obj, form, change)

admin.site.register(CustomUser, CustomUserAdmin)


@admin.register(Subscriber)
class SubscriberAdmin(admin.ModelAdmin):
    list_display = ('email', 'subscribed_at', "is_active")  # Display these fields in the admin list view
    search_fields = ('email',)  # Allow admin to search by email
    list_filter = ('subscribed_at',)  # Filter subscriptions by date


@admin.register(Message)
class MessageAdmin(admin.ModelAdmin):
    list_display = ('full_name', 'email', 'phone', 'created_at')
    search_fields = ('full_name', 'email', 'phone')
    list_filter = ('created_at',)
    ordering = ('-created_at',)


@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ('name', 'rating', 'status', 'created_at')
    search_fields = ('name', 'position', 'comment')
    list_filter = ('rating', 'status', 'created_at')
    ordering = ('-created_at',)


@admin.register(Consultation)
class ConsultationAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'phone', 'date', 'created_at')
    search_fields = ('name', 'email', 'phone')
    list_filter = ('date', 'created_at')
    ordering = ('-date',)


@admin.register(Blog)
class BlogAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'author_name', 'date', 'likes')  # Fields to display in the admin list view
    list_filter = ('date', 'author_name')  # Filters for the sidebar
    search_fields = ('title', 'author_name', 'excerpt')  # Search functionality
    ordering = ('-date',)  # Default ordering

    # Optional: Customizing how the blog is displayed in the admin
    fieldsets = (
        ('Basic Information', {
            'fields': ('title', 'excerpt', 'image', 'date')
        }),
        ('Author Details', {
            'fields': ('author_name', 'author_avatar', 'author_role')
        }),
        ('Engagement', {
            'fields': ('likes',)
        }),
    )


@admin.register(News)
class NewsAdmin(admin.ModelAdmin):
    """Admin panel configuration for News model."""
    
    list_display = ('title', 'created_at')  # Fields to display in the admin list
    list_filter = ('created_at',)  # Filters in the sidebar
    search_fields = ('title', 'content')  # Searchable fields
    ordering = ('-created_at',)  # Default ordering


@admin.register(Career)
class CareerAdmin(admin.ModelAdmin):
    """Admin panel configuration for Career model."""

    list_display = ('title', 'location', 'job_type', 'application_deadline', 'active_listing', 'created_at')  # Display active status
    list_filter = ('location', 'job_type', 'active_listing', 'application_deadline', 'created_at')  # Filtering options
    search_fields = ('title', 'description')  # Enable search
    ordering = ('-created_at',)  # Default sorting
    list_editable = ('active_listing',)  # Make active_listing editable from the list view

@admin.register(CareerApplication)
class CareerApplicationAdmin(admin.ModelAdmin):
    list_display = ("applicant_name", "career", "resume", "applied_at")
    search_fields = ("applicant_name", "career__title")
    list_filter = ("applied_at",)


@admin.register(Award)
class AwardAdmin(admin.ModelAdmin):
    """Admin panel configuration for Award model."""
    
    list_display = ('title', 'awarded_date', 'created_at')  # Fields shown in admin
    list_filter = ('awarded_date', 'created_at')  # Sidebar filter
    search_fields = ('title', 'description')  # Search feature
    ordering = ('-created_at',)  # Default order


@admin.register(ProposalRequest)
class ProposalRequestAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "email", "service_interest", "status", "created_at")
    list_filter = ("status", "service_interest", "created_at")
    search_fields = ("name", "details")
    ordering = ("-created_at",)
    readonly_fields = ("created_at",)

    fieldsets = (
        ("Requester Details", {
            "fields": ("name", "email", "service_interest", "details")
        }),
        ("Admin Review", {
            "fields": ("status", "admin_response", "proposal_document")
        }),
        ("Timestamps", {
            "fields": ("created_at",)
        }),
    )

#    def has_add_permission(self, request):
#       """Prevent adding proposals via Django Admin."""
#       return False  # Proposals should only be submitted via API or frontend


@admin.register(CaseStudy)
class CaseStudyAdmin(admin.ModelAdmin):
    list_display = ('title', 'industry', 'created_at')  # Columns to show in the list view
    list_filter = ('industry', 'created_at')  # Filters on the right panel
    search_fields = ('title', 'description')  # Search functionality
    ordering = ('-created_at',)  # Order by latest case study first
    readonly_fields = ('created_at',)  # Make `created_at` read-only


@admin.register(TeamMember)
class TeamMemberAdmin(admin.ModelAdmin):
    list_display = ('name', 'role', 'created_at')
    search_fields = ('name', 'role')
    list_filter = ('role', 'created_at')


@admin.register(CompanyInfo)
class CompanyInfoAdmin(admin.ModelAdmin):
    list_display = ("phone_number", "email", "office_location")
    search_fields = ("email", "office_location")


@admin.register(Partner)
class PartnerAdmin(admin.ModelAdmin):
    list_display = ("name", "logo_preview")
    search_fields = ("name",)

    def logo_preview(self, obj):
        return obj.logo.url if obj.logo else "No Image"
    logo_preview.short_description = "Logo"