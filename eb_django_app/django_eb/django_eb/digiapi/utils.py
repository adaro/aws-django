__author__ = 'adaro'
import uuid

def generate_token():
    return uuid.uuid4().hex
