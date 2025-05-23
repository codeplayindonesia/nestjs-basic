import { Controller, Get, Post, Body, HttpException, HttpStatus, ForbiddenException, BadRequestException, UseFilters } from '@nestjs/common';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';
import { HttpExceptionFilter } from 'src/http-exception.filter';

@Controller('cats')
// @UseFilters(HttpExceptionFilter)
export class CatsController {
  constructor(private catsService: CatsService) { }

  @Post()
  // @UseFilters(HttpExceptionFilter)
  async create(
    @Body("name") name: string,
    @Body("age") age: number,
    @Body("breed") breed: string
  ) {
    
    if (!name) {
      throw new BadRequestException("Name is required")
    }

    if (!age) {
      throw new BadRequestException("Age is required")
    }

    if (!breed) {
      throw new BadRequestException("Breed is required")
    }

    this.catsService.create({ name, age, breed });

    return {
      message: "Create cat successfully",
      data: { name, age, breed }
    }
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    // throw new HttpException("Forbidden", HttpStatus.FORBIDDEN)
    
    throw new ForbiddenException("You are not authorized")
    
    return this.catsService.findAll();
  }
}
