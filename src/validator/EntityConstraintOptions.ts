import {SelectQueryBuilder, ObjectLiteral} from 'typeorm';

export interface EntityConstraintOptions {
  table?: string;
  connection?: string;
  columnName?: string;
  where?: ObjectLiteral | ObjectLiteral[];
  whereDepColumn?: ObjectLiteral;
  ignore?: ObjectLiteral | ObjectLiteral[];
  ignoreDepColumn?: ObjectLiteral;
  query?: (query: SelectQueryBuilder<any>) => SelectQueryBuilder<any>;
}
