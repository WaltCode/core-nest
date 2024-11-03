import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateSongDTO } from './DTO/create-song.dto.';
import { connection } from 'src/common/constants/connection';
import { InjectRepository } from '@nestjs/typeorm';
import { Song } from './song.entity';
import { DeleteResult, In, Repository, UpdateResult } from 'typeorm';
import { UpdateSongDTO } from './DTO/update-song.dto';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';
import { Artist } from 'src/artist/artist.entity';

@Injectable()
export class SongsService {
    constructor(
        @InjectRepository(Song) private readonly songModel: Repository<Song>,
        @InjectRepository(Artist) private readonly artistModel: Repository<Artist>,
        // @Inject('CONNECTION') private connection: connection
    ){}
    async create(song: CreateSongDTO): Promise<Song>{ 
        try {
            const new_song = new Song()
            new_song.title = song.title;
            new_song.duration = song.duration;
            new_song.lyrics = song.lyrics;
            new_song.release_date = song.release_date;
            const artists: Artist[] = await this.artistModel.findBy({id: In([...song.artists]) });
            new_song.artists = artists;
            return await this.songModel.save(new_song);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR, {
                cause: error
            })
        }
    }

    async findAll(): Promise<[Song[], number]>{
        try {
            return await this.songModel.findAndCount();
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR, {
                cause: error
            })
        }
    }

    async findOne(id:number): Promise<Song>{
        try {
            return await this.songModel.findOneBy({id});  
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR, {
                cause: error
            })
        }
    }

    async deleteOne(id:number) :Promise<DeleteResult> {
        try {
            return await this.songModel.delete({id});  
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR, {
                cause: error
            })
        }
    }

    async updateOne(id:number, payload: UpdateSongDTO) :Promise<UpdateResult> {
        try {
            return await this.songModel.update({id}, payload);  
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR, {
                cause: error
            })
        }
    }

    async paginate(
        options: IPaginationOptions,
        sort_by: string,
        sort_direction: 'ASC' | 'DESC' = 'ASC'
    ): Promise<Pagination<Song>> {
        try {
            // adding sorting and filtering with queryBuilder
            const queryBuilder = this.songModel.createQueryBuilder('Song');
            // to sort
            queryBuilder.orderBy(`Song.${sort_by}`, sort_direction)
            // to paginate
            return await paginate<Song>(this.songModel, options) ; 
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR, {
                cause: error
            })
        }
    }
}
