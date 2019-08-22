export enum SettingValueTypeOptions {
  string  = 'string',
  json    = 'json',
  int     = 'int',
  boolean = 'boolean',
  float   = 'float',
}

export enum ProjectStatusOptions {
  lock = 'lock',
  ok = 'ok',
}

export enum YesOrNo {
  no = 'no',
  yes = 'yes',
}

export enum ProjectRepositoryType {
  git = 'git',
  svn = 'svn',
}

export enum ProjectRepositoryOnlineLogo {
  tag = 'tag',
  branch = 'branch',
}

export enum ProjectDeployOptions {
  before = 'before',
  after = 'after',
}

export enum ProjectDeployShellTypeOptions {
  up = 'up',
  down = 'down',
}
