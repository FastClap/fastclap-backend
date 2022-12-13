import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { throwWrongFormat } from '../errors/InvalidFormat';

export const IsUuidParam = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const uuid: string = request.params[data];
    if (!uuid) {
      return '';
    }
    // this regexp insure the fact
    const cmp = uuid
      .slice()
      .match(
        '^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$',
      );
    if (cmp === null) {
      throw throwWrongFormat(data, 'uuid');
    }
    return uuid;
  },
);
