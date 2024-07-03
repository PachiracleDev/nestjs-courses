import {
  ArgumentMetadata,
  Inject,
  Injectable,
  PipeTransform,
  Type,
} from '@nestjs/common';

export function EntityExistsPipe(entityCls: Type): Type<PipeTransform> {
  @Injectable()
  class EntityExistsPipe implements PipeTransform {
    constructor(
      @Inject(entityCls)
      private entityRepository: { findOne: (id: number) => Promise<any> },
    ) {}

    async transform(value: any, metadata: ArgumentMetadata) {
      const entity = await this.entityRepository.findOne(value);
      if (!entity) {
        throw new Error(`${entityCls.name} with id ${value} not found`);
      }

      return value;
    }
  }

  return EntityExistsPipe;
}
