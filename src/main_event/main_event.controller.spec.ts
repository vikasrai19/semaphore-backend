import { Test, TestingModule } from '@nestjs/testing';
import { MainEventController } from './main_event.controller';

describe('MainEventController', () => {
  let controller: MainEventController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MainEventController],
    }).compile();

    controller = module.get<MainEventController>(MainEventController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
