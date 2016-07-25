__author__ = 'adaro'
import uuid
import os
import mimetypes
from django.http import HttpResponse
from wsgiref.util import FileWrapper
from django.conf import settings

def generate_token():
    return uuid.uuid4().hex

def send_file(file):
    """
    Send a file through Django without loading the whole file into
    memory at once. The FileWrapper will turn the file object into an
    iterator for chunks of 8KB.
    """
    print file
    filename = file.name
    # if settings.PRIVATE_MEDIA_USE_XSENDFILE:
    #     # X-sendfile
    #     response = StreamingHttpResponse()
    #     response['X-Accel-Redirect'] = filename  # Nginx
    #     response['X-Sendfile'] = filename        # Apache 2, mod-xsendfile
    #     # Nginx doesn't overwrite headers, but does add the missing headers.
    #     del response['Content-Type']

    #else:

    # Can use django.views.static.serve() method (which supports if-modified-since),
    # but this also does the job well, as it's mainly for debugging.
    mimetype, encoding = mimetypes.guess_type(filename)
    response = HttpResponse(FileWrapper(file), content_type=mimetype)
    response['Content-Length'] = os.path.getsize(filename)
    return response
