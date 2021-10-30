import { app } from "./app"
import { Connector } from "./database/Connector.database"



(async () =>{
    Connector
        .connect()
        .on(
            "connected",
            () => {
                app.listen(process.env.PORT, () => console.log("🚀 Into the space..."))
            }

        )
        .on(
            "error",
            (error: any) => {
                console.error(error)
            }
        )
})()