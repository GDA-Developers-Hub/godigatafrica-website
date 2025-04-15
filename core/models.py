from django.contrib.auth.models import AbstractUser
from django.db import models
from django.core.exceptions import ValidationError
from django.core.mail import send_mail
from rest_framework.decorators import action
import logging

class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)  
    is_super_admin = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)  # New field for regular admins

    @property
    def role(self):
        """ Return the role of the user dynamically. """
        if self.is_super_admin:
            return "Super Admin"
        elif self.is_admin:
            return "Admin"
        return "User"  # Default role for non-admin users

    def clean(self):
        """
        Ensure only one super admin exists at a time.
        """
        if self.is_super_admin:
            # Check if there is already another super admin
            if CustomUser.objects.filter(is_super_admin=True).exclude(pk=self.pk).exists():
                raise ValidationError("Only one super admin can exist.")

    def save(self, *args, **kwargs):
        self.clean()  # Call clean method to validate before saving

        if self.is_super_admin:
            self.is_admin = True  # Super admin is also an admin
            self.is_superuser = True  # Ensure super admin has superuser rights

        if self.is_admin and not self.is_super_admin:
            self.is_staff = True  # Ensure all admins are marked as staff

        super().save(*args, **kwargs)



class Subscriber(models.Model):
    email = models.EmailField(unique=True)
    subscribed_at = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)  # True if subscribed, False if unsubscribed

    def __str__(self):
        return self.email


class Message(models.Model):
    full_name = models.CharField(max_length=255)  # Updated from name to full_name
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Message from {self.full_name} ({self.email})"

    class Meta:
        ordering = ['-created_at']  # Latest messages first


class Review(models.Model):
    STATUS_CHOICES = [
        ('ON', 'On'),
        ('OFF', 'Off')
    ]
    name = models.CharField(max_length=255)
    position = models.CharField(max_length=255, blank=True, null=True)  # Optional field
    rating = models.IntegerField(choices=[(i, i) for i in range(1, 6)])
    comment = models.TextField()
    image_url = models.URLField(blank=True, null=True)  # Image URL from Cloudinary
    status = models.CharField(max_length=3, choices=STATUS_CHOICES, default='ON')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} ({self.rating}/5)"

    class Meta:
        ordering = ['-created_at']  # Show latest reviews first


class Consultation(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    date = models.DateField()
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Consultation with {self.name} on {self.date}"

    class Meta:
        ordering = ['-date']  # Show upcoming consultations first


class Blog(models.Model):
    title = models.CharField(max_length=255)
    excerpt = models.TextField()
    image = models.URLField()
    date = models.DateField()
    author_name = models.CharField(max_length=255)
    author_avatar = models.URLField()
    author_role = models.CharField(max_length=255)
    likes = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.title


class News(models.Model):
    CATEGORY_CHOICES = [
        ('Business', 'Business'),
        ('Politics', 'Politics'),
        ('Sports', 'Sports'),
        ('Technology', 'Technology'),
        ('Health', 'Health'),
        ('Entertainment', 'Entertainment'),  
    ]

    title = models.CharField(max_length=255)
    content = models.TextField()
    image = models.URLField()
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, default='Business') 
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "News"
        verbose_name_plural = "News"

    def __str__(self):
        return self.title


class Career(models.Model):
    JOB_TYPES = [
        ('full-time', 'Full-time'),
        ('part-time', 'Part-time'),
        ('remote', 'Remote'),
        ('internship', 'Internship'),
        ('contract', 'Contract'),
    ]
    LOCATION_CHOICES = [
        ("Nairobi, Kenya", "Nairobi, Kenya"),
        ("Mogadishu, Somalia", "Mogadishu, Somalia"),
        ("Dubai, UAE", "Dubai, UAE"),
        ("Dodoma, Tanzania", "Dodoma, Tanzania"),
        ("Accra, Ghana", "Accra, Ghana"),
        ("Ethopia, Addis Ababa", "Ethopia, Addis Ababa"),
        ("Dakar, Senegal", "Dakar, Senegal"),
        ("Kigali, Rwanda", "Kigali, Rwanda"),

    ]
    title = models.CharField(max_length=255)
    description = models.TextField()
    location = models.CharField(max_length=255, choices=LOCATION_CHOICES, default="Nairobi, Kenya")  # Added job location
    job_type = models.CharField(max_length=20, choices=JOB_TYPES, default='Full-time')  # Added job type
    requirements = models.TextField()
    application_deadline = models.DateField()
    active_listing = models.BooleanField(default=True)  # Added active listing flag
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


