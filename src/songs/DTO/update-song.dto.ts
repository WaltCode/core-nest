import { IsArray, IsDateString, IsMilitaryTime, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Artist } from "src/artist/artist.entity";

export class UpdateSongDTO {
    @IsOptional()
    @IsString()
    readonly title: string;

    @IsOptional()
    @IsArray()
   @IsNumber({}, {each: true})
    readonly artists: Artist[];

    @IsOptional()
    @IsDateString()
    readonly release_date: Date;

    @IsOptional()
    @IsMilitaryTime()
    readonly duration: Date;

    @IsOptional()
    @IsString()
    readonly lyrics: string
}