import { Injectable, PipeTransform } from '@nestjs/common';
import { Query } from '../../types';

@Injectable()
export class QueryPipe implements PipeTransform {
  transform(value: any): Query {
    const data: string = value;
    const args = data.split(' ');
    const query: Query = {};
    if (args.length === 0) return;
    query.lastname = QueryPipe.upFirstChar(args[0]);
    if (args[1]) {
      query.firstname = QueryPipe.upFirstChar(args[1]);
    }
    return query;
  }

  private static upFirstChar(value: string): string {
    return value[0].toUpperCase() + value.substring(1);
  }
}
