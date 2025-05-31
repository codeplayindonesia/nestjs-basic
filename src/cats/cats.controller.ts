import { Controller, Get, Post, Body, HttpException, HttpStatus, ForbiddenException, BadRequestException, UseFilters, Param, ParseIntPipe, UsePipes, UseGuards } from '@nestjs/common';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';
import { HttpExceptionFilter } from 'src/http-exception.filter';
import { ValidationPipe } from './pipes/validation.pipe';
import { ZodValidationPipe } from './pipes/ZodValidationPipe';
import { CreateCatDto, createCatSchema } from './cats.schema';
import { RolesGuard } from './guards/roles.guard';
import { Roles } from './decorators/roles.decorator';

@Controller('cats')
@UseGuards(RolesGuard)
// @UseFilters(HttpExceptionFilter)
export class CatsController {
  constructor(private catsService: CatsService) { }

  // @UseGuards(RolesGuard)
  @Roles(['admin'])
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

  @Roles(['user', 'admin'])
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
