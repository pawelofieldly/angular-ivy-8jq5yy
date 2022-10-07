import { Injectable } from '@angular/core';
import { mapTo, merge, Observable, tap } from 'rxjs';
import { ProductFormMediatorService } from './product-form-mediator.service';
import { IProductDto, ProductDtoService } from './product.dto.service';

@Injectable()
export class ProductService {
  constructor(
    private readonly productFormMediatorService: ProductFormMediatorService,
    private readonly productDtoService: ProductDtoService
  ) {}

  public init$(): Observable<void> {
    return merge(
      this.productDtoService.getOne$().pipe(
        tap((productDto: IProductDto) => {
          this.productFormMediatorService.fillTheForm(productDto);
        })
      ),
      this.productFormMediatorService.initListeners$()
    ).pipe(mapTo(void 0));
  }

  public save$(): Observable<IProductDto> {
    return this.productDtoService.saveOne$(
      this.productFormMediatorService.getFormValue()
    );
  }

  public isTabDirty$(tab: string): Observable<boolean> {
    return this.productFormMediatorService.isTabDirty$(tab);
  }
}
