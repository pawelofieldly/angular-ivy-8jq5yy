import { AbstractControl, FormGroup } from '@angular/forms';
import { AbstractFormViewService } from './abstract-form-view.service';

export class AbstractFormViewComponent<
  FormType extends { [K in keyof FormType]: AbstractControl<any, any> },
  Payload extends Record<string, any>
> {
  public readonly form: FormGroup;

  constructor(
    protected readonly formViewService: AbstractFormViewService<
      FormType,
      Payload
    >
  ) {
    this.form = this.formViewService.getForm();
  }
}
