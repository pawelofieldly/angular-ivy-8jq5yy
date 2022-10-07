import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AbstractFormViewService } from '../../form-view/abstract-form-view.service';
import { IProductDto } from '../product.dto.service';

export interface ISummaryTabForm {
  isActive: FormControl<boolean>;
  isDiscountEnabled: FormControl<boolean>;
}

export interface ISummaryTabPayload {
  is_active: string;
  is_discount_enabled: string;
}

@Injectable()
export class SummaryTabService extends AbstractFormViewService<
  ISummaryTabForm,
  ISummaryTabPayload
> {
  protected form: FormGroup;

  constructor(private readonly formBuilder: FormBuilder) {
    super();
    this.form = this.formBuilder.group<ISummaryTabForm>({
      isActive: this.formBuilder.control({
        value: true,
        disabled: true,
      }),
      isDiscountEnabled: this.formBuilder.control({
        value: false,
        disabled: true,
      }),
    });
  }

  protected serializeFormValue(
    formValue: Record<keyof ISummaryTabForm, any>
  ): ISummaryTabPayload {
    return {
      is_active: formValue.isActive,
      is_discount_enabled: formValue.isDiscountEnabled,
    };
  }

  protected deserializePayload(
    payload: IProductDto
  ): Record<keyof ISummaryTabForm, any> {
    return {
      isActive: payload.is_active === 'true',
      isDiscountEnabled: payload.is_discount_enabled === 'true',
    };
  }
}
