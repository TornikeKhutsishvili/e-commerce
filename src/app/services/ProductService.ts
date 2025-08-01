import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ProductModel } from '../models/product-model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'https://fakestoreapi.com/products';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getProductById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  getProductCarusel(): Observable<ProductModel[]>{
    return this.http.get<ProductModel[]>(this.apiUrl).pipe(
      map(products => this.getRandomProducts(products, 3))
    );
  }

  private getRandomProducts(products: ProductModel[], count: number): ProductModel[] {
    return products.sort(() => 0.5 - Math.random()).slice(0, count);
  }

}
