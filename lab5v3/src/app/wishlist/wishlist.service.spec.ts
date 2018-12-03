import { TestBed } from '@angular/core/testing';

import { Wishlist.ServiceService } from './wishlist.service.service';

describe('Wishlist.ServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Wishlist.ServiceService = TestBed.get(Wishlist.ServiceService);
    expect(service).toBeTruthy();
  });
});
