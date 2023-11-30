// video_streaming_project/video_streaming/static/js/organizer.js

const organizerVideo = document.getElementById('organizerVideo');
const wsScheme = window.location.protocol === 'https:' ? 'wss://' : 'ws://';
const wsURL = wsScheme + window.location.host + '/ws/my_stream_room/?organizer=true';

const socket = new WebSocket(wsURL);

socket.onopen = (event) => {
    console.log('WebSocket connected as organizer');
};

socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    console.log('Received message:', data);

    // Обработка входящих сообщений от участников (если необходимо)
};

navigator.mediaDevices.getDisplayMedia({ video: true }) // Запрос на захват экрана
    .then((stream) => {
        organizerVideo.srcObject = stream;

        const configuration = {
            iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
        };

        const peerConnection = new RTCPeerConnection(configuration);

        stream.getTracks().forEach(track => {
            peerConnection.addTrack(track, stream);
        });

        peerConnection.onicecandidate = (event) => {
            if (event.candidate) {
                socket.send(JSON.stringify({
                    type: 'candidate',
                    candidate: event.candidate
                }));
            }
        };

        peerConnection.createOffer()
            .then((offer) => {
                peerConnection.setLocalDescription(offer);
                socket.send(JSON.stringify({
                    type: 'offer',
                    offer: offer
                }));
            })
            .catch((error) => {
                console.error('Error creating offer:', error);
            });

        socket.onmessage = async (event) => {
            const data = JSON.parse(event.data);
            if (data.type === 'answer') {
                await peerConnection.setRemoteDescription(new RTCSessionDescription(data.answer));
            } else if (data.type === 'candidate') {
                await peerConnection.addIceCandidate(new RTCIceCandidate(data.candidate));
            }
        };
    })
    .catch((error) => {
        console.error(error);
    });
