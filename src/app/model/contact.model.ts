
export type ContactUsModel = {
  name: string;
  email: string;
  message: string;
};

export type NewToolRequestModel = {
  name: string;
  email: string;
  tool_name: string;
  tool_description: string;
};

export type BugReportModel = {
  name: string;
  email: string;
  bug_name: string;
  bug_url: string;
  bug_description: string;
};
