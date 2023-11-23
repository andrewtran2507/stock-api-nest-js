import { IsString } from 'class-validator';
import { Transform } from 'class-transformer';

class FindOneParams {
  @IsString()
  @Transform(({ value }) => value)
  id: string;
}

export default FindOneParams;
