import { TestBed, inject } from '@angular/core/testing';

import { PaletteStateService } from './palette-state.service';

describe('PaletteStateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PaletteStateService]
    });
  });

  it('should ...', inject([PaletteStateService], (service: PaletteStateService) => {
    expect(service).toBeTruthy();
  }));
});
