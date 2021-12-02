#!/bin/bash 
cd /Users/cristiano/Dropbox/SeeCourses/
ng build --prod --base-href /Page/SeeCourses/
ssh cristian@192.168.0.187 'rm -r /var/www/html/Page/SeeCourses/'
scp -r /Users/cristiano/Dropbox/SeeCourses/dist/SeeCourses cristian@192.168.0.187:/var/www/html/Page/
ssh cristian@192.168.0.187 'rm -r /var/www/api/'
scp -r /Users/cristiano/Dropbox/SeeCourses/api cristian@192.168.0.187:/var/www/
echo "Success Deploy!"