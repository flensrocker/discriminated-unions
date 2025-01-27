import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import type { DynFormGroup } from './dynamic-forms';

const exampleForm: DynFormGroup = {
  type: 'GROUP',
  key: 'address',
  items: [
    {
      type: 'TEXT',
      key: 'name',
      label: 'Name',
    },
    {
      type: 'NUMBER',
      key: 'yearOfBirth',
      label: 'Year of birth',
    },
    {
      type: 'DROPDOWN',
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
