import {Controller, Req, UseGuards} from '@nestjs/common';
import {ApiUseTags} from '@nestjs/swagger';
import {AuthGuard} from '@nestjs/passport';
import {Crud, CrudController, CrudRequest, Override, ParsedBody, ParsedRequest} from '@nestjsx/crud';
import {ProjectsEntity} from '../../../entity/projects.entity';
import {ProjectService} from './project.service';
import {Request} from 'express';
import {UserEntity} from '../../../entity/user.entity';
import {ProjectCreateDto} from '../dto/project-create-dto';
import {EnvironmentService} from '../../environment/environment/environment.service';
import {ProjectEnvironmentEntity} from '../../../entity/project-environment.entity';

@ApiUseTags('project')
@Crud({
  model: {
    type: ProjectsEntity,
  },
  routes: {
    exclude: ['createManyBase'],
  },
  query: {
    join: {
      space: {
        eager: false,
      },
      environments: {
        eager: false,
      },
      creator: {
        eager: false,
      },
    },
  },
})
@UseGuards(AuthGuard())
@Controller('api/project')
export class ProjectController implements CrudController<ProjectsEntity> {
  public constructor(public service: ProjectService, protected environmentService: EnvironmentService) {}

  get base(): CrudController<ProjectsEntity> {
    return this;
  }

  @Override()
  async createOne(@ParsedRequest() req: CrudRequest, @ParsedBody() dto: ProjectCreateDto, @Req() request: Request): Promise<ProjectsEntity> {
    const user = request.user as UserEntity;
    const projectCreate: ProjectsEntity = dto as any as ProjectsEntity;

    projectCreate.user_id = user.id;
    projectCreate.environments = await this.environmentService.getEnvironmentsByIds(dto.environment_ids).then(response => {
      return response.map((it) => {
        return {
          environment_id: it.id,
          name: it.name,
          display_name: it.display_name,
          lock: 'no',
        };
      }) as ProjectEnvironmentEntity[];
    });

    return this.base.createOneBase(req, projectCreate);
  }
}
