"""
Django settings for backend project.

Generated by 'django-admin startproject' using Django 4.1.5.

For more information on this file, see
https://docs.djangoproject.com/en/4.1/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/4.1/ref/settings/
"""

from pathlib import Path
from datetime import timedelta
import dj_database_url
from datetime import timedelta
from dotenv import load_dotenv 
import dj_database_url
import os


# Load environment variables from .env file
load_dotenv()

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
# Load secret key from environment variables
SECRET_KEY = 'django-insecure-4z2_tuc9@x##7xdb_p19hlncr$*%iy3*l(t5&hv6p2$(w3i&6a'


# SECURITY WARNING: don't run with debug turned on in production!
# Debug mode
DEBUG = os.getenv("DEBUG") == "False"

# Allowed hosts
# ALLOWED_HOSTS = os.getenv("ALLOWED_HOSTS", "").split(",")

#ALLOWED_HOSTS = os.getenv("ALLOWED_HOSTS", "go-digital-africa-production.up.railway.app,localhost,127.0.0.1").split(",")

import logging

logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)


ALLOWED_HOSTS = [
    'server-628309.hostingwithgda.com', 
    '127.0.0.1', 
    'localhost', 
    'hostingwithgda.com'
]



# If using wildcard (not recommended for production)
CORS_ALLOW_ALL_ORIGINS = False  # For testing only

# Allow credentials (if using authentication)
CORS_ALLOW_CREDENTIALS = True


# Allow requests from your React frontend (Update this with your frontend URL)
CSRF_TRUSTED_ORIGINS = [
    "https://go-digital-africa-production.up.railway.app",
    "http://hostingwithgda.com",
    "https://hostingwithgda.com",
]



# Allow all HTTP methods (GET, POST, PUT, DELETE)
CORS_ALLOW_METHODS = ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"]

# Allow specific headers
CORS_ALLOW_HEADERS = ["*"]


SESSION_COOKIE_SECURE = True  # Enable in production
CSRF_COOKIE_SECURE = True  # Enable in production
CSRF_COOKIE_HTTPONLY = True
CSRF_COOKIE_SAMESITE = 'None'  # Adjust based on your frontend setup


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'rest_framework_simplejwt',
    'rest_framework_simplejwt.token_blacklist',
    'corsheaders',
    'drf_yasg',
    'django_filters',
    'core',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
]

ROOT_URLCONF = 'backend.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'backend.wsgi.application'


# Database
# https://docs.djangoproject.com/en/4.1/ref/settings/#databases

# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.mysql',
#         'NAME': 'hostwithus_django_project',
#         'USER': 'hostwithus_website',
#         'PASSWORD': 'GDAKenyaDevelopers',
#         'HOST': 'localhost',  # Or use your actual hosting IP if needed
#         'PORT': '3306',
#     }
# }


DATABASES = {
    "default": dj_database_url.parse(
        "postgresql://postgres:IGuIbWrFvPlfzzsScWqbepPsyAKQPwWQ@shortline.proxy.rlwy.net:38672/railway", conn_max_age=600, ssl_require=True
    )
}


# Password validation
# https://docs.djangoproject.com/en/4.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/4.1/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.1/howto/static-files/

STATIC_URL = 'static/'

STATICFILES_STORAGE = "whitenoise.storage.CompressedManifestStaticFilesStorage"


# Ensure STATIC_ROOT is set correctly
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

# Define additional static file locations (if needed)
STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'static'),  # This is for development
]


# Default primary key field type
# https://docs.djangoproject.com/en/4.1/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

AUTH_USER_MODEL = "core.CustomUser"  # Custom user model


REST_FRAMEWORK = {
    'DEFAULT_FILTER_BACKENDS': ['django_filters.rest_framework.DjangoFilterBackend'],
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
    'DEFAULT_THROTTLE_CLASSES': [
        'rest_framework.throttling.AnonRateThrottle',  # Limit unauthenticated requests
        'rest_framework.throttling.UserRateThrottle',  # Limit authenticated requests
    ],
    'DEFAULT_THROTTLE_RATES': {
        'anon': '5/minute',  # Allow max 5 requests per minute for anonymous users
        'user': '10/minute',  # Allow max 10 requests per minute for authenticated users
    }
}


SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(minutes=50), # Access token expires in 30 minutes
    "REFRESH_TOKEN_LIFETIME": timedelta(days=7), # Refresh token expires in 7 days
    "ROTATE_REFRESH_TOKENS": True, # Issue a new refresh token on use
    "BLACKLIST_AFTER_ROTATION": True, # Old refresh tokens become invalid
    "AUTH_TOKEN_CLASSES": ("rest_framework_simplejwt.tokens.AccessToken",),
    "TOKEN_BLACKLIST": True,  # Ensure this is enabled
}


# Logging configuration
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'file': {
            'level': 'INFO',
            'class': 'logging.FileHandler',
            'filename': 'newsletter.log',
        },
    },
    'loggers': {
        '': {  # Root logger
            'handlers': ['file'],
            'level': 'INFO',
            'propagate': True,
        },
    },
}

# Email Settings (Using Gmail as an Example)
EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"
EMAIL_HOST = "smtp.gmail.com"
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = "kipropismael27@gmail.com"
EMAIL_HOST_PASSWORD = "vvmwtssiaafwolhh"  # Use App Password for security
DEFAULT_FROM_EMAIL = EMAIL_HOST_USER


# settings.py
FORCE_SCRIPT_NAME = '/django'
STATIC_URL = '/django/static/'

# Frontend URL
FRONTEND_URL = "https://godigital-africa.web.app"

  

MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
