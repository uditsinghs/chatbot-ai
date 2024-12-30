import { app } from "./app.js";
import dotenv from 'dotenv';
import { connect } from "./db/db.js";
dotenv.config();

const port  = process.env.PORT;


connect()
app.listen(port,()=>{
  console.log(`server is listen on port ${port}`);
  
})