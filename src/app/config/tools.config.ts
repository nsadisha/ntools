import {Tool, ToolType} from "../model/tool.model";
import {PlainTextEditorComponent} from "../ui/tools/plain-text-editor/plain-text-editor.component";
import {MarkdownTextEditorComponent} from "../ui/tools/markdown-text-editor/markdown-text-editor.component";
import {CategoryType} from "../model/category.model";
import {ToolNotFoundComponent} from "../ui/tools/tool-not-found/tool-not-found.component";
import {BmiCalculatorComponent} from "../ui/tools/bmi-calculator/bmi-calculator.component";
import {AgeCalculatorComponent} from "../ui/tools/age-calculator/age-calculator.component";
import {UnitConverterComponent} from "../ui/tools/unit-converter/unit-converter.component";

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
  },
  {
    id: 3,
    name: 'BMI Calculator',
    description: 'A calculator for calculating BMI.',
    toolCode: ToolType.BMI_CALCULATOR,
    category: CategoryType.HEALTH_AND_FITNESS_CALCULATOR,
    component: BmiCalculatorComponent
  },
  {
    id: 4,
    name: 'Age Calculator',
    description: 'A calculator for calculating your age.',
    toolCode: ToolType.AGE_CALCULATOR,
    category: CategoryType.DATE_TIME_CALCULATOR,
    component: AgeCalculatorComponent
  },
  {
    id: 5,
    name: 'Unit Converter',
    description: 'Converts between various units of measurements.',
    toolCode: ToolType.UNIT_CONVERTER,
    category: CategoryType.UNIT_CONVERTER,
    component: UnitConverterComponent
  },
];
