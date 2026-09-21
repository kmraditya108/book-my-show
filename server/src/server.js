/**
 * Server.js is: [entry point + Database startup logic]
 * As soon we start the server, it(server.js) should bring up the whole express application.
 */

import Logger from "./core/Logger.js";
import app from "./app.js";
import AppDataSource from "./data-source.js";


const PORT = 8080;

// Calling IIFI, so once server started,
// it wil call by-default
(async () => {
    try {
        await AppDataSource.connect();
        app.listen(PORT, () => {
            Logger.info(`Server started at ${PORT}`);
        })
    } catch (error) {
        await AppDataSource.disconnect();
        Logger.error("error: ", error);
    }
})();