# video_streaming/consumers.py

import json
from channels.generic.websocket import AsyncWebsocketConsumer

class VideoConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()

        client_ip = self.scope.get('client', ['unknown'])[
            0]
        await self.send(text_data=f"Client IP: {client_ip}")

    async def disconnect(self, close_code):
        print("WebSocket connection closed")

    async def receive(self, text_data):
        data = json.loads(text_data)
        await self.send(text_data=json.dumps(data))