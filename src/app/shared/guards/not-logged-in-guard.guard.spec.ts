import { TestBed } from '@angular/core/testing';

import { NotLoggedInGuardGuard } from './not-logged-in-guard.guard';

describe('NotLoggedInGuardGuard', () => {
  let guard: NotLoggedInGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(NotLoggedInGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
