import { TestBed } from '@angular/core/testing';

import { CargaService } from './services/carga.service';

describe('CargaService', () => {
  let service: CargaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CargaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
