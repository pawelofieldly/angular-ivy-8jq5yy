import { AbstractControl, FormGroup } from '@angular/forms';

export abstract class AbstractFormViewService<
  FormType extends { [K in keyof FormType]: AbstractControl<any, any> },
  Payload extends Record<string, any>
> {
  protected abstract form: FormGroup<FormType>;

  private initialFormValue: Record<keyof FormType, any> | undefined;

  public getForm(): FormGroup<FormType> {
    return this.form;
  }

  public fillTheForm(
    payload: Payload,
    formOptions?: {
      onlySelf?: boolean;
      emitEvent?: boolean;
    }
  ): void {
    const deserializedValue: Record<keyof FormType, any> =
      this.deserializePayload(payload);
    this.form.patchValue(deserializedValue, formOptions && formOptions);
    this.initialFormValue = deserializedValue;
  }

  public patchFormValue(
    formValue: Record<keyof FormType, any>,
    formOptions?: {
      onlySelf?: boolean;
      emitEvent?: boolean;
    }
  ): void {
    this.form.patchValue(formValue, formOptions && formOptions);
  }

  public getFormValue(): Payload {
    return this.serializeFormValue(
      this.form.value as Record<keyof FormType, any>
    );
  }

  public isViewDirty(): boolean {
    const initialFormValue: string | null = this.initialFormValue
      ? JSON.stringify(this.initialFormValue)
      : null;
    const consequentFormValue: string | null = JSON.stringify(
      this.form.getRawValue()
    );
    return initialFormValue !== consequentFormValue;
  }
  public setIsFormDisabled(isDisabled: boolean): void {
    if (isDisabled) {
      this.form.disable({ emitEvent: false });
    } else {
      this.form.enable({ emitEvent: false });
    }
  }

  protected abstract deserializePayload(
    payload: Payload
  ): Record<keyof FormType, any>;

  protected abstract serializeFormValue(
    formValue: Record<keyof FormType, any>
  ): Payload;
}
