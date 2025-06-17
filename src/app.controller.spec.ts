import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useValue: {
            getHello: jest.fn().mockReturnValue('Hello, World!'),
            getSum: jest.fn((a: number, b: number) => a + b),
          },
        },
      ],
    }).compile();

    appController = moduleRef.get<AppController>(AppController);
    appService = moduleRef.get<AppService>(AppService);
  });

  describe('getHello', () => {
    it('should return "Hello, World!"', () => {
      expect(appController.getHello()).toBe('Hello, World!');
    });
  });

  describe('getSum', () => {
    it('should return correct sum for valid input', () => {
      const result = appController.getSum({ a: 3, b: 4 });
      expect(result).toEqual({ result: 7 });
    });

    it('should throw BadRequestException for invalid input', () => {
      // @ts-expect-error intentionally passing wrong type
      expect(() => appController.getSum({ a: 'x', b: 4 })).toThrow();
    });
  });
});
