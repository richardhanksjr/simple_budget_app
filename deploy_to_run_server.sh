#!/bin/bash
echo "Downloading latest from master"
git pull origin master
echo "Running python manage.py migrate"
pipenv run python manage.py migrate
echo "Killing currently running background process"
ps aux | grep manage.py
REVISION=$(ps aux | grep manage.py | awk  '{print $2}')
kill $REVISION | cut -d" " -f1
echo "Restarting runserver in background on port 5000."
nohup pipenv run python manage.py runserver 0.0.0.0:5000 > nohup.out &
return 0
