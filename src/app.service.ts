import { Injectable } from '@nestjs/common';

// Injectable（注入可能）DIにおける注入可能なクラス
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
