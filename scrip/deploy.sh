#!/bin/bash 
cd /Users/cristiano/Dropbox/SeeCourses/
git add .
git push origin cristian
ng build
firebase deploy
echo "Success Deploy in Firebase!! \n"
echo "URL: https://seecourses-31e3b.firebaseapp.com/"