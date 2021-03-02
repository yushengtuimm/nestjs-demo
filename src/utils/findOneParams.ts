import { IsNumberString } from 'class-validator';

export class FindOneParams {
  // @IsMongoId() using mongodb
  @IsNumberString() // postgres
  id: string;
}
