import { Component, inject } from '@angular/core';
import { AbstractFormViewComponent } from '../../form-view/abstract-form-view.component';
import {
  ClientTabService,
  IClientTabForm,
  IClientTabPayload,
} from './client-tab.service';

@Component({
  selector: 'app-client-tab',
  template: `
    <div [formGroup]="form">
      <label for="client">Client name</label><br>
      <input id="client" formControlName="client">
    </div>
  `,
})
export class ClientTabComponent extends AbstractFormViewComponent<
  IClientTabForm,
  IClientTabPayload
> {
  constructor() {
    super(inject(ClientTabService));
  }
}
