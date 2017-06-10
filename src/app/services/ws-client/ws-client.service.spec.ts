import { TestBed, inject } from '@angular/core/testing';

import { WsClientService } from './ws-client.service';

describe('WsClientService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WsClientService]
    });
  });

  it('should ...', inject([WsClientService], (service: WsClientService) => {
    expect(service).toBeTruthy();
  }));
});
