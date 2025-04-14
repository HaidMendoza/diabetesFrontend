import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPersonaInfoComponent } from './modal-persona-info.component';

describe('ModalPersonaInfoComponent', () => {
  let component: ModalPersonaInfoComponent;
  let fixture: ComponentFixture<ModalPersonaInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalPersonaInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalPersonaInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
