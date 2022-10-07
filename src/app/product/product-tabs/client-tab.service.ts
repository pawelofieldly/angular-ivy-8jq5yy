import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormControlStatus, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { AbstractFormViewService } from '../../form-view/abstract-form-view.service';
import { IProductDto } from '../product.dto.service';

export interface IClientTabForm {
  client: FormControl<string>;
}

export interface IClientTabPayload {
  client_name: string;
}

@Injectable()
export class ClientTabService extends AbstractFormViewService<
  IClientTabForm,
  IClientTabPayload
> {
  protected form: FormGroup;

  constructor(private readonly formBuilder: FormBuilder) {
    super();
    this.form = this.formBuilder.group<IClientTabForm>({
      client: this.formBuilder.control(''),
    });
  }

  public clientValueChanged$(): Observable<string> {
    return this.form.get('client').valueChanges;
  }

  public clientStateChanged$(): Observable<FormControlStatus> {
    return this.form.get('client').statusChanges;
  }

  protected serializeFormValue(
    formValue: Record<keyof IClientTabForm, any>
  ): IClientTabPayload {
    return {
      client_name: formValue.client,
    };
  }

  protected deserializePayload(
    payload: IProductDto
  ): Record<keyof IClientTabForm, any> {
    return {
      client: payload.client_name,
    };
  }
}
