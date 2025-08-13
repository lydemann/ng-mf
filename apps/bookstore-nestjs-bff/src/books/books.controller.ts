import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
    Query,
    HttpStatus,
    HttpCode,
} from '@nestjs/common';
import {
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiParam,
    ApiQuery,
    ApiBody,
} from '@nestjs/swagger';
import { BooksService } from './books.service';
import { Book } from '../models';
import { BookCreateDto } from './dto/book-create.dto';
import { BookUpdateDto } from './dto/book-update.dto';
import { BookDto } from './dto/book.dto';

@ApiTags('BookstoreBff')
@Controller('v1/books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  @ApiOperation({
    summary: 'Get list of books',
    description: 'Gets a list of books based on true/false value of onSale.',
  })
  @ApiQuery({
    name: 'onSale',
    description: 'only get books on sale',
    required: false,
    type: Boolean,
    example: false,
  })
  @ApiResponse({
    status: 200,
    description: 'Successful response - returns an array of books',
    type: [BookDto],
  })
  @ApiResponse({
    status: 403,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: 404,
    description: 'Not found',
  })
  async getBooks(@Query('onSale') onSale?: boolean): Promise<Book[]> {
    return this.booksService.findAll(onSale);
  }

  @Post()
  @ApiOperation({
    summary: 'Create a book',
    description: 'Creates a new instance of a `book`.',
  })
  @ApiBody({
    description: 'A new `book` to be created.',
    type: BookCreateDto,
  })
  @ApiResponse({
    status: 201,
    description: 'Successful response.',
    type: BookDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Input validation error',
  })
  @HttpCode(HttpStatus.CREATED)
  async createBook(@Body() bookCreate: BookCreateDto): Promise<Book> {
    return this.booksService.create(bookCreate);
  }

  @Get(':bookId')
  @ApiOperation({
    summary: 'Get a book',
    description: 'Gets the details of a `book`.',
  })
  @ApiParam({
    name: 'bookId',
    description: 'A unique identifier for a `book`.',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'Successful response - returns a single `book`.',
    type: BookDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad input from user',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: 403,
    description: 'This response is returned, when you are not permitted to get a book.',
  })
  async getBook(@Param('bookId') bookId: string): Promise<Book> {
    return this.booksService.findOne(bookId);
  }

  @Put(':bookId')
  @ApiOperation({
    summary: 'Update a book',
    description: 'Updates an existing `book`.',
  })
  @ApiParam({
    name: 'bookId',
    description: 'A unique identifier for a `book`.',
    type: String,
  })
  @ApiBody({
    description: 'Updated `book` information.',
    type: BookUpdateDto,
  })
  @ApiResponse({
    status: 200,
    description: 'The book is updated',
    type: BookDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Input validation error',
  })
  @ApiResponse({
    status: 404,
    description: 'Not found',
  })
  async updateBook(
    @Param('bookId') bookId: string,
    @Body() bookUpdate: BookUpdateDto,
  ): Promise<Book> {
    return this.booksService.update(bookId, bookUpdate);
  }

  @Delete(':bookId')
  @ApiOperation({
    summary: 'Delete a book',
    description: 'Deletes an existing `book`.',
  })
  @ApiParam({
    name: 'bookId',
    description: 'A unique identifier for a `book`.',
    type: String,
  })
  @ApiResponse({
    status: 204,
    description: 'Successfully deletion of book',
  })
  @ApiResponse({
    status: 403,
    description: 'Not allowed to delete book',
  })
  @ApiResponse({
    status: 404,
    description: 'Not found',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteBook(@Param('bookId') bookId: string): Promise<void> {
    return this.booksService.remove(bookId);
  }
}
