import app from './index.js'
import {connectToMongoDB} from './src/config/mongodb.js'

app.listen(2300,() =>{
    console.log('Server is running on port 2300')
    connectToMongoDB();
})