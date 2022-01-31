import mongoose from 'mongoose';


const Connection = async (username,password) =>{
    const URL =  `mongodb://${username}:${password}@chatapp-shard-00-00.x7wwa.mongodb.net:27017,chatapp-shard-00-01.x7wwa.mongodb.net:27017,chatapp-shard-00-02.x7wwa.mongodb.net:27017/WHATSAPPCLONE?ssl=true&replicaSet=atlas-nrzl46-shard-0&authSource=admin&retryWrites=true&w=majority`;
    try{
       await mongoose.connect(URL, { useUnifiedTopology : true , useNewUrlParser : true });
       console.log('Database Connected Successfully');
    } catch(error){
        console.log('Error While Connecting To MongoDB' , error); 
    }
}

export default Connection;