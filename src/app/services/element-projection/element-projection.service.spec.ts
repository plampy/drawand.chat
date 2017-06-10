import { TestBed, inject } from '@angular/core/testing';

import { ElementProjectionService } from './element-projection.service';

describe('ElementProjectionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ElementProjectionService]
    });
  });

  it('should ...', inject([ElementProjectionService], (service: ElementProjectionService) => {
    expect(service).toBeTruthy();
  }));
});
