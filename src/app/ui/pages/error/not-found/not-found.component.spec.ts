import { TestBed } from '@angular/core/testing';
import { NotFoundComponent } from './not-found.component';
import { overrideAsShallow } from '../../../../testing/shallow';

describe('NotFoundComponent', () => {
  beforeEach(() => {
    overrideAsShallow(NotFoundComponent);
    TestBed.configureTestingModule({ imports: [NotFoundComponent] });
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(NotFoundComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });
});
