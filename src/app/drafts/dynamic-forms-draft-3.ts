export type NonEmptyArray<T> = readonly [T, ...T[]];

export type WithType<TType extends string> = Readonly<{
  /**
   * Choose the type of your form item
   */
  __type__: TType;
}>;

export type WithKey = Readonly<{
  /**
   * Used as the key inside the parent's group value.
   */
  key: string;
}>;

export type WithLabel = Readonly<{
  /** Label of your item or option, only used in the UI */
  label: string;
}>;

export type RequiredValidator = Readonly<{
  /** Set to true if this item must not be empty */
  required: boolean;
}>;

export type DynFormTextField = Readonly<
  WithType<'TEXT'> &
    WithKey &
    WithLabel & {
      /** Define different validation rules for your form item */
      validators?: Partial<
        Readonly<
          RequiredValidator & {
            /** Specify the minimum needed length */
            minLength: number;
            /** Specify the maximum allowed length */
            maxLength: number;
          }
        >
      >;
    }
>;

export type DynFormNumberField = Readonly<
  WithType<'NUMBER'> &
    WithKey &
    WithLabel & {
      /** Define different validation rules for your form item */
      validators?: Partial<
        Readonly<
          RequiredValidator & {
            /** Specify the minimum needed value */
            min: number;
            /** Specify the maximum allowed value */
            max: number;
          }
        >
      >;
    }
>;

export type DynFormDropdownOption = Readonly<
  WithLabel & {
    /** Use any value you like, it will be passed through to the item's value */
    value: unknown;
  }
>;

export type DynFormDropdownField = Readonly<
  WithType<'DROPDOWN'> &
    WithKey &
    WithLabel & {
      /** A non empty list of options displayed in the dropdown list */
      options: NonEmptyArray<DynFormDropdownOption>;
      /** Define different validation rules for your form item */
      validators?: Partial<Readonly<RequiredValidator>>;
    }
>;

export type DynFormGroup = Readonly<
  WithType<'GROUP'> &
    WithKey & {
      /** A non empty list of form items inside this group */
      items: NonEmptyArray<DynFormItem>;
    }
>;

export type DynFormField =
  | DynFormTextField
  | DynFormNumberField
  | DynFormDropdownField;

export type DynFormItem = DynFormField | DynFormGroup;
