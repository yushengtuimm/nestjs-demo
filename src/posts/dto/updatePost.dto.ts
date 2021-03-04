import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class UpdatePostDto {
  @IsNumber()
  @IsOptional()
  id: string;

  @IsString({ each: true })
  @IsNotEmpty()
  @IsOptional()
  paragraphs: string[];

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  title: string;
}
