import {Injectable, Type} from '@angular/core';
import {Tool} from "../../model/tool.model";
import {tools} from "../../config/tools.config";
import {ToolNotFoundComponent} from "../../tools/tool-not-found/tool-not-found.component";

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

  getComponentFromToolCode(code: string): Type<any> {
    return this.tools
      .find(tool => tool.toolCode === code)?.component || ToolNotFoundComponent;
  }
}
