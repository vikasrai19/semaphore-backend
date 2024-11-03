import { Test, TestingModule } from '@nestjs/testing';
import { MainEventService } from './main_event.service';

describe('MainEventService', () => {
  let service: MainEventService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MainEventService],
    }).compile();

    service = module.get<MainEventService>(MainEventService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
