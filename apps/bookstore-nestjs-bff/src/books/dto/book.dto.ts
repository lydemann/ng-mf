import { ApiProperty } from '@nestjs/swagger';

export class BookDto {
  @ApiProperty({
    description: 'Unique id',
    example: '14',
  })
  id: string;

  @ApiProperty({
    description: 'Title',
    example: 'Lord of the Flies',
  })
  title: string;

  @ApiProperty({
    description: 'Price for this book',
    example: 60.55,
    required: false,
  })
  price?: number;

  @ApiProperty({
    description: 'Is book on sale',
    example: true,
    required: false,
  })
  onSale?: boolean;

  @ApiProperty({
    description: 'Number of pages',
    example: 224,
    required: false,
  })
  pageCount?: number;

  @ApiProperty({
    description: 'Last updated is used for concurrency check',
    example: '1601901810913',
    required: false,
  })
  lastUpdated?: string;

  @ApiProperty({
    description: 'last updated by in db',
    example: 'xxx-user',
    required: false,
  })
  lastUpdatedBy?: string;
}
