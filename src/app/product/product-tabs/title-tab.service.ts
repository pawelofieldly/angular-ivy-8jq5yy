import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { AbstractFormViewService } from '../../form-view/abstract-form-view.service';
import { IProductDto } from '../product.dto.service';

export interface ITitleTabForm {
  title: FormControl<string>;
}

export interface ITitleTabPayload {
  product_title: string;
}

@Injectable()
export class TitleTabService extends AbstractFormViewService<
  ITitleTabForm,
  ITitleTabPayload
> {
  protected form: FormGroup;

  constructor(private readonly formBuilder: FormBuilder) {
    super();
    this.form = this.formBuilder.group<ITitleTabForm>({
      title: this.formBuilder.control(''),
    });
  }

  public titleValueChanged$(): Observable<string> {
    return this.form.get('title').valueChanges;
  }

  protected serializeFormValue(
    formValue: Record<keyof ITitleTabForm, any>
  ): ITitleTabPayload {
    return {
      product_title: formValue.title,
    };
  }

  protected deserializePayload(
    payload: IProductDto
  ): Record<keyof ITitleTabForm, any> {
    return {
      title: payload.product_title,
    };
  }
}
