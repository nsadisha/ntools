import {Type} from "@angular/core";
import {CategoryType} from "./category.model";

export interface Tool {
  id: number;
  name: string;
  description: string;
  toolCode: ToolType;
  category: CategoryType;
  component: Type<any>;
}

export enum ToolType {
  PLAIN_TEXT_EDITOR = 'plain-text-editor',
  MARKDOWN_TEXT_EDITOR = 'markdown-text-editor',
}
