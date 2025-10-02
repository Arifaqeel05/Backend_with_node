import ConnectDBfunction from './db/index.js';
import dotenv from 'dotenv';
import {app} from './app.js'


dotenv.config(
    {
        path:"./env"
    }
)

// Call the ConnectDB function (which connects to MongoDB)

ConnectDBfunction()
// If the database connection is successful, start the Express server
.then(()=>{
    
    app.listen(process.env.PORT || 3000,()=>{
        console.log(`✅ Server is running on the port :${process.env.PORT}`)
    })

     // Handle server-level errors ike port already in use
    app.on("Error", (error)=>{
        console.log("❌ Server Level ERROR MESSAGE IS",error);
        throw error; 

    })

})
.catch((error)=>{
    // If database connection fails, this block runs
    console.error(" ❌ Connection failed !!!!!", error);
    process.exit(1);
})