logger = logging.getLogger(__name__)  # Set up logging for debugging

class CareerApplication(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('reviewed', 'Reviewed'),
        ('shortlisted', 'Shortlisted'),
        ('rejected', 'Rejected'),
        ('hired', 'Hired'),
    ]

    applicant_name = models.CharField(max_length=255)
    applicant_email = models.EmailField()
    cover_letter = models.TextField()
    resume = models.FileField(upload_to='resumes/')
    career = models.ForeignKey(Career, on_delete=models.CASCADE, related_name="applications")
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    applied_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.applicant_name} - {self.career.title}"

    def send_email_notification(self):
        """Send an email when status changes, only if the email exists."""
        if not self.applicant_email:  # Ensure email exists
            logger.error(f"Missing email for applicant {self.applicant_name}")
            return  

        subject = ""
        message = ""

        if self.status == "shortlisted":
            subject = "Interview Scheduled - Next Steps"
            message = f"""
            Dear {self.applicant_name},

            Congratulations! You have been shortlisted for the {self.career.title} position.
            Please check your email for further instructions regarding the interview schedule.

            Best regards,
            Hiring Team
            """

        elif self.status == "rejected":
            subject = "Application Update - Rejected"
            message = f"""
            Dear {self.applicant_name},

            Thank you for applying for the {self.career.title} position. Unfortunately, we have decided to proceed with other candidates.
            We appreciate your interest and encourage you to apply again in the future.

            Best regards,
            Hiring Team
            """

        elif self.status == "hired":
            subject = "Welcome to the Team!"
            message = f"""
            Dear {self.applicant_name},

            Congratulations! You have been selected for the {self.career.title} position.
            We look forward to working with you.

            Best regards,
            Hiring Team
            """

        if subject and message:
            try:
                send_mail(
                    subject,
                    message,
                    'noreply@godigitalafrica.com',  # Replace with your actual sender email
                    [self.applicant_email],
                    fail_silently=False,  # Ensure we get errors if email fails
                )
                logger.info(f"Email sent to {self.applicant_email} for status '{self.status}'")
            except Exception as e:
                logger.error(f"Failed to send email to {self.applicant_email}: {e}")

    def save(self, *args, **kwargs):
        """Trigger email sending when status is changed"""
        if self.pk:  # Check if object already exists (not a new application)
            old_status = CareerApplication.objects.get(pk=self.pk).status
            if old_status != self.status:  # Only send email if status changes
                self.send_email_notification()
        
        super().save(*args, **kwargs)



class Award(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    awarded_date = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


class ProposalRequest(models.Model):
    STATUS_CHOICES = [
        ("pending", "Pending"),
        ("reviewed", "Reviewed"),
        ("sent", "Sent"),
    ]

    SERVICE_CHOICES = [
        ("web_development", "Web Development"),
        ("mobile_app", "Mobile App Development"),
        ("digital_marketing", "Digital Marketing"),
        ("graphic_design", "Graphic Design"),
        ("seo", "SEO & Analytics"),
    ]

    name = models.CharField(max_length=100, help_text="Full name of the requester")
    email = models.EmailField(
    help_text="Email where the proposal will be sent",
    null=True,  
    blank=True  
    )
    # New field
    service_interest = models.CharField(max_length=50, choices=SERVICE_CHOICES)
    details = models.TextField(help_text="Describe your requirements")
    created_at = models.DateTimeField(auto_now_add=True)
    
    # Admin Response Fields
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="pending")
    admin_response = models.TextField(blank=True, null=True, help_text="Admin response to the request")
    proposal_document = models.FileField(upload_to="proposals/", blank=True, null=True)

    def __str__(self):
        return f"Proposal from {self.name} for {self.service_interest} - {self.status}"


class CaseStudy(models.Model):
    INDUSTRY_CHOICES = [
        ('tech', 'Technology'),
        ('finance', 'Finance'),
        ('healthcare', 'Healthcare'),
        ('education', 'Education'),
        ('ecommerce', 'E-commerce'),
    ]

    title = models.CharField(max_length=255)
    industry = models.CharField(max_length=50, choices=INDUSTRY_CHOICES)
    description = models.TextField()
    challenges = models.TextField()
    solutions = models.TextField()
    results = models.TextField()
    image = models.URLField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


