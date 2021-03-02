import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { Repository } from 'typeorm';
import { CategoryNotFoundException } from './exceptions/categoryNotFound.exception';
import { CreateCategoryDto } from './dto/createCategory.dto';
import { UpdateCategoryDto } from './dto/updateCategory.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  findAll() {
    return this.categoriesRepository.find({ relations: ['posts'] });
  }

  async findById(id: string) {
    const category = await this.categoriesRepository.findOne(id, {
      relations: ['posts'],
    });
    if (category) {
      return category;
    }

    throw new CategoryNotFoundException(id);
  }

  async create(category: CreateCategoryDto) {
    const newCategory = await this.categoriesRepository.create(category);
    await this.categoriesRepository.save(newCategory);
    return newCategory;
  }

  async update(id: string, category: UpdateCategoryDto) {
    await this.categoriesRepository.update(id, category);
    const updateCategory = await this.categoriesRepository.findOne(id, {
      relations: ['post'],
    });
    if (updateCategory) {
      return updateCategory;
    }

    throw new CategoryNotFoundException(id);
  }

  async delete(id: string) {
    const deleteResponse = await this.categoriesRepository.delete(id);
    if (!deleteResponse.affected) {
      throw new CategoryNotFoundException(id);
    }
  }
}
