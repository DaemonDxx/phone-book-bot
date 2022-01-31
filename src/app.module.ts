import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BotModule } from './bot/bot.module';
import { ConfigModule } from 'daemondxx-nestconfig';

const getMongoURI = () => {
  return `mongodb://${process.env.MONGO_HOST || 'localhost'}/${
    process.env.MONGO_DB || 'test'
  }`;
};

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [
        '/etc/app/production.env',
        '/etc/app/development.env',
        './config/production.env',
        './config/development.env',
      ],
    }),
    MongooseModule.forRoot(getMongoURI()),
    BotModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
