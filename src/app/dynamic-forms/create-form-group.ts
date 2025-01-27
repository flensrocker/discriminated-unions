import { FormGroup } from '@angular/forms';

import { DynFormGroup } from './model';

export const createFormGroup = (dynFormGroup: DynFormGroup): FormGroup => {
  const rootFormGroup = new FormGroup({});
  // TODO create controls for items
  return rootFormGroup;
};
