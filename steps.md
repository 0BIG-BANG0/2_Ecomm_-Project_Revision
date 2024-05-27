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


