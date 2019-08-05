import { CrudGlobalConfig } from '@nestjsx/crud';

export default {
  query: {
    limit: 15,
    maxLimit: 60,
    cache: 2000,
  },
} as CrudGlobalConfig;
