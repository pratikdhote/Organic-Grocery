import { TestBed } from '@angular/core/testing';

import { SCartServiceService } from 'shared/services/s-cart-service.service';

describe('SCartServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SCartServiceService = TestBed.get(SCartServiceService);
    expect(service).toBeTruthy();
  });
});
