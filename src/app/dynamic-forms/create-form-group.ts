import { FormControl, FormGroup } from '@angular/forms';

import type {
  DynFormDropdownField,
  DynFormGroup,
  DynFormItem,
  DynFormNumberField,
  DynFormTextField,
} from './model';

const assertNever = (item: never, message: string): void => {
  console.error(message, item);
};

const addTextField = (
  parentFormGroup: FormGroup,
  textField: DynFormTextField
): void => {
  // TODO add validators
  const textControl = new FormControl('', { nonNullable: true });
  parentFormGroup.addControl(textField.key, textControl);
};

const addNumberField = (
  parentFormGroup: FormGroup,
  numberField: DynFormNumberField
): void => {
  // TODO add validators
  const numberControl = new FormControl(0, { nonNullable: true });
  parentFormGroup.addControl(numberField.key, numberControl);
};

const addDropdownField = (
  parentFormGroup: FormGroup,
  dropdownField: DynFormDropdownField
): void => {
  // TODO add validators
  const dropdownControl = new FormControl<unknown>(null);
  parentFormGroup.addControl(dropdownField.key, dropdownControl);
};

const addGroup = (parentFormGroup: FormGroup, group: DynFormGroup): void => {
  const formGroup = new FormGroup({});
  addItems(formGroup, group.items);
  parentFormGroup.addControl(group.key, formGroup);
};

const addItems = (
  parentFormGroup: FormGroup,
  items: readonly DynFormItem[]
): void => {
  items.forEach((item) => {
    switch (item.__type__) {
      case 'TEXT':
        addTextField(parentFormGroup, item);
        break;
      case 'NUMBER':
        addNumberField(parentFormGroup, item);
        break;
      case 'DROPDOWN':
        addDropdownField(parentFormGroup, item);
        break;
      case 'GROUP':
        addGroup(parentFormGroup, item);
        break;
      default:
        assertNever(item, `Unknown item type: ${item}`);
        break;
    }
  });
};

export const createFormGroup = (dynFormGroup: DynFormGroup): FormGroup => {
  const rootFormGroup = new FormGroup({});
  addItems(rootFormGroup, dynFormGroup.items);
  return rootFormGroup;
};
