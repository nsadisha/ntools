import {Tool, ToolType} from "../model/tool.model";
import {PlainTextEditorComponent} from "../tools/plain-text-editor/plain-text-editor.component";
import {MarkdownTextEditorComponent} from "../tools/markdown-text-editor/markdown-text-editor.component";
import {CategoryType} from "../model/category.model";
import {ToolNotFoundComponent} from "../tools/tool-not-found/tool-not-found.component";

export const notFoundTool: Tool = {
  id: 0,
  name: 'Tool Not Found',
  description: 'The tool you are looking for is not found.',
  toolCode: ToolType.PLAIN_TEXT_EDITOR,
  category: CategoryType.TEXT_EDITOR,
  component: ToolNotFoundComponent
};

export const tools: Tool[] = [
  {
    id: 1,
    name: 'Plain Text Editor',
    description: 'A simple text editor for writing notes.',
    toolCode: ToolType.PLAIN_TEXT_EDITOR,
    category: CategoryType.TEXT_EDITOR,
    component: PlainTextEditorComponent
  },
  {
    id: 2,
    name: 'Markdown Text Editor',
    description: 'A text editor for writing notes in markdown.',
    toolCode: ToolType.MARKDOWN_TEXT_EDITOR,
    category: CategoryType.TEXT_EDITOR,
    component: MarkdownTextEditorComponent
  }
];
