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