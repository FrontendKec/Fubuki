import mongoose from 'mongoose'
import {} from 'dotenv/config'

const databaseConnect = async () => {
    try {
        const connect = await mongoose.connect(process.env.DATABASE_URL);
        console.log(`✔️ Connected to MongoDB!`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

export default databaseConnect