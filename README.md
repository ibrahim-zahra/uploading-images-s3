# Picasso Back-End New Platform



This project receives an image through HTTP protocol,
the image is converted into the specified resolutions and then uploaded to AWS S3 bucket.
and In response returns an image url.

Specified resolutions are: (large - 2048x2048, medium - 1024x1024, thumb - 300x300).
-------------------------
## TECHNOLOGIES
-------------------------
- [node.js] - evented I/O for the backend
- [Express] - fast node.js network app framework 
- [Multer](https://www.npmjs.com/package/multer) - for Uploading Images
- [AWS SDK ](https://aws.amazon.com/sdk-for-javascript/)  - for AWS S3 Bucket 
- [Json Web token(JWT)](https://jwt.io/) - for authentication

-------------------------
## PROJECT SPECIFICATIONS
-------------------------
- The application exposes Two differnt kinds of rest APIs , one to upload an image and the other is to get the image .
- When an image is uploaded, It's resized into three specified resoultuions (large - 2048x2048, medium - 1024x1024, thumb - 300x300) then they get uploaded to S3 bucket.
- Parallel uploading for the images 
- The image path is inserted into MysqlDB assigned with user id.
-  authentication is made via JWT Tokens (You need to sign in/Sign up first and get the token which expired every 15 mins )
-  roles.js file is provided for future use (in case autherities support was needed).

-------------------------
## DESIGN DECISIONS & ISSUES
-------------------------
### Architecture : 
#### _(Layered Architecture Pattern)_.
For Architecture  (_Layered Architecture Pattern_ ) was used where each layer has a specific
role and responsibility within the application.
This back-end platform Consist of three Layers : 
- Entry point (Route Layer)
- logic Layer(controller)
- Data Access Layer (Database Layer)

### Authintication : 
#### _(JSON Web Token (JWT))_.
For this stage , roles are not needed, but the user should be authinticated by registering into the application.
JWT was choosen as authintication approch as it is _URL-safe_ of representing claims to be transferred between two parties.
The token expires every 15 min, and user id is _encoded_ inside the token.
 

### Performance :
To improve performance and have less execution time parallel uploading approach
was used. In this approach in the code each image is processed seperatly,resized and uploaded.
As a result each image give one image path, and user will get pathes for three resoulutions

### Data Consinstency:
In order to be able to get back to the image ,the image pathes are inserted into mysql DB , so user images can be fetched if the images are not public

### [Alternative approach/Additional]Serverless Approch:
*Please note this is not part of the solution*
For image processing part ; serverless approch can be used. 
So when any image is uploaded to application , lambda function starts execution 
and resizes the image,then inserts it into the DB.
This approch is normally used in cases where :The user doesn't want the uploaded image path,or when the whole application is running on serverless.

-------------------------
## HOW TO RUN THE PROJECT/CODE?
-------------------------
- Edit  [.env](https://github.com/ibrahim-zahra/uploading-images-s3/blob/master/.env)   file with Your credintials for AWS S3 and mysql DB.
- You can download the code and run express server or just build and run [docker file](https://github.com/ibrahim-zahra/uploading-images-s3/blob/master/Dockerfile)

    ```  
    npm start       // for running express server
    docker build    //to build and run docker file 
    ```



