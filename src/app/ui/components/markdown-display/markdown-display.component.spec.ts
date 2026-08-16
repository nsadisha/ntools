import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MarkdownDisplayComponent } from './markdown-display.component';
import { overrideAsShallow } from '../../../testing/shallow';

describe('MarkdownDisplayComponent', () => {
  let fixture: ComponentFixture<MarkdownDisplayComponent>;

  beforeEach(() => {
    overrideAsShallow(MarkdownDisplayComponent);
    TestBed.configureTestingModule({ imports: [MarkdownDisplayComponent] });
    fixture = TestBed.createComponent(MarkdownDisplayComponent);
  });

  it('should default content to an empty string and renderMermaidManually to false', () => {
    fixture.detectChanges();

    expect(fixture.componentInstance.content).toBe('');
    expect(fixture.componentInstance.renderMermaidManually).toBe(false);
  });

  it('should reflect bound input values', () => {
    fixture.componentInstance.content = '# Title';
    fixture.componentInstance.renderMermaidManually = true;

    fixture.detectChanges();

    expect(fixture.componentInstance.content).toBe('# Title');
    expect(fixture.componentInstance.renderMermaidManually).toBe(true);
  });
});
