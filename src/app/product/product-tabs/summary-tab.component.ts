import { Component, inject } from '@angular/core';
import { AbstractFormViewComponent } from '../../form-view/abstract-form-view.component';
import {
  ISummaryTabForm,
  ISummaryTabPayload,
  SummaryTabService,
} from './summary-tab.service';

@Component({
  selector: 'app-summary-tab',
  template: `
    <div [formGroup]="form">
      <div>
        <label for="isActive">Is active: </label>
        <input id="isActive" formControlName="isActive" type="checkbox">
      </div>

      <div>
        <label for="isDiscountEnabled">Is discount enabled: </label>
        <input id="isDiscountEnabled" formControlName="isDiscountEnabled" type="checkbox">
      </div>
    </div>
  `,
})
export class SummaryTabComponent extends AbstractFormViewComponent<
  ISummaryTabForm,
  ISummaryTabPayload
> {
  constructor() {
    super(inject(SummaryTabService));
  }
}
