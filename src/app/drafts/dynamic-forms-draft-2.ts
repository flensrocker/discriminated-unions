export type DynFormDropdownOption = Readonly<{
  label: string;
  value: unknown;
}>;

export type DynFormTextField = Readonly<{
  type: 'TEXT';
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
  type: 'NUMBER';
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
  type: 'DROPDOWN';
  key: string;
  label: string;
  options: readonly DynFormDropdownOption[];
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
