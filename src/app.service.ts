import { Injectable, OnApplicationBootstrap } from '@nestjs/common';

@Injectable()
export class AppService implements OnApplicationBootstrap {
  extractIDFromData(data: string) {
    return data.split(' ')[1];
  }

  async onApplicationBootstrap() {
    //console.log(await this.employeeService.findEmployeesByLastname('Стасевич'));
  }
}
