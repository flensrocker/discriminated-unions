export type DynFormTextFieldType = 'TEXT';
export type DynFormNumberFieldType = 'NUMBER';
export type DynFormDropdownFieldType = 'DROPDOWN';

export type DynFormSelectFieldOption = Readonly<{
  label: string;
  value: unknown;
}>;

export type DynFormTextField = Readonly<{
  type: DynFormTextFieldType;
  key: string;
  label: string;
  validators?: Readonly<
    Partial<{
      required: boolean;
      minLength: number;
      maxLength: number;
    }>
  >;
}>;

export type DynFormNumberField = Readonly<{
  type: DynFormNumberFieldType;
  key: string;
  label: string;
  validators?: Readonly<
    Partial<{
      required: boolean;
      min: number;
      max: number;
    }>
  >;
}>;

export type DynFormDropdownField = Readonly<{
  type: DynFormDropdownFieldType;
  key: string;
  label: string;
  options: readonly DynFormSelectFieldOption[];
  validators?: Readonly<
    Partial<{
      required: boolean;
    }>
  >;
}>;

export type DynFormField =
  | DynFormTextField
  | DynFormNumberField
  | DynFormDropdownField;

export type DynFormGroup = Readonly<{
  key: string;
  items: readonly DynFormField[];
}>;

const nameField: DynFormField = {
  type: 'TEXT',
  key: 'name',
  label: 'Name',
  validators: {
    min: 3,
  },
};

const addressKindField: DynFormField = {
  type: 'DROPDOWN',
  key: 'addressKind',
  label: 'Kind of address',
};
