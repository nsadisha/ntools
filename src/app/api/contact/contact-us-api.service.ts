import { Injectable } from '@angular/core';
import {BugReportModel, ContactUsModel, NewToolRequestModel} from "../../model/contact.model";
import {
  APPWRITE_DB_ID,
  appWriteDatabase, BUGS_COLLECTION_ID,
  MESSAGES_COLLECTION_ID,
  NEW_TOOL_REQUESTS_COLLECTION_ID
} from "../../config/appwrite.config";
import {ID} from "appwrite";


@Injectable({
  providedIn: 'root'
})
export class ContactUsApiService {

  async sendMessage(request: ContactUsModel) {
    return appWriteDatabase.createDocument(APPWRITE_DB_ID, MESSAGES_COLLECTION_ID, ID.unique(), request);
  }

  async requestNewTool(request: NewToolRequestModel) {
    return appWriteDatabase.createDocument(APPWRITE_DB_ID, NEW_TOOL_REQUESTS_COLLECTION_ID, ID.unique(), request);
  }

  async reportBug(request: BugReportModel) {
    return appWriteDatabase.createDocument(APPWRITE_DB_ID, BUGS_COLLECTION_ID, ID.unique(), request);
  }
}
