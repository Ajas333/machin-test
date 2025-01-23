import os
from celery import Celery
from django.conf import settings


# Set the default Django settings module
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

# Initialize Celery with the name 'backend'
app = Celery('backend')

# Configure Celery from Django settings
app.config_from_object('django.conf:settings', namespace='CELERY')

# Automatically discover tasks from installed apps
app.autodiscover_tasks(lambda: settings.INSTALLED_APPS)

# Debug task for demonstration purposes
@app.task(bind=True)
def debug_task(self):
    print(f'Request: {self.requestr}')

