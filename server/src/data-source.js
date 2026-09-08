import mongoose from 'mongoose';

class AppDataSource{
    static async connect(){
        await mongoose.connect('mongodb://127.0.0.1:27017/book-my-show').then(()=>console.log('Mongoose connection established!'))
    }

    static async disconnect(){
        mongoose.connect();
    }
}

export default AppDataSource;