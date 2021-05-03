import mongoose from 'mongoose'

export default class DatabaseConfig {
    private connectionString: string;

    constructor(user: string, password: string, base: string) {
        this.connectionString = `mongodb+srv://${user}:${password}@rollmaster.zjvwh.mongodb.net/${base}?retryWrites=true&w=majority`
    }

    connect() {
        return mongoose.connect(
            this.connectionString, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false
            }
        )
    }
}