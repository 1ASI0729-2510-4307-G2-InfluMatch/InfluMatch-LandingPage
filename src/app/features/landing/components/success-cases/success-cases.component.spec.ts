import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessCasesComponent } from './success-cases.component';

describe('SuccessCasesComponent', () => {
  let component: SuccessCasesComponent;
  let fixture: ComponentFixture<SuccessCasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuccessCasesComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SuccessCasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
