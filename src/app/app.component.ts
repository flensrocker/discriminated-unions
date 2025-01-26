import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { DynFormItem } from './dynamic-forms';

const form: DynFormItem = {
  key: 'address',
  items: [
    {
      key: 'name',
      label: 'Name',
    },
    {
      key: 'yearOfBirth',
      label: 'Year of birth',
    },
    {
      key: 'kind',
      label: 'Kind',
      options: [
        {
          label: 'Shipping',
          value: 'SHIPPING',
        },
        {
          label: 'Billing',
          value: 'BILLING',
        },
      ],
    },
  ],
};

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
})
export class AppComponent {}
