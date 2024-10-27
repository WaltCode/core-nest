import { Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDTO } from './DTO/create-sog.dto';

@Controller('songs')
export class SongsController {
    constructor(
        private readonly songService: SongsService
    ){}

    @Post()
    async create(
        @Body() song: CreateSongDTO
    ) {
        return this.songService.create(song);
    }

    @Get()
    async findAll() {
        return this.songService.findAll()
    }

    @Get('/:id')
    async findSong(@Param(
        'id',
        new ParseIntPipe({errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE})
    ) id: number) {
        return this.songService.findSong(id);
    }  
    
    @Patch('/:id')
    async updateSong(id: string) {
        return `updated song with ID: ${id}`
    } 

    @Delete('/:id')
    async deleteSong(id: string) {
        return `deleted song with ID: ${id}`
    } 
}
