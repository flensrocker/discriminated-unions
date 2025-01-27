export type DynFormSelectFieldOption = Readonly<{
  label: string;
  value: unknown;
}>;

export const enum DynFormFieldType {
  TEXT = 0,
  NUMBER = 1,
  DROPDOWN = 2,
}

export type DynFormField = Readonly<{
  type: DynFormFieldType;
  key: string;
  label: string;
  options?: readonly DynFormSelectFieldOption[];
  validators?: Readonly<
    Partial<{
      required: boolean;
      minLength: number;
      maxLength: number;
      min: number;
      max: number;
    }>
  >;
}>;

export type DynFormGroup = Readonly<{
  key: string;
  items: readonly DynFormField[];
}>;

const nameField: DynFormField = {
  type: DynFormFieldType.TEXT,
  key: 'name',
  label: 'Name',
  validators: {
    min: 3,
  },
};

const addressKindField: DynFormField = {
  type: DynFormFieldType.DROPDOWN,
  key: 'addressKind',
  label: 'Kind of address',
};
