import { TestBed } from '@angular/core/testing';

import { LoginRegServiceService } from './login-reg-service.service';

describe('LoginRegServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoginRegServiceService = TestBed.get(LoginRegServiceService);
    expect(service).toBeTruthy();
  });
});
