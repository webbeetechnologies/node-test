import * as moment from 'moment';
import { Test } from '@nestjs/testing';
import { EventController } from './event.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './entities/event.entity';
import { ConfigModule } from '@nestjs/config';
import { typeOrmAsyncConfig } from './config/typeorm.config';
import { MenuController } from './menu.controller';
import { MenuItem } from './entities/menu.entity';
import { Workshop } from './entities/workshop.entity';

describe('EventController', () => {
  let eventController: EventController;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [EventController],
      imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
        TypeOrmModule.forFeature([Event, Workshop]),
      ],
    }).compile();
    eventController = moduleRef.get<EventController>(EventController);
  });

  describe('getWarmupEvents', () => {
    it('Warm Up Event Result Test', async () => {
      const date1 = moment().subtract(1, 'years').format('YYYY').toString();
      const date2 = moment().add(1, 'years').format('YYYY').toString();

      const result = await eventController.getWarmupEvents();
      expect(result.length).toBe(3);
      expect(result[0].name).toBe('Laravel convention ' + date1);
      expect(result[1].name).toBe('Laravel convention ' + date2);
      expect(result[2].name).toBe('React convention ' + date2);
    });
  });

  describe('getEventsWithWorkshops', () => {
    it('Event With Workshop Result Test', async () => {
      const date1 = moment().subtract(1, 'years').format('YYYY').toString();
      const date2 = moment().add(1, 'years').format('YYYY').toString();
      const result = await eventController.getEventsWithWorkshops();
      expect(result.length).toBe(3);
      expect(result[0].name).toBe('Laravel convention ' + date1);
      expect(result[0].workshops[0].name).toBe(
        'Illuminate your knowledge of the laravel code base',
      );
      expect(result[1].name).toBe('Laravel convention ' + date2);
      expect(result[1].workshops[0].name).toBe(
        'The new Eloquent - load more with less',
      );
      expect(result[1].workshops[1].name).toBe(
        'AutoEx - handles exceptions 100% automatic',
      );
      expect(result[2].name).toBe('React convention ' + date2);
      expect(result[2].workshops[0].name).toBe(
        '#NoClass pure functional programming',
      );
      expect(result[2].workshops[1].name).toBe(
        'Navigating the function jungle',
      );
    });
  });

  describe('getFutureEventWithWorkshops', () => {
    it('Event With Workshop Result Test', async () => {
      const date2 = moment().add(1, 'years').format('YYYY').toString();
      const result = await eventController.getFutureEventWithWorkshops();
      expect(result.length).toBe(2);
      expect(result[0].name).toBe('Laravel convention ' + date2);
      expect(result[0].workshops[0].name).toBe(
        'The new Eloquent - load more with less',
      );
      expect(result[0].workshops[1].name).toBe(
        'AutoEx - handles exceptions 100% automatic',
      );
      expect(result[1].name).toBe('React convention ' + date2);
      expect(result[1].workshops[0].name).toBe(
        '#NoClass pure functional programming',
      );
      expect(result[1].workshops[1].name).toBe(
        'Navigating the function jungle',
      );
    });
  });
});

describe('MenuController', () => {
  let menuController: MenuController;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [MenuController],
      imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
        TypeOrmModule.forFeature([MenuItem]),
      ],
    }).compile();
    menuController = moduleRef.get<MenuController>(MenuController);
  });

  describe('getMenuItems', () => {
    it('Menu Item Result Test', async () => {
      const result = await menuController.getMenuItems();
      expect(result.length).toBe(1);
      expect(result[0].children[0].name).toBe('Laracon');
      expect(result[0].children[0].children[0].url).toBe(
        '/events/laracon/workshops/illuminate',
      );
      expect(result[0].children[0].children[1].url).toBe(
        '/events/laracon/workshops/eloquent',
      );
      expect(result[0].children[1].name).toBe('Reactcon');
      expect(result[0].children[1].children[0].url).toBe(
        '/events/reactcon/workshops/noclass',
      );
      expect(result[0].children[1].children[1].url).toBe(
        '/events/reactcon/workshops/jungle',
      );
    });
  });
});
