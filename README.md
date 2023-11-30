# BACKEND

1. logics
   Trending
   Popular
   Binge

   db_structure
   db props

collection
Document
props
sub collection
Document
props

video metadata
v_id:
title:
uid: username
description:
movie: link storage
trailor:
category:
synopsis:
year:
duration:
thumbnail:
totalViews:
weeklyViews:
dailyWatchTime:
isYKTVshow:
sub collections:
Ratings
uid
rating: 1-5

user
birthDate
dateJoined
email
password
ph

Genaral
list db properties
for user
for videos

db structuring

firebase methods for crud

#TODO
STAGE 1

1. add firebase methods to pull user data in login.js

2. edit the reducer action methods to include added props from db structure
   add props to setstate in login.js

STAGE 2
add the existing video metadata and storage under yktv account

3. add firebase methods to pull video metadata in:
   home.js
   shows.js
   videos.js (after component is complete)
   watch.js

4. create video.js component

5. go over hooks for state in home, shows, watch and videos
   add component for videos

STAGE 3

5. modify watch page component
   controls to add to:
   favorites
   liked
   playlist

6. new component uploading to firebase storage

7. profile
   controls to select:
   subscription
   controls to add:
   videos

go over hooks for state in profile

create template using mui library for all pages
user dashboarb - profile
home
registration
login
watch
allshows
