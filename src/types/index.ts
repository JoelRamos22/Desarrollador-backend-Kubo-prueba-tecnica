// User types
export interface User {
    id: number;
    username: string;
    email: string;
    password: string;
    createdAt: Date;
}

export interface CreateUserDto {
    username: string;
    email: string;
    password: string;
}

// Movie types
export interface Movie {
    id: number;
    title: string;
    description?: string;
    releaseDate: Date;
    categoryId: number;
    createdAt: Date;
}

export interface CreateMovieDto {
    title: string;
    description?: string;
    releaseDate: Date;
    categoryId: number;
}

export interface MovieQuery {
    title?: string;
    categoryId?: number;
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}

// Category types
export interface Category {
    id: number;
    name: string;
}

// UserMovie types
export interface UserMovie {
    id: number;
    userId: number;
    movieId: number;
    watchedAt: Date;
}