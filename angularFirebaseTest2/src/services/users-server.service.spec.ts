import { TestBed } from '@angular/core/testing';

import { UsersServerService } from './users-server.service';

describe('UsersServerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UsersServerService = TestBed.get(UsersServerService);
    expect(service).toBeTruthy();
  });
});
