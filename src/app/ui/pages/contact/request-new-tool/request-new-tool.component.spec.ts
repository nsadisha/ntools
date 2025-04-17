import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestNewToolComponent } from './request-new-tool.component';

describe('RequestNewToolComponent', () => {
  let component: RequestNewToolComponent;
  let fixture: ComponentFixture<RequestNewToolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestNewToolComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestNewToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
