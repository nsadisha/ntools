import { ContactUsApiService } from './contact-us-api.service';
import {
  APPWRITE_DB_ID,
  appWriteDatabase,
  BUGS_COLLECTION_ID,
  MESSAGES_COLLECTION_ID,
  NEW_TOOL_REQUESTS_COLLECTION_ID,
} from '../../config/appwrite.config';

describe('ContactUsApiService', () => {
  let service: ContactUsApiService;

  beforeEach(() => {
    service = new ContactUsApiService();
    spyOn(appWriteDatabase, 'createDocument').and.resolveTo({ $id: 'doc-id' } as any);
  });

  it('should create a message document', async () => {
    const request = { name: 'Jane', email: 'jane@example.com', message: 'Hello' };

    await service.sendMessage(request);

    expect(appWriteDatabase.createDocument).toHaveBeenCalledWith(
      APPWRITE_DB_ID,
      MESSAGES_COLLECTION_ID,
      jasmine.any(String),
      request
    );
  });

  it('should create a new-tool-request document', async () => {
    const request = {
      name: 'Jane',
      email: 'jane@example.com',
      tool_name: 'CSV Formatter',
      tool_description: 'Formats CSV files',
    };

    await service.requestNewTool(request);

    expect(appWriteDatabase.createDocument).toHaveBeenCalledWith(
      APPWRITE_DB_ID,
      NEW_TOOL_REQUESTS_COLLECTION_ID,
      jasmine.any(String),
      request
    );
  });

  it('should create a bug-report document', async () => {
    const request = {
      name: 'Jane',
      email: 'jane@example.com',
      bug_name: 'Crash on save',
      bug_url: '/tool/plain-text-editor',
      bug_description: 'Saving crashes the app',
    };

    await service.reportBug(request);

    expect(appWriteDatabase.createDocument).toHaveBeenCalledWith(
      APPWRITE_DB_ID,
      BUGS_COLLECTION_ID,
      jasmine.any(String),
      request
    );
  });
});
