# OnlineVideo/asgi.py

import os
from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from django.urls import path
from core.consumers import VideoConsumer

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'OnlineVideo.settings')

application = ProtocolTypeRouter({
    'http': get_asgi_application(),
    'websocket': URLRouter([
        path('ws/test/', VideoConsumer.as_asgi()),
    ]),
})
