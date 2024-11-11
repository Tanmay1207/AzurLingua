import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccssComponent } from './succss.component';

describe('SuccssComponent', () => {
  let component: SuccssComponent;
  let fixture: ComponentFixture<SuccssComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuccssComponent]
    });
    fixture = TestBed.createComponent(SuccssComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
