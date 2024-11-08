import { Module } from '@nestjs/common';
import { SongsController } from './songs.controller';
import { SongsService } from './songs.service';
import { Connection } from 'src/common/constants/connection';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Song } from './song.entity';
import { Artist } from 'src/artist/artist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Song, Artist])],
  controllers: [SongsController],
  providers: [
    // using standard providers technique
    SongsService,

    // using class provider tchnique
    // {
    //   provide: SongsService,
    //   useClass: SongsService
    // }

    // using value provider tchnique
    // where MockService is a constant value or a third party library
    // {
    //   provide: SongsService,
    //   useValue: MockService
    // }

    // using non class provider
    // {
    //   provide: 'CONNECTION',
    //   useValue: Connection
    // }
  ]
})
export class SongsModule {}
