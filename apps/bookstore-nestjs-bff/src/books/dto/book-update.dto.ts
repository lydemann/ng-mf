import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsBoolean, Min, MaxLength } from 'class-validator';

export class BookUpdateDto {
  @ApiProperty({
    description: 'Title of the book',
    example: 'Lord of the Flies',
  })
  @IsString()
  @MaxLength(255)
  title: string;

  @ApiProperty({
    description: 'Last updated is used for concurrency check',
    example: 1601901810913,
  })
  @IsNumber()
  lastUpdated: number;

  @ApiProperty({
    description: 'Is this book on sale',
    example: true,
  })
  @IsBoolean()
  onSale: boolean;

  @ApiProperty({
    description: 'number of pages in this book',
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
