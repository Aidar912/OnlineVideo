from django.shortcuts import render

def index(request):
    return render(request, 'index.html')

def video_stream(request):
    return render(request, 'video_stream.html')