import { ToolService } from './tool.service';
import { ToolType } from '../../model/tool.model';
import { notFoundTool, tools } from '../../config/tools.config';

describe('ToolService', () => {
  let service: ToolService;

  beforeEach(() => {
    service = new ToolService();
  });

  it('should return all configured tools', () => {
    expect(service.getAllTools()).toEqual(tools);
  });

  it('should return tools matching the name case-insensitively', () => {
    expect(service.getAllToolsByName('bmi')).toEqual([
      tools.find(tool => tool.toolCode === ToolType.BMI_CALCULATOR)!,
    ]);
  });

  it('should return an empty array when no tool matches the name', () => {
    expect(service.getAllToolsByName('no-such-tool')).toEqual([]);
  });

  it('should return all tool names', () => {
    expect(service.getToolNames()).toEqual(tools.map(tool => tool.name));
  });

  it('should return the tool matching the given code', () => {
    expect(service.getToolFromCode(ToolType.BMI_CALCULATOR)).toEqual(
      tools.find(tool => tool.toolCode === ToolType.BMI_CALCULATOR)!
    );
  });

  it('should fall back to the not-found tool for an unknown code', () => {
    expect(service.getToolFromCode('unknown-code')).toEqual(notFoundTool);
  });
});
