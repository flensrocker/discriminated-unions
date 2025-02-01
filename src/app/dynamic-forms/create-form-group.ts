import { AbstractControl, FormControl, FormGroup } from '@angular/forms';

import type {
  DynFormDropdownField,
  DynFormGroup,
  DynFormItem,
  DynFormItemType,
  DynFormNumberField,
  DynFormTextField,
  WithType,
} from './model';

type CreateItemControlFn<TItem extends DynFormItem> = (
  item: TItem
) => AbstractControl;

type CreateItemControlFnMap = Readonly<{
  [TType in DynFormItemType]: CreateItemControlFn<
    Extract<DynFormItem, WithType<TType>>
  >;
}>;

const createTextFieldControl: CreateItemControlFn<DynFormTextField> = (
  textField: DynFormTextField
) => {
  // TODO add validators
  const textControl = new FormControl('', { nonNullable: true });
  return textControl;
};

const createNumberFieldControl: CreateItemControlFn<DynFormNumberField> = (
  numberField: DynFormNumberField
) => {
  // TODO add validators
  const numberControl = new FormControl(0, { nonNullable: true });
  return numberControl;
};

const createDropdownFieldControl: CreateItemControlFn<DynFormDropdownField> = (
  dropdownField: DynFormDropdownField
) => {
  // TODO add validators
  const dropdownControl = new FormControl<unknown>(null);
  return dropdownControl;
};

const createGroupControl = (group: DynFormGroup): AbstractControl => {
  const formGroup = new FormGroup({});
  addItems(formGroup, group.items);
  return formGroup;
};

const addItemMap: CreateItemControlFnMap = {
  TEXT: createTextFieldControl,
  NUMBER: createNumberFieldControl,
  DROPDOWN: createDropdownFieldControl,
  GROUP: createGroupControl,
};

const addItems = (
  parentFormGroup: FormGroup,
  items: readonly DynFormItem[]
) => {
  items.forEach((item) => {
    const addItemFn = addItemMap[
      item.__type__
    ] as CreateItemControlFn<DynFormItem>;
    const itemControl = addItemFn(item);
    // TODO or add validators here?
    parentFormGroup.addControl(item.key, itemControl);
  });
};

export const createFormGroup = (dynFormGroup: DynFormGroup): FormGroup => {
  const rootFormGroup = new FormGroup({});
  addItems(rootFormGroup, dynFormGroup.items);
  return rootFormGroup;
};
