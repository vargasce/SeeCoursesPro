#!/bin/bash 
cd /Users/cristiano/Dropbox/SeeCourses/
ng build --prod --base-href /Page/SeeCourses/
ssh cristian@192.168.0.187 'rm -r /var/www/html/Page/SeeCourses/'
scp -r /Users/cristiano/Dropbox/SeeCourses/dist/SeeCourses cristian@192.168.0.187:/var/www/html/Page/
echo "Success Deploy!"