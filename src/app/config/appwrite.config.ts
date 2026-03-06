import {Client, Databases} from "appwrite";
import {environment} from "../../environments/environment";

// Appwrite
export const APPWRITE_DB_ID = environment.APPWRITE_DB_ID;

// Collections
export const MESSAGES_COLLECTION_ID = environment.MESSAGES_COLLECTION_ID;
export const BUGS_COLLECTION_ID = environment.BUGS_COLLECTION_ID;
export const NEW_TOOL_REQUESTS_COLLECTION_ID = environment.NEW_TOOL_REQUESTS_COLLECTION_ID;

const client = new Client()
  .setEndpoint(environment.APPWRITE_API_ENDPOINT)
  .setProject(environment.APPWRITE_PROJECT_ID);

export const appWriteDatabase = new Databases(client);
