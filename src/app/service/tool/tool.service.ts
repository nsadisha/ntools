import {Injectable} from '@angular/core';
import {Tool} from "../../model/tool.model";
import {notFoundTool, tools} from "../../config/tools.config";

@Injectable({
  providedIn: 'root'
})
export class ToolService {

  private tools: Tool[] = tools;

  constructor() { }

  getAllTools(): Tool[] {
    return this.tools;
  }

  getAllToolsByName(name: string): Tool[] {
    return this.tools
      .filter(tool => tool.name.toLowerCase().indexOf(name.toLowerCase()) !== -1);
  }

  getToolNames(): string[] {
    return this.tools.map(tool => tool.name);
  }

  getToolFromCode(code: string): Tool {
    return this.tools.find(tool => tool.toolCode === code) || notFoundTool;
  }
}
