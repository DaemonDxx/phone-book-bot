import { Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ExtractArgPipe implements PipeTransform {
  transform(value: any): any {
    const command: string = value;
    const args = command.split(' ').splice(1);
    return args[0];
  }
}
