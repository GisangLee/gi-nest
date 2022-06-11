import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDTO } from './dto/create-movie.dto';
import { UpdateMovieDTO } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
    private movies: Movie[] = [];

    getAll(): Movie[] {
        return this.movies;
    }

    getOne(id:number):Movie {
        const foundMovie = this.movies.find(movie => movie.id === id);
        if(!foundMovie) {
            throw new NotFoundException("해당 영화를 찾을 수 없습니다.");
        }
        return foundMovie;
    }

    removeMovie(id:number){
        const foundMovie = this.getOne(id);
        this.movies = this.movies.filter(movie => movie.id !== id);
    }

    createMovie(movieData: CreateMovieDTO){
        this.movies.push({
            id: this.movies.length + 1,
            ...movieData
        })
    }

    updateMovie(id:number, movieData: UpdateMovieDTO){
        const foundMovie = this.getOne(id);
        this.removeMovie(id);
        this.movies.push({...foundMovie, ...movieData})
    }
}