# Country Choices
COUNTRY_CHOICES = [
    ('Global', 'Global'),
    ('Kenya', 'Kenya'),
    ('Somalia', 'Somalia'),
    ('Dubai', 'Dubai'),
    ('Ethiopia', 'Ethiopia'),
    ('Rwanda', 'Rwanda'),
    ('Tanzania', 'Tanzania'),
    ('Senegal', 'Senegal'),
    ('Ghana', 'Ghana'),
]

# Department Choices (Including new roles)
DEPARTMENT_CHOICES = [
    ('Executive', 'Executive'),
    ('Sales', 'Sales'),
    ('Human Resources', 'Human Resources'),
    ('Engineering', 'Engineering'),
    ('Marketing', 'Marketing'),
    ('Finance', 'Finance'),
    ('Operations', 'Operations'),
    ('Customer Support', 'Customer Support'),
    ('Software Development', 'Software Development'),
    ('Data Science', 'Data Science'),
    ('Blockchain', 'Blockchain'),
    ('Cybersecurity', 'Cybersecurity'),
    ('UI/UX Design', 'UI/UX Design'),
    ('DevOps', 'DevOps'),
    ('Graphic Design', 'Graphic Design'),
    ('SEO & Marketing', 'SEO & Marketing'),
]

# Role Choices (Including new roles)
ROLE_CHOICES = [
    ('Founder', 'Founder'),
    ('Co-Founder', 'Co-Founder'),
    ('CEO', 'CEO'),
    ('CTO', 'CTO'),
    ('CFO', 'CFO'),
    ('CMO', 'CMO'),
    ('HR Manager', 'HR Manager'),
    ('Sales Lead', 'Sales Lead'),
    ('Marketing Lead', 'Marketing Lead'),
    ('Software Engineer', 'Software Engineer'),
    ('Frontend Developer', 'Frontend Developer'),
    ('Backend Developer', 'Backend Developer'),
    ('Full Stack Developer', 'Full Stack Developer'),
    ('Data Scientist', 'Data Scientist'),
    ('Blockchain Developer', 'Blockchain Developer'),
    ('Cybersecurity Analyst', 'Cybersecurity Analyst'),
    ('DevOps Engineer', 'DevOps Engineer'),
    ('UI/UX Designer', 'UI/UX Designer'),
    ('Customer Support Representative', 'Customer Support Representative'),
    ('Graphic Designer', 'Graphic Designer'),
    ('SEO Expert', 'SEO Expert'),
    ('Social Media Marketer', 'Social Media Marketer'),
]


class TeamMember(models.Model):
    name = models.CharField(max_length=255)
    role = models.CharField(max_length=50, choices=ROLE_CHOICES)
    country = models.CharField(max_length=50, choices=COUNTRY_CHOICES, default='Kenya')
    department = models.CharField(max_length=50, choices=DEPARTMENT_CHOICES, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    image = models.URLField()
    linkedin = models.URLField(blank=True, null=True)
    twitter = models.URLField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name



class CompanyInfo(models.Model):
    LOCATION_CHOICES = [
        ("Nairobi, Kenya", "Nairobi, Kenya"),
        ("Mogadishu, Somalia", "Mogadishu, Somalia"),
        ("Dubai, UAE", "Dubai, UAE"),
        ("Dodoma, Tanzania", "Dodoma, Tanzania"),
        ("Accra, Ghana", "Accra, Ghana"),
        ("Ethiopia, Addis Ababa", "Ethiopia, Addis Ababa"),  # Fixed typo
        ("Dakar, Senegal", "Dakar, Senegal"),
        ("Kigali, Rwanda", "Kigali, Rwanda"),
    ]

    CITY_CHOICES = [
        ("Nairobi", "Nairobi"),
        ("Mogadishu", "Mogadishu"),
        ("Dubai", "Dubai"),
        ("Dodoma", "Dodoma"),
        ("Accra", "Accra"),
        ("Addis Ababa", "Addis Ababa"),
        ("Dakar", "Dakar"),
        ("Kigali", "Kigali"),
    ]

    city = models.CharField(max_length=100, choices=CITY_CHOICES, default="Nairobi")
    address = models.TextField(max_length=50, null=True)
    phone_number = models.CharField(max_length=20)
    email = models.EmailField()
    office_location = models.CharField(max_length=255, choices=LOCATION_CHOICES, default="Nairobi, Kenya")
    google_map_link = models.URLField(blank=True, null=True)

    def __str__(self):
        return self.office_location


class Partner(models.Model):
    name = models.CharField(max_length=100)
    logo = models.URLField()  

    def __str__(self):
        return self.name


