import { envs } from "./config";
import { connectionDB } from "./data";
import { AppRoutes } from "./routes";
import { Server } from "./server";


(async() => {
    await connectionDB();

    const server = new Server({
        port: envs.PORT,
        publicPath: envs.PUBLIC_PATH,
        routes: AppRoutes.routes,
    });

    server.start();
})();

