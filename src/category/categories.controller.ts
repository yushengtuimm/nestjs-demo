import {
  UseInterceptors,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  UseGuards,
  Body,
  Post,
  Patch,
  Delete,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { FindOneParams } from '../utils/findOneParams';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/createCategory.dto';
import { UpdateCategoryDto } from './dto/updateCategory.dto';

@Controller('categories')
@UseInterceptors(ClassSerializerInterceptor)
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  findById(@Param() { id }: FindOneParams) {
    return this.categoriesService.findById(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() category: CreateCategoryDto) {
    return this.categoriesService.create(category);
  }

  @Patch(':id')
  async update(
    @Param() { id }: FindOneParams,
    @Body() category: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(id, category);
  }

  @Delete(':id')
  async delete(@Param() { id }: FindOneParams) {
    return this.categoriesService.delete(id);
  }
}
