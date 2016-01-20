How to run manage.py from AWS Elastic Beanstalk AMI.

SSH login to Linux
Run source /opt/python/run/venv/bin/activate
Run source /opt/python/current/env
Run cd /opt/python/current/app
Run manage.py <commands>
Or, you can run command as like the below:

Run cd /opt/python/current/app
Run /opt/python/run/venv/bin/python manage.py <command>





# postgres setup https://github.com/snowplow/snowplow/wiki/Setting-up-PostgreSQL#ec2
sudo yum install postgresql postgresql-server postgresql-devel postgresql-contrib postgresql-docs
sudo service postgresql initdb
sudo service postgresql start
