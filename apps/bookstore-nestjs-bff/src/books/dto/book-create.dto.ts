import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, IsBoolean, Min, MaxLength } from 'class-validator';

export class BookCreateDto {
  @ApiProperty({
    description: 'Title of the book',
    example: 'Lord of the Flies',
  })
  @IsString()
  @MaxLength(255)
  title: string;

  @ApiProperty({
    description: 'Is this book on sale',
    example: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  onSale?: boolean;

  @ApiProperty({
    description: 'Number of pages in this book',
    example: 224,
  })
  @IsNumber()
  @Min(1)
  pageCount: number;

  @ApiProperty({
    description: 'Price for this book',
    example: 60.55,
  })
  @IsNumber()
  @Min(0)
  price: number;
}
