import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateSongDTO } from './DTO/create-sog.dto';
import { connection } from 'src/common/constants/connection';

@Injectable()
export class SongsService {
    constructor(
        @Inject('CONNECTION') private connection: connection
    ){
        
    }

    private readonly Songs: CreateSongDTO[] = []

    create(song: CreateSongDTO){
        try {
            return this.Songs.push(song);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR, {
                cause: error
            })
        }
    }

    findAll(){
        try {
            return this.Songs;
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR, {
                cause: error
            })
        }
    }

    findSong(id:number){
        try {
            return this.Songs[id];
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR, {
                cause: error
            })
        }
    }
}
