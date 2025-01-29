import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import type { DynFormGroup } from './dynamic-forms';

const exampleForm: DynFormGroup = {
  type: 'GROUP',
  key: 'profile',
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
