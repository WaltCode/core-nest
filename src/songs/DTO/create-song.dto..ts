import { IsArray, IsDateString, IsMilitaryTime, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Artist } from "src/artist/artist.entity";

 export class CreateSongDTO {

   @IsNotEmpty()
   @IsString()
   readonly title: string;

   @IsNotEmpty()
   @IsArray()
   @IsNumber({}, {each: true})
   readonly artists: Artist[];

   @IsNotEmpty()
   @IsDateString()
   readonly release_date: Date;

   @IsNotEmpty()
   @IsMilitaryTime()
   readonly duration: Date;

   @IsOptional()
   @IsString()
   readonly lyrics: string
 }