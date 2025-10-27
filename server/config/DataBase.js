import mongoose from 'mongoose'

export const DataBase = async()=>{
    try {
        const connection=await mongoose.connect(process.env.DATABASE_URL)
        if(connection){
            console.log('Database connection successful')
        }else{
            console.log('Database connection failed')
        }
    } catch (error) {
        console.log('Database connection error',error)
    }
} 