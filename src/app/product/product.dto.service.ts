import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';

export interface IProductDto {
  product_title: string;
  client_name: string;
  is_active: string;
  is_discount_enabled: string;
}

@Injectable()
export class ProductDtoService {
  public getOne$(): Observable<IProductDto> {
    return of({
      product_title: 'Mocha tea',
      client_name: 'Anton Kowalsky',
      is_active: 'false',
      is_discount_enabled: 'false',
    }).pipe(delay(1500));
  }

  public saveOne$(payload: IProductDto): Observable<IProductDto> {
    return of(payload).pipe(delay(500));
  }
}
