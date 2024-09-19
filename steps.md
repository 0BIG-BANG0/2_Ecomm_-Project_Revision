1. npm init - Initialize the Project
2. npm i express - install the express dependency 
3. Create an express server
4. install nodemon -> npm i nodemon
5. in package.js create type and it should be module.
6. Folder Structure 
    src
        features
            cart - Contains folder such as model, routes and controller  
            order - Contains folder such as model, routes and controller 
            product - Contains folder such as model, routes and controller 
            user - Contains folder such as model, routes and controller 
        middleware

7. Create a model class and controller class 
8. getAllProducts API is called which in turn calls the get method from model class .
9. Before using any post req we have to install body-parser
    npm i body-parser
    we have to parse in json format

10. install multer - npm i multer
    create a file in middleware - fileupload.middleware.js
    configure the destination and the filename 

    - in defining filename in fileUpload Middleware you should use .replace(/:/g, '_') as in windows colon is not allowed.

11. ProductController - addProduct() - extract the details apart from imageUrl as it is a file and then imageUrl: req.file.filename  
12. Model - add() - give id to the product and push the product to the products array 

13. GetOneProduct - 
        it should have an id of the product which is going to be fetched
        routes - /:id 
        controller - id = req.params.id
        model - we use find function to fetch that particular product

14. filterProduct - 
        in filter product we have to filter the product on basis of some parameters.
        But here we use req.query rather than req.body as we only need to retrieve the data  based on the condition given in model class, while in req.body we can modify the data.
        route - /filter
        controller - req.query 
        model - uses filter function to filter the data it ask a cb function

15. User 
        SignUp - 
                route - It is a post req 
                controller - it extracts the data and send to model
                model - it add the data to the users array
        SignIn - 
                route - It is a post req 
                controller - it extracts the data and send to model
                model - it checks the data usinf find function and return if found else in controller we have to handle condition know wheter the data given war correct.

16. BasicAuth - 
                1. Check if the authorization header is empty
                2. Extract credentials from the authorization header
                3. Decode credentials
                4. Create a getAll method in usermodel and use it in basicAuthmiddleware to find the user in the database.
17. JWT -
                1. npm i jsonwebtoken
                2. import jwt 
                3. Inside User Controller Logincreate the token using jwt.sign() in payload dont give password
                :: You can store it in cookies also
                4. return the token

                5. Create a middleware Function and in which 
                        1.you can req it from headders or cookies where you have stored 
                        2. use jwt.verify(token, secretkey)

18. RateProduct - 
                1. product model -
                        1.Validate user and product
                        2. Check if there are any ratings and if not then add ratings array
                        3. Check if user rating is already available
                        4. If no existing rating then add new rating.
                2. product controller -
                        1.use query parameter 
                        2.return error if not rating added

19. Cart -  Try to retrieve UserId from token from plyload it will make it more secure

20. Delete Cart Item- 

21. Swagger -   npm i swagger-ui-express
                app.use("/api-docs", swagger.serve, swagger.setup(apiDocs));
                try to implement swagger 3.0

22. Handle 404 - 1. When a user sends a request to a non-existent API, the default response
                        provided by the server and client (browser) may not be informative or helpful.
                2. To address this issue, we need to send a separate message that indicates the
                requested resource does not exist or is not found.
                ● We can configure a middleware at the end of all our routes to handle 404
                requests.
                ● This middleware will handle requests that do not match any existing paths in
                our application.


23. CORS -      1. configure it manually
                2. configure it using Library
                        1. npm i cors
                        var corsOptions = {
                        origin: 'http://127.0.0.1:5500',
                        }
                        app.use(cors(corsOptions))            


24. Handling Errors
 1. Creating Logger Middleware -  we have use writefile function but it ovverfile the current file so our log file should not be ovverridden so we use appendFile function

 2. Us the logger middleware at Application level in index.js file    

 3. Using Winston Logger - It is a npm librabry which helps to log in effictive way
        npm i winston

4. Handling error using try catch on those part of code where we know it is going to give error while fetching from database when a wrong input is given.
Error you go inside of this function it has meassge property to get the error message on console . These are user defined error
The catch block receives an error object that contains information about the error, including the error message, name of the error, and a stack trace.

5. There is a better way You can Hnadle these errors at Application level
By applying this error handler middlerware we are not sending the internal details we are just sending the meassag
6. Created a cutom error Handler and  use this class in error handler middleware if(err instanceof ApplicationError){
    res.status(err.code).send(err.message)
  }

25. MongoDB
        - npm i mongodb
        - read documentation
        -we create a config folder in src and created a file mongodb.js
        - import MongoClient and store the connection-string to the url
        - creted a connectToMongodb function then inside the callback gave the connection string and connec t return a promise so it is handled by try and catch.\
        - as soon as the server is starting we are calling the function connectToMongoDb()
        
        README MAIN 3 - COnnecting MONGODB CLient

26. SignUP
        - we have to break it into steps
        -1. get the database 
        -2. get the collection
        -3. do the operations extract the user info from the controlerr
        -4.  add the user info into database using insertOne() function of mongoDB for that use 
                -- npm mongodb > github home > scoll to documentation > then insert operation
        -5. insertOne function return us promise so we have to use async await 
        -6. user route - userRouter.post("/signup", (req, res) => {
                                userController.signUp(req, res);
                        });
                        In this version, instead of directly passing userController.signUp, you're wrapping it in an anonymous arrow function, which takes req and res as parameters and then calls userController.signUp(req, res).

                        Why is this Change Important?
                        By wrapping the userController.signUp method in an arrow function, you're ensuring that the context of this remains within the userController instance. This approach eliminates the issue where this in the signUp method would refer to the wrong context (the router's context).

                Q-What is the responsibility of the repository module in a Node.js application?
                A-To abstract the data access code and centralize it.
                SOL-The repository module in a Node.js application is primarily designed to serve as an abstraction layer over the data access code. This means that instead of having database-related code scattered throughout the application, it is centralized within the repository.

27.     Using Hash Password -   How to Store Passwords in database?
                                It is important as one should know how to store data in database
                                1. npm i bcrypt
                                2. hash method returns a promise and it takes 2 inputs the data that need to be hashed and the salt(it is basically )
                                3.bcrypt is a popular password hashing library used to securely store passwords in applications. It incorporates a salt to protect against rainbow table attacks and performs multiple hashing rounds to increase the computational cost of brute-force attacks.
                                4.Salt rounds: A higher number of rounds means more computational effort, making it harder for attackers to crack.
                                Asynchronous functions: The hashing and comparison methods are asynchronous, meaning they don't block the event loop.
                                Secure hashing: bcrypt is designed specifically for password hashing and is widely trusted for its security.
                                3. //Best Practice is to exclude the password before sending to the client
                                // Setting password to undefined before sending it