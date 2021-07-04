#!/bin/bash  
#exit from script on encountering any error
set -e
#find coverage

# update coverage in Readme
node updateReadMe.js
#commit  coverage in git 
git config --global user.email nitesh16.singh@gmail.com
git config --global user.name nitesh16singh
git add ./README.md 
git commit -m "[skip ci] code coverage added" --no-verify || true
git pull  $CI_REPOSITORY_URL HEAD:$GITHUB_REF || true
git push  $CI_REPOSITORY_URL HEAD:$GITHUB_REF || true
