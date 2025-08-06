import { initMongoConnection } from "./db/models/initMongoConnection";
import { setupServer } from "./server";


setupServer();
initMongoConnection();