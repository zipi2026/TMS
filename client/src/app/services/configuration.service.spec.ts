import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Subject } from 'rxjs';
import { ConfigurationService } from './configuration.service';
import { WebsocketService } from './http/web-socket.service';

describe('ConfigurationService', () => {
  let service: ConfigurationService;
  let websocketService: jasmine.SpyObj<WebsocketService>;

  beforeEach(() => {
    const websocketSpy = jasmine.createSpyObj('WebsocketService', ['init'], {
      messages: new Subject<any>()
    });

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ConfigurationService,
        { provide: WebsocketService, useValue: websocketSpy }
      ]
    });

    service = TestBed.inject(ConfigurationService);
    websocketService = TestBed.inject(WebsocketService) as jasmine.SpyObj<WebsocketService>;
  });

  it('should fall back to the default websocket URL when no websocket path is configured', () => {
    service.ips = { servicePath: 'http://localhost:3030/' } as any;

    service.initWS();

    expect(websocketService.init).toHaveBeenCalledWith('ws://localhost:3005');
  });
});
