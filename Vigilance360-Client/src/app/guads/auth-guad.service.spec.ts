import { TestBed } from '@angular/core/testing';

import { AuthGuadService } from './auth-guad.service';

describe('AuthGuadService', () => {
  let service: AuthGuadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthGuadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
