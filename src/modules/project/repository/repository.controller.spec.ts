import { Test, TestingModule } from '@nestjs/testing';
import { ProjectRepositoryController } from './repository.controller';

describe('Repository Controller', () => {
  let controller: ProjectRepositoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectRepositoryController],
    }).compile();

    controller = module.get<ProjectRepositoryController>(ProjectRepositoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
