How to run manage.py from AWS Elastic Beanstalk AMI.

SSH login to Linux
Run source /opt/python/run/venv/bin/activate
Run source /opt/python/current/env
Run cd /opt/python/current/app
Run manage.py <commands>
Or, you can run command as like the below:

Run cd /opt/python/current/app
Run /opt/python/run/venv/bin/python manage.py <command>