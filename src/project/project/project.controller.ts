import { Controller } from '@nestjs/common';
import {ApiUseTags} from '@nestjs/swagger';

@ApiUseTags('project')
@Controller('project')
export class ProjectController {}
