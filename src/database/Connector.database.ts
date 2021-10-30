import  mongoose  from "mongoose";

class Connector {
    private static databaseUri = process.env.DB_URI;
    static connect() {
        mongoose.connect(this.databaseUri);
        return mongoose.connection;
    }
    static disconect() {
        mongoose.disconnect();
    }

}

export {
    Connector
}