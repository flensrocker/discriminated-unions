import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import type { DynFormGroup } from './dynamic-forms';

const myForm: DynFormGroup = {
  __type__: 'GROUP',
  key: 'myForm',
  items: [
    {
      __type__: 'TEXT',
      key: 'name',
      label: 'Name',
      validators: {
        
      }
    },
  ],
};






const exampleForm: DynFormGroup = {
  __type__: 'GROUP',
  key: 'profile',
  items: [
    {
      __type__: 'TEXT',
      key: 'name',
      label: 'Name',
      validators: {
        required: true,
      },
    },
    {
      __type__: 'GROUP',
      key: 'address',
      items: [
        {
          __type__: 'TEXT',
          key: 'street',
          label: 'Street',
        },
        {
          __type__: 'TEXT',
          key: 'zipCode',
          label: 'ZIP Code',
        },
        {
          __type__: 'TEXT',
          key: 'city',
          label: 'City',
        },
        {
          __type__: 'TEXT',
          key: 'country',
          label: 'Country',
        },
      ],
    },
    {
      __type__: 'NUMBER',
      key: 'yearOfBirth',
      label: 'Year of birth',
    },
    {
      __type__: 'DROPDOWN',
      key: 'favouriteEditor',
      label: 'Favourite Editor',
      options: [
        {
          label: 'vim',
          value: 'VIM',
        },
        {
          label: 'Emacs',
          value: 'EMACS',
        },
        {
          label: 'VS Code',
          value: 'VSCODE',
        },
        {
          label: 'Webstorm',
          value: 'WEBSTORM',
        },
        {
          label: 'Other',
          value: 'OTHER',
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
