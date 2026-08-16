import { TestBed } from '@angular/core/testing';
import { ToolNotFoundComponent } from './tool-not-found.component';
import { overrideAsShallow } from '../../../testing/shallow';

describe('ToolNotFoundComponent', () => {
  beforeEach(() => {
    overrideAsShallow(ToolNotFoundComponent);
    TestBed.configureTestingModule({ imports: [ToolNotFoundComponent] });
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ToolNotFoundComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });
});
