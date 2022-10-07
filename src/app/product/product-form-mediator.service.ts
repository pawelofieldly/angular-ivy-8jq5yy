import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, tap, mapTo, merge, map, startWith } from 'rxjs';
import { AbstractFormViewService } from './../form-view/abstract-form-view.service';
import {
  ClientTabService,
  IClientTabForm,
} from './product-tabs/client-tab.service';
import {
  ISummaryTabForm,
  SummaryTabService,
} from './product-tabs/summary-tab.service';
import {
  ITitleTabForm,
  TitleTabService,
} from './product-tabs/title-tab.service';
import { IProductDto } from './product.dto.service';

export interface IProductForm {
  title: FormGroup<ITitleTabForm>;
  client: FormGroup<IClientTabForm>;
  summary: FormGroup<ISummaryTabForm>;
}

@Injectable()
export class ProductFormMediatorService extends AbstractFormViewService<
  IProductForm,
  IProductDto
> {
  protected form: FormGroup;

  private tabsServices: Record<string, AbstractFormViewService<any, any>>;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly titleTabService: TitleTabService,
    private readonly clientTabService: ClientTabService,
    private readonly summaryTabService: SummaryTabService
  ) {
    super();
    this.form = this.formBuilder.group<IProductForm>({
      title: this.titleTabService.getForm(),
      client: this.clientTabService.getForm(),
      summary: this.summaryTabService.getForm(),
    });
    this.tabsServices = {
      title: this.titleTabService,
      client: this.clientTabService,
      summary: this.summaryTabService,
    };
  }

  public fillTheForm(productDto: IProductDto): void {
    this.titleTabService.fillTheForm(productDto);
    this.clientTabService.fillTheForm(productDto);
    this.summaryTabService.fillTheForm(productDto);
  }

  public initListeners$(): Observable<void> {
    return merge(this.onClientValueNotEmpty$(), this.onTitleValueNotEmpty$());
  }

  public isTabDirty$(tabName: string): Observable<boolean> {
    return this.form.valueChanges.pipe(
      startWith(this.form.value),
      map(() => this.tabsServices[tabName].isViewDirty())
    );
  }

  protected serializeFormValue(): IProductDto {
    return {
      ...this.titleTabService.getFormValue(),
      ...this.clientTabService.getFormValue(),
      ...this.summaryTabService.getFormValue(),
    };
  }

  protected deserializePayload(dto: IProductDto): any {
    return dto;
  }

  private onTitleValueNotEmpty$(): Observable<void> {
    return this.titleTabService.titleValueChanged$().pipe(
      tap((value: string) => {
        this.clientTabService.setIsFormDisabled(!value.length);
        this.summaryTabService.setIsFormDisabled(!value.length);
      }),
      mapTo(void 0)
    );
  }

  private onClientValueNotEmpty$(): Observable<void> {
    return this.clientTabService.clientValueChanged$().pipe(
      tap((value: string) => {
        this.summaryTabService.setIsFormDisabled(!value.length);
      }),
      mapTo(void 0)
    );
  }
}
