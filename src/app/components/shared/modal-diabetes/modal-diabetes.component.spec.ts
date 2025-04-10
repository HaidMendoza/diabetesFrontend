import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDiabetesComponent } from './modal-diabetes.component';

describe('ModalDiabetesComponent', () => {
  let component: ModalDiabetesComponent;
  let fixture: ComponentFixture<ModalDiabetesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalDiabetesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalDiabetesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
