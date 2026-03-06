import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkdownTextEditorComponent } from './markdown-text-editor.component';

describe('MarkdownTextEditorComponent', () => {
  let component: MarkdownTextEditorComponent;
  let fixture: ComponentFixture<MarkdownTextEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarkdownTextEditorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarkdownTextEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
