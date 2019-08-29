import { Test, TestingModule } from '@nestjs/testing';
import { ProjectRepositoryService } from './repository.service';

describe('RepositoryService', () => {
  let service: ProjectRepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProjectRepositoryService],
    }).compile();

    service = module.get<ProjectRepositoryService>(ProjectRepositoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
