import { IsString, IsNotEmpty } from 'class-validator';

class UpdatePostDto {
  @IsString()
  id: string;

  @IsString()
  @IsNotEmpty()
  title: string;
}

export default UpdatePostDto;
