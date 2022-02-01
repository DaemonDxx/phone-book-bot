import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import { EmployeeModule } from '../employee/employee.module';
import { BotService } from './bot.service';
import { BotUpdate } from './bot.update';
import { getConnectionToken } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { session } from 'telegraf-session-mongodb';
import { UpdaterModule } from '../updater/updater.module';
import { ApplyGoogleSheetSource } from '../updater/sources/googleSheets/import.function';
import { ConfigService } from 'daemondxx-nestconfig';

@Module({
  imports: [
    EmployeeModule,
    UpdaterModule.forRoot({
      source: ApplyGoogleSheetSource({
        inject: [ConfigService],
        useFactory: () => {
          return {
            accountOption: {
              private_key: process.env.GOOGLE_PRIVATE_KEY,
              client_email: process.env.GOOGLE_CLIENT_EMAIL,
            },
            workbookID: process.env.GOOGLE_WORKBOOK_ID,
          };
        },
      }),
      autoUpdate: false,
    }),
    TelegrafModule.forRootAsync({
      botName: process.env.BOT_NAME || 'Test bot',
      inject: [getConnectionToken()],
      useFactory: (conn: Connection) => {
        const sessionMiddleware = session(conn.db, {
          collectionName: 'session',
          sessionName: 'session',
        });
        return {
          token: process.env.BOT_TOKEN,
          include: [BotModule],
          middlewares: [sessionMiddleware],
        };
      },
    }),
  ],
  providers: [BotService, BotUpdate],
  exports: [],
})
export class BotModule {}
