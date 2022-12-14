import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { catchError, delay, Observable, throwError } from 'rxjs';
import { IProduct } from '../models/product';
import { ErrorService } from './error.service';

@Injectable({providedIn: 'root'})
export class ProductsService {
    constructor(
        private httpClient: HttpClient,
        private errorService: ErrorService
        ) { }

    getAll(): Observable<IProduct[]> {
        return this.httpClient.get<IProduct[]>
        ('https://fakestoreapi.com/products')
        .pipe(
            delay(1000),
            catchError(this.errorHandler.bind(this))
        )
    }

    private errorHandler(error: HttpErrorResponse) {
this.errorService.handle(error.message)
        return throwError(()=> error.message)
    }
    
}