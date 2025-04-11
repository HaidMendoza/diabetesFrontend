import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlgoritmoComponent } from './algoritmo.component';

describe('AlgoritmoComponent', () => {
  let component: AlgoritmoComponent;
  let fixture: ComponentFixture<AlgoritmoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlgoritmoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlgoritmoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
