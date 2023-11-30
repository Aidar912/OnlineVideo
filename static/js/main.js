// video_streaming_project/video_streaming/static/js/participant.js

const wsScheme = window.location.protocol === 'https:' ? 'wss://' : 'ws://';
const wsURL = wsScheme + window.location.host + '/ws/test/';

const socket = new WebSocket(wsURL);

   socket.onopen = function(event) {
        console.log('WebSocket connection opened');
          const message = event.data;
        console.log(message);

    };

  socket.onmessage = function(event) {
        const message = event.data;
        console.log(event.data);

    };
 socket.onclose = function(event) {
        console.log('WebSocket connection closed');
    };

 socket.onerror = function(error) {
        console.error('WebSocket error:', error);
    };
