import UserModel from "../features/user/user.model.js";

const basicAuthorizer = (req, res, next) => {

    // 1. Check if the authorization header is empty
    const authHeader = req.headers["authorization"];
    
    if (!authHeader) {
        // If no authorization header is present, respond with a 401 status code
        return res.status(401).send("No authorization details found");
    }

    // 2. Extract credentials from the authorization header
    // The 'authorization' header format is "Basic <base64-credentials>"
    // So, we remove the "Basic " prefix to get the actual base64-encoded credentials
    const base64Credentials = authHeader.replace('Basic', ''); // Remove 'Basic ' prefix
    console.log(base64Credentials); // Log the base64-encoded credentials for debugging
    
    // 3. Decode credentials
    // The Buffer.from method is used to create a buffer from the base64 string,
    // which is then decoded to a UTF-8 string
    const decodedCreds = Buffer.from(base64Credentials, 'base64').toString('utf8'); // Decode from base64 to utf-8
    console.log(decodedCreds); // Log the decoded credentials for debugging
    const creds = decodedCreds.split(':'); // Split the decoded string into email and password parts

    // 4. Find the user in the database by email and password
    const user = UserModel.getAll().find((u) => u.email == creds[0] && u.password == creds[1]);
    
    if (user) {
        // If user is found, proceed to the next middleware or route handler
        next();
    } else {
        // If user is not found, respond with a 401 status code
        return res.status(401).send("Incorrect Credentials");
    }
}

export default basicAuthorizer;
