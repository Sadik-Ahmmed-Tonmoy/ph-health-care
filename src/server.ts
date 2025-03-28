import { Server } from "http"
import app from "./app"
import config from "./config"

const port = 3000


async function main() {
   const server : Server = app.listen(config.port, () => {
        console.log(`Server listening on port ${config.port}`)
   })
}

main()