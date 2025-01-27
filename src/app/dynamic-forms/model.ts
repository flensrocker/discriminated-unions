export type NonEmptyArray<T> = readonly [T, ...T[]];

export type WithType<TType extends string> = Readonly<{
  type: TType;
}>;

export type WithKey = Readonly<{
  key: string;
}>;

export type WithLabel = Readonly<{
  label: string;
}>;

export type DynFormTextField = Readonly<
  WithType<'TEXT'> &
    WithKey &
    WithLabel & {
      validators?: Partial<
        Readonly<{
          required: boolean;
          minLength: number;
          maxLength: number;
        }>
      >;
    }
>;

export type DynFormNumberField = Readonly<
  WithType<'NUMBER'> &
    WithKey &
    WithLabel & {
      validators?: Partial<
        Readonly<{
          required: boolean;
          min: number;
          max: number;
        }>
      >;
    }
>;

export type DynFormSelectFieldOption = Readonly<
  WithLabel & {
    value: unknown;
  }
>;

export type DynFormSelectField = Readonly<
  WithType<'DROPDOWN'> &
    WithKey &
    WithLabel & {
      options: NonEmptyArray<DynFormSelectFieldOption>;
      validators?: Partial<
        Readonly<{
          required: boolean;
        }>
      >;
    }
>;

export type DynFormGroup = Readonly<
  WithType<'GROUP'> &
    WithKey & {
      items: readonly DynFormItem[];
    }
>;

export type DynFormField =
  | DynFormTextField
  | DynFormNumberField
  | DynFormSelectField;

export type DynFormItem = DynFormField | DynFormGroup;
