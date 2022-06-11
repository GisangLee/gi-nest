import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { CreateMovieDTO } from './dto/create-movie.dto';
import { UpdateMovieDTO } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {

    constructor(readonly moviesService:MoviesService){}

    @Get()
    getAll() :Movie[]{
        return this.moviesService.getAll();
    }

    @Get("/:movieId")
    getOne(@Param("movieId") movieId:number) :Movie{
        return this.moviesService.getOne(movieId);
    }

    @Post()
    createMovie(@Body() movieData: CreateMovieDTO){
        return this.moviesService.createMovie(movieData);
    }

    @Delete("/:movieId")
    removeMovie(@Param("movieId") movieId:number){
        return this.moviesService.removeMovie(movieId);
    }

    @Put("/:movieId")
    updateMovie(@Param("movieId") movieId:number){
        return `This will update a movie with the ID > ${movieId}`;
    }
    @Patch("/:movieId")
    patchMovie(@Param("movieId") movieId:number, @Body() movieData: UpdateMovieDTO){
        return this.moviesService.updateMovie(movieId, movieData);
    }
}
