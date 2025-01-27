export type NonEmptyArray<T> = readonly [T, ...T[]];

export type DynFormTextField = Readonly<{
  type: 'TEXT';
  key: string;
  label: string;
  validators?: Partial<
    Readonly<{
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
  validators?: Partial<
    Readonly<{
      required: boolean;
      min: number;
      max: number;
    }>
  >;
}>;

export type DynFormSelectFieldOption = Readonly<{
  label: string;
  value: unknown;
}>;

export type DynFormSelectField = Readonly<{
  type: 'DROPDOWN';
  key: string;
  label: string;
  options: NonEmptyArray<DynFormSelectFieldOption>;
  validators?: Partial<
    Readonly<{
      required: boolean;
    }>
  >;
}>;

export type DynFormGroup = Readonly<{
  type: 'GROUP';
  key: string;
  items: readonly DynFormItem[];
}>;

export type DynFormField =
  | DynFormTextField
  | DynFormNumberField
  | DynFormSelectField;

export type DynFormItem = DynFormField | DynFormGroup;
