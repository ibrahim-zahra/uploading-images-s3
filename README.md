INTRODUCTION
------------


This project uploades images of an s3 bucket and insert uploaded images into rds mysql DB


-------------------------
HOW THE SOLUTION WORKS?
-------------------------
The application exposes some rest API's , one to upload an image and another to get.
-When an image is uploaded, It's resized into 3 specified resoultuions (300*300,1024*1024,2048*2048) then they get uploaded to s3 bucket.
-Uploading 3 images is done in parallel for performance issue.
-After that the image path is inserted into MysqlDB assigned with user id .
-Before uploading an image, you sign in(Sign up first) and get JWT token to authenticated.
-There is an roles.js file if in the fuutre we want to support autherities.


-------------------------
DESIGN DECISIONS & ISSUES
-------------------------

Design decisions were revolving around the two mile stones : Memory & Performance 

Authintication : 
For this stage , roles are not needed, but the user should be authinticated by registering into the application.JWT was choosen as authintication approch as it
 URL-safe of representing claims to be transferred between two parties,the token expires every 15 min, and user id is encoded inside the token.
 

Performance :
To improve performance and have less execution time paralle uploading approach
was used, in this approach the code each image is processed seperatly,resized and uploaded.
As a result each image give one image path, and user will get pathes for 3 resoulutions
-Data consinstency:
In order to be able to get back to the image ,the image pathes are inserted into mysql DB , so user images can be fetched if the images are not public

-Serverless approch:
 -For image processing part serverless approch can be used. So when any image is uploaded to our application , lambda function will start execution and resize the image
 then insert it into the DB.This approch can be choosed when the user doesn't want the uploaded image path,or whole application is running on serverless.

-------------------------
HOW TO RUN THE PROJECT/CODE?
-------------------------
-Edit .env file with your credintials for AWS s3 and mysql DB
-You can download the code and run express server or just build and run docker file

---------------------------
