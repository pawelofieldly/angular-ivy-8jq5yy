import { Component, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ProductFormMediatorService } from './product-form-mediator.service';
import { ClientTabService } from './product-tabs/client-tab.service';
import { SummaryTabService } from './product-tabs/summary-tab.service';
import { TitleTabService } from './product-tabs/title-tab.service';
import { IProductDto, ProductDtoService } from './product.dto.service';
import { ProductService } from './product.service';

@Component({
  selector: 'app-product',
  template: `
    <div *ngIf="isLoaded; else isLoading">
      <div class="tab" style="background: #c8c8c8">
        <h4 class="tab-title">title <span *ngIf="isTabDirty$('title') | async" class="m-is-dirty">*</span></h4>
        <app-title-tab></app-title-tab>
      </div>
      <div class="tab" style="background: #f1f1f1">
      <h4 class="tab-title">client <span *ngIf="isTabDirty$('client') | async" class="m-is-dirty">*</span></h4>
        <app-client-tab></app-client-tab>
      </div>
      <div class="tab" style="background: #e8e8e8">
      <h4 class="tab-title">summary <span *ngIf="isTabDirty$('summary') | async" class="m-is-dirty">*</span></h4>
        <app-summary-tab></app-summary-tab>
      </div>

      <button (click)="saveForm()" class="btn">Save</button>
    </div>
    <ng-template #isLoading>LOADING...</ng-template>
  `,
  styles: [
    `
      .tab-title {
        border: 1px solid black; padding: 10px; background: #b8b8b8;
      }
      .tab {
        padding: 20px;
      }
      .btn {
        margin-top: 20px;
        padding: 6px 16px;
        background: green;
        color: white;
        border: none;
      }
      .m-is-dirty {
        color: red;
      }
    `,
  ],
  providers: [
    ProductDtoService,
    ProductService,
    ProductFormMediatorService,
    ClientTabService,
    TitleTabService,
    SummaryTabService,
  ],
})
export class ProductComponent implements OnDestroy {
  public isLoaded: boolean;
  private subscription: Subscription;

  constructor(private readonly productService: ProductService) {
    this.isLoaded = false;
    this.subscription = new Subscription();
    this.subscription.add(
      this.productService.init$().subscribe(() => {
        this.isLoaded = true;
      })
    );
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public saveForm(): void {
    this.subscription.add(
      this.productService.save$().subscribe((product: IProductDto) => {
        alert(`${JSON.stringify(product)}`);
      })
    );
  }

  public isTabDirty$(tab: string): Observable<boolean> {
    return this.productService.isTabDirty$(tab);
  }
}
