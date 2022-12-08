import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  checkHealth(): string {
    return 'Welcome on FastClap API !</br>' + new Date().toISOString();
  }
}
