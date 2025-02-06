import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlainTextEditorComponent } from './plain-text-editor.component';

describe('PlainTextEditorComponent', () => {
  let component: PlainTextEditorComponent;
  let fixture: ComponentFixture<PlainTextEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlainTextEditorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlainTextEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
