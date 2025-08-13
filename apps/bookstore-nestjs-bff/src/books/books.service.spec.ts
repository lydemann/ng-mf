import { Test, TestingModule } from '@nestjs/testing';
import { BooksService } from './books.service';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { BookCreateDto } from './dto/book-create.dto';
import { BookUpdateDto } from './dto/book-update.dto';

describe('BooksService', () => {
  let service: BooksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BooksService],
    }).compile();

    service = module.get<BooksService>(BooksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all books when no filter is applied', async () => {
      const result = await service.findAll();
      expect(result).toHaveLength(3);
      expect(result[0].title).toBe('Lord of the Flies');
    });

    it('should return only books on sale when onSale is true', async () => {
      const result = await service.findAll(true);
      expect(result).toHaveLength(2);
      expect(result.every(book => book.onSale)).toBe(true);
    });

    it('should return only books not on sale when onSale is false', async () => {
      const result = await service.findAll(false);
      expect(result).toHaveLength(1);
      expect(result.every(book => !book.onSale)).toBe(true);
    });
  });

  describe('findOne', () => {
    it('should return a book when it exists', async () => {
      const result = await service.findOne('1');
      expect(result.title).toBe('Lord of the Flies');
    });

    it('should throw NotFoundException when book does not exist', async () => {
      await expect(service.findOne('999')).rejects.toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    it('should create a new book', async () => {
      const bookCreate: BookCreateDto = {
        title: 'New Book',
        price: 29.99,
        pageCount: 300,
        onSale: true,
      };

      const result = await service.create(bookCreate);
      expect(result.title).toBe('New Book');
      expect(result.price).toBe(29.99);
      expect(result.pageCount).toBe(300);
      expect(result.onSale).toBe(true);
      expect(result.id).toBe('4');
    });
  });

  describe('update', () => {
    it('should update an existing book', async () => {
      const bookUpdate: BookUpdateDto = {
        title: 'Updated Book',
        price: 39.99,
        pageCount: 250,
        onSale: false,
        lastUpdated: 1601901810913,
      };

      const result = await service.update('1', bookUpdate);
      expect(result.title).toBe('Updated Book');
      expect(result.price).toBe(39.99);
      expect(result.pageCount).toBe(250);
      expect(result.onSale).toBe(false);
    });

    it('should throw NotFoundException when book does not exist', async () => {
      const bookUpdate: BookUpdateDto = {
        title: 'Updated Book',
        price: 39.99,
        pageCount: 250,
        onSale: false,
        lastUpdated: 1601901810913,
      };

      await expect(service.update('999', bookUpdate)).rejects.toThrow(NotFoundException);
    });

    it('should throw BadRequestException when lastUpdated does not match', async () => {
      const bookUpdate: BookUpdateDto = {
        title: 'Updated Book',
        price: 39.99,
        pageCount: 250,
        onSale: false,
        lastUpdated: 9999999999999, // Different timestamp
      };

      await expect(service.update('1', bookUpdate)).rejects.toThrow(BadRequestException);
    });
  });

  describe('remove', () => {
    it('should remove an existing book', async () => {
      const initialCount = (await service.findAll()).length;
      await service.remove('1');
      const finalCount = (await service.findAll()).length;
      expect(finalCount).toBe(initialCount - 1);
    });

    it('should throw NotFoundException when book does not exist', async () => {
      await expect(service.remove('999')).rejects.toThrow(NotFoundException);
    });
  });
});
