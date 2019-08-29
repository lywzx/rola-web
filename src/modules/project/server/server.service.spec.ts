import { Test, TestingModule } from '@nestjs/testing';
import { ProjectServerService } from './server.service';

describe('ServerService', () => {
  let service: ProjectServerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProjectServerService],
    }).compile();

    service = module.get<ProjectServerService>(ProjectServerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
