import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SongsModule } from './songs/songs.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerMiddleware } from './common/middleware/logger/logger.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      // using TypeOrm
      useFactory: (configService: ConfigService) =>({
          type: 'postgres',
          host: 'localhost',
          port: +configService.get<number>('PG_PORT'),
          username: configService.get<string>('PG_USERNAME'),
          password: configService.get<string>('PG_PASSWORD'),
          database: 'core-test',
          entities: [],
          autoLoadEntities: true,
          // used in development
          // not to be used in production
          synchronize: true
        
      }),
      inject: [ConfigService]
    }),
    // DB connection with sequelize
    // SequelizeModule.forRootAsync({
    //   imports: [ConfigModule],
      
    //   useFactory: (configService: ConfigService) => ({
    //     dialect: 'mysql',
    //     host: 'localhost',
    //     port: 3306,
    //     username: 'root',
    //     password: 'root',
    //     models: [],
    //     autoLoadModels: true,
    //     synchronize: true,
    //   }),
    //   inject: [ConfigService]
    // }),
    SongsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  constructor(
    private dataSource: DataSource
  ){
    console.log(dataSource.driver.database)
  }
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware)
      .forRoutes('songs')
  }
}