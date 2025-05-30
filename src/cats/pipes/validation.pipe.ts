import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

@Injectable()
export class ValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const result = Number(value)
    if (isNaN(result)) throw new BadRequestException("Gagal parsing value di Custom Pipe")

    return result
  }
}
