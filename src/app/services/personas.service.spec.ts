import { TestBed } from '@angular/core/testing';

import { PersonasService } from '../../services/personas.service';

describe('PersonasService', () => {
  let service: PersonasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
