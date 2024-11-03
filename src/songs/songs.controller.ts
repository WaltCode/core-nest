import { Body, Controller, DefaultValuePipe, Delete, Get, HttpStatus, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDTO } from './DTO/create-song.dto.';
import { Song } from './song.entity';
import { UpdateSongDTO } from './DTO/update-song.dto';
import { DeleteResult, UpdateResult } from 'typeorm';
import { Pagination } from 'nestjs-typeorm-paginate';

@Controller('songs')
export class SongsController {
    constructor(
        private readonly songService: SongsService
    ){}

    @Post()
    async create(
        @Body() song: CreateSongDTO
    ): Promise<Song> {
        return this.songService.create(song);
    }

    @Get()
    async findAll(
        @Query(
            'page',
            new DefaultValuePipe(1),
            ParseIntPipe
        ) page: number = 1,
        @Query(
            'limit',
            new DefaultValuePipe(2),
            ParseIntPipe
        ) limit: number = 2,
        @Query(
            'sort_by'
        ) sort_by: string,
        @Query('sort_direction') sort_direction: 'ASC' | 'DESC' = 'ASC'
    ): Promise<Pagination<Song>> {
        return await this.songService.paginate({page, limit}, sort_by, sort_direction);
    }

    @Get('/:id')   
    async findSong(@Param( 
        'id',
        new ParseIntPipe({errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE})) 
        id: number
    ): Promise<Song> {
        const song = await this.songService.findOne(id);
        console.log(song);
        return song
    }  
    
    @Patch('/:id')
    async updateSong(
        @Param(
            'id', 
            new ParseIntPipe({errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE})
            )
            id: number,
        @Body() body: UpdateSongDTO
    ): Promise<UpdateResult> {
        return this.songService.updateOne(id, body);
    } 

    @Delete('/:id')
    async deleteSong(@Param('id') id: number): Promise<DeleteResult> {
        return this.songService.deleteOne(id)
    } 

    // @Get('/paginate')
    // async paginate(
    //     @Query(
    //         'page',
    //         new DefaultValuePipe(1),
    //         new ParseIntPipe({errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE})
    //     ) page: number = 1,
    //     @Query(
    //         'limit',
    //         new DefaultValuePipe(10),
    //         new ParseIntPipe({errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE})
    //     ) limit: number = 10
    // ):Promise<Pagination<Song>> {
    //     limit = limit > 100 ? 100 : limit;
    //     console.log({page, limit}); 
    //     return this.songService.paginate({page, limit})
    // }
}
