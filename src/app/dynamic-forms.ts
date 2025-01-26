export type DynFormTextField = Readonly<{
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
  key: string;
  label: string;
  options: readonly DynFormSelectFieldOption[];
  validators?: Partial<
    Readonly<{
      required: boolean;
    }>
  >;
}>;

export type DynFormGroup = Readonly<{
  key: string;
  items: readonly DynFormItem[];
}>;

export type DynFormField =
  | DynFormTextField
  | DynFormNumberField
  | DynFormSelectField;

export type DynFormItem = DynFormField | DynFormGroup;
