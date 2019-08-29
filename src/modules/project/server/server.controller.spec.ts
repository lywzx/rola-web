import { Test, TestingModule } from '@nestjs/testing';
import { ProjectServerController } from './server.controller';

describe('Server Controller', () => {
  let controller: ProjectServerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectServerController],
    }).compile();

    controller = module.get<ProjectServerController>(ProjectServerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
