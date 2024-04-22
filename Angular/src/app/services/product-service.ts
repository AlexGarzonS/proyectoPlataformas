import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ProductModel } from '../models/product-model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private url = 'http://localhost:4000/api';

  constructor(private http: HttpClient) { }

  addProduct(formData: any): Observable<any> {
    const urlAdd = `${this.url}/addProduct`;
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<ProductModel>(urlAdd, formData,{headers:headers})
      .pipe(
        catchError(error => {
          // Manejar errores aquí
          console.error('Error al agregar producto:', error);
          throw error; // Relanzar el error para que el componente lo maneje
        })
      );
  }

  allProducts(): Observable<any> {
    return this.http.get<any>(`${this.url}/products`);
  }
}

