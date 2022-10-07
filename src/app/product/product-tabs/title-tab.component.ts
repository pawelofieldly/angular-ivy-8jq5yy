import { Component, inject } from '@angular/core';
import { AbstractFormViewComponent } from '../../form-view/abstract-form-view.component';
import {
  ITitleTabForm,
  ITitleTabPayload,
  TitleTabService,
} from './title-tab.service';

@Component({
  selector: 'app-title-tab',
  template: `
    <div [formGroup]="form">
      <label for="title">Product title</label><br>
      <input id="title" formControlName="title">
    </div>
  `,
})
export class TitleTabComponent extends AbstractFormViewComponent<
  ITitleTabForm,
  ITitleTabPayload
> {
  constructor() {
    super(inject(TitleTabService));
  }
}
