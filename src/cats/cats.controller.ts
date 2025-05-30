import { Controller, Get, Post, Body, HttpException, HttpStatus, ForbiddenException, BadRequestException, UseFilters, Param, ParseIntPipe, UsePipes } from '@nestjs/common';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';
import { HttpExceptionFilter } from 'src/http-exception.filter';
import { ValidationPipe } from './pipes/validation.pipe';
import { ZodValidationPipe } from './pipes/ZodValidationPipe';
import { CreateCatDto, createCatSchema } from './cats.schema';

@Controller('cats')
// @UseFilters(HttpExceptionFilter)
export class CatsController {
  constructor(private catsService: CatsService) { }

  @Post()
  // @UseFilters(HttpExceptionFilter)
  @UsePipes(new ZodValidationPipe(createCatSchema))
  async create(
    @Body() body: CreateCatDto
  ) {
    this.catsService.create(body);

    return {
      message: "Create cat successfully",
      data: body
    }
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id", ValidationPipe) id: number) {
    // get from database base on id
    return {
      message: "test",
      id: id
    }
  }
}
