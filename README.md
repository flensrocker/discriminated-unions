# Domain Modeling with TypeScript

**TODO:** table of contents (links to different parts)

## Part 0: Introduction

Let's say we want to write some library, which should be used in multiple applications by different developers.
Of course it must be well documented, so the other developers never need to reach out to you to explain, how your library should be used.
But let's be honest, we, as developers, are mostly just stumbling around and try to find out...
Documentation? Yeah, I will read that later... 😎

The best way would be, if our library would just "explain itself".
And to achieve that, we can use TypeScript with its rich type system, so that our users are unable to make any mistakes.
We will utilize TypeScript as some kind of unit test for our code.
If we define some data, which is not in the shape we need, TypeScript should fail to "test" (aka compile or transpile) our code.
After all one key concept of domain modeling is:

> Make illegal states unrepresentable.

So what does that actually mean?

Because everything is easier to understand when some examples are provided, let's first pick a domain.

### The Domain: Dynamic Forms

​In this article this will not be a "full featured" dynamic forms module.
It will be some "minimal valuable product" (MVP) to explain, how we can use the type system and especially discrimintated unions, to make our users happy.

Features:

- Define a form with a (serializable) data structure,
- Provide different kind of fields: single line text, number, dropdown of a list of provided options,
- Define some validators on the fields like "required" (all), "maxLength", "minLength" (text), "min", "max" (numbers),
- Define groups of fields, which should be able to contain subgroups,
- Groups and fields have a "key", which will be the name of the property in the form's value,
- Fields have a "label" for display,
- Create a `FormGroup` (`@angular/forms`) from the data structure,
- Provide a component to visualize the form,

And be warned: this will not be about design.
It will look horrible.
We will focus on the code, not the UI. 🙈

At this point I want to shout out a huge "Thank you!" to Bonnie from Tech Stack Nation for introducing me to this domain and encouraging me to implement it by myself!

### Core Concepts

Back to "Make illegal states unrepresentable".

When we define some "state" (which is "just" some piece of data), we should be guided, which properties on the state must be given,
which are optional, and what kind of value they should (or must) contain.
And, of course, what values are not allowed.

As an example, if you want to define a "maxLength" validator on a text input, the maximum length should be a number and not a string or (even worse) a date.
You can go one step further and say, it should be a positive number.
But in this article it's not about the magic you have to use, to define a type which represents only positive numbers.
We want to explore discriminated unions.
So let's focus again...

...after some other distraction.

Another topic, which is not part of this article, is: **Immutability**

I will define all types with this in mind using the `Readonly<T>` utility type of TypeScript.
I find it way easier to reason about the code and shared data, if the data can not be mutated directly.
If you need to mutate it, nowadays you should be thinking about signals.

So - back to topic!

## Part 1: What is a Discriminated Union?

To understand discriminated unions we have to go back to school, when we learned about set theory.
But don't worry!
I will give you a brief overview, what that's all about.
And with your background as a developer, nothing will be really new for you.

A set is a collection of elements, which share some common characteristics.
This could be a color or shape or any other kind of property.

Some element can be included in different sets at the same time.
Say we have the set `A` of "things colored red" and another set `B` of "things with tires".
Then a red bike will be part of both sets, but a green one is only an element of set `B`.
And a red hat is in set `A`, but not `B`.

You can do different operations on sets.
The most common ones are "union" and "intersection".

When we're are talking about the union of two sets `A` and `B`, then we mean all the elements, which are part of either set `A` **or** `B`.
And when we're are intersecting these two sets, we only want those elements, which are part of set `A` **and** `B` at the same time.

By the way, this is the reason, why union types are commonly represented with the pipe symbol `|`, because it's a widely used representation of the "or" operation.
And intersections use the more obvious symbol `&`.

But we're not only talking about "unions", the subject of interest is "discriminated union".

First, in this context the word "discriminated" really means "distinguishable" - and here it's not something bad.
When we get some object and we know, it's either in set `A` or in set `B`, we need some property on that object, so we can definitely distinguish, in which of the sets it really is.
Otherwise we don't know if the operation, we want to do with that object, is allowed or not.

Let's explore this with our example domain.

### First draft of the types

So let's just sketch some types.

Every field has some key and label.
And if it's a dropdown, it must have a list of options.
But since a text or number field doesn't have options, it must be optional.
By the way, an option consists of a label and some value with a type, that's not really important for us (remember: MVP).
And if we don't know the type, it's `unknown` (don't make me talk about `any`, that's out of the scope of this document 🫣).

And then there are the validators.
All field types can be "required", but only the text fields have a "minLength" and/or "maxLength".
And the number fields can be limited by a "min" and/or "max" value.

```ts
type DynFormSelectFieldOption = Readonly<{
  label: string;
  value: unknown;
}>;

const enum DynFormFieldType {
  TEXT = 0,
  NUMBER = 1,
  DROPDOWN = 2,
}

type DynFormField = Readonly<{
  __type__: DynFormFieldType;
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

type DynFormGroup = Readonly<{
  key: string;
  items: readonly DynFormField[];
}>;
```

These types will totally work.
But when you use them you have to know some of the details.
What's wrong with the following declarations?

```ts
const addressKindField: DynFormField = {
  __type__: DynFormFieldType.DROPDOWN,
  key: "addressKind",
  label: "Kind of address",
};

const nameField: DynFormField = {
  __type__: DynFormFieldType.TEXT,
  key: "name",
  label: "Name",
  validators: {
    min: 3,
  },
};
```

The first one is obvious.
If we declare a dropdown field, we have to provide the options.
But nothing forces us to really define them.
At runtime we will see an empty dropdown list - something we want to avoid.

The second one is a bit trickier.
It represents a field for a name, and the name should contain at least three characters.
But we used the wrong validator!
It must be `minLength` and not `min` - that is only valid for number inputs.

> **Why `__type__` with underscores?**
>
> The "type" of the different objects, we will create, is not meant as a "value" property.
> It will be used to distinguish the different instances.
> And due to the underscores when using code completion, it will be at the top of the member list.
> It should be filled in first, to guide our users on the remaining properties, as we will see later.

### Second step: be more specific and combine later

Some words about enums.

If you use other languages like C/C++, C#, Java etc. you may be used to enums.
After all they are just names for some numbers, combined in some kind of namespace.
But in "TypeScript land" there're the ones who loves them, and on the other side the ones who hates them.
And both have valid reasons for their opinion.

In this example the `__type__` property is used as the discriminator between the different kinds of fields.
Oh wait - wasn't that what we wanted to explain further up?
It's so easy to get distracted.
But we will get to that in a second! 😂

Another convenient way of expressing an "enumeration of values" in TypeScript is a collection of "string literal types".
This means, that the actual type behind the values is `string`, but it can't be any string, it has to be some specific string.

```ts
type DynFormTextFieldType = "TEXT";
type DynFormNumberFieldType = "NUMBER";
type DynFormDropdownFieldType = "DROPDOWN";
```

This has two advantages.

First we don't have to remember magic numbers, when we define a field (ignoring the `enum` definition for now).
And second, when we get some object from an API, which should represent a field, and we log that to the console or inspect on the network tab, we see the value `"TEXT"` right there.
We don't have to remember the meaning behind the number `0` in our data.
Hm, only one advantage - we don't have to remember the meaing of magic numbers. 🤷

But back to our field types.

We have the "set of text fields", and another "set of number fields" and then a "set of dropdown fields".
When we build the union of these sets, we get the "set of fields", which contains all the different kinds of fields.

If we want to know what kind of field we actually have after we pick one, we have to look at its "discriminator", which is the `__type__` property.
It is something, every kind of field provides.
So we don't run into some kind of danger, if we access this property.
And depending on its value we know, what other properties are available.

And since we use immutable types we can inline the "magic type strings" in our field types.

```ts
type DynFormSelectFieldOption = Readonly<{
  label: string;
  value: unknown;
}>;

type DynFormTextField = Readonly<{
  __type__: "TEXT";
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

type DynFormNumberField = Readonly<{
  __type__: "NUMBER";
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

type DynFormDropdownField = Readonly<{
  __type__: "DROPDOWN";
  key: string;
  label: string;
  options: readonly DynFormSelectFieldOption[];
  validators?: Readonly<
    Partial<{
      required: boolean;
    }>
  >;
}>;
```

And finally we encounter our first discriminated union!

When we want to define the type for our `DynFormGroup`, we need our items to be of type `DynFormTextField` **or** `DynFormNumberField` **or** `DynFormDropdownField`.
And all those together is the wider type of a `DynFormField`.
And the "or" is telling us, that we need a union.

This is how it looks.

```ts
type DynFormField = DynFormTextField | DynFormNumberField | DynFormDropdownField;
```

And with this we can define our `DynFormGroup`.

```ts
type DynFormGroup = Readonly<{
  key: string;
  items: readonly DynFormField[];
}>;
```

Let's try our example definitions of our `nameField` and `addressKindField` from above.

```ts
const addressKindField: DynFormField = {
  __type__: "DROPDOWN",
  key: "addressKind",
  label: "Kind of address",
};
// Type '{ __type__: "DROPDOWN"; key: string; label: string; }' is not assignable to type 'DynFormField'.
// Property 'options' is missing in type '{ __type__: "DROPDOWN"; key: string; label: string; }'
// but required in type 'Readonly<{ __type__: "DROPDOWN"; key: string; label: string;
// options: readonly Readonly<{ label: string; value: unknown; }>[];
// validators?: Readonly<Partial<{ required: boolean; }>> | undefined; }>'.

const nameField: DynFormField = {
  __type__: "TEXT",
  key: "name",
  label: "Name",
  validators: {
    min: 3,
  },
};
// Type '{ __type__: "TEXT"; key: string; label: string; validators: { min: number; }; }' is not assignable to type 'DynFormField'.
// Types of property 'validators' are incompatible.
// Object literal may only specify known properties,
// and 'min' does not exist in type 'Readonly<Partial<{ required: boolean; minLength: number; maxLength: number; }>>'.
```

We have reached our first goal: TypeScript is yelling at us!

I admit, it doesn't do that in a nice or descriptive way and you really have to squint a bit to get the message.
But it is correct - so you better practice to read these kind of error messages.

In the first case it's complaining that it misses the `options` of the dropdown field.
And in the second case the `validators` object of a text field doesn't contain a `min` property.
We are told, what we've done wrong, but not neccessarily what we should have done.
Sometimes the key of understanding the error is at the beginning of the message, sometimes at the end.
And sometimes right in the middle.
Or everywhere.
The main thing is: there is an error, your data does not comply with the needed shape.

And this is, what we want to achieve: make illegal states unrepresentable!

A text field cannot have a `min` value (of course it can if we think about text ranges, but that range won't be defined with numbers!).
And when we define a dropdown field, we need to provide some options.

> Excursion: Technically we can provide an empty array of options.
> If you don't want that to be allowed, you can also use TypeScript with some selfmade utility type:
>
> `type NonEmptyArray<T> = readonly [T, ...T[]];`
>
> `options: NonEmptyArray<DynFormSelectFieldOption>;`
>
> Try to figure out on yourself, what is happening here!

### Third time is a recursion

We missed something from our domain so far.
A group should not only be able to hold a bunch of fields, but also subgroups (or nested groups).
As architects we usally avoid circular dependencies or (the bad type of) recursion.
But some domains in the real world are built upon such concepts.
Folders can contain files and also folders, which again can contain files and folders and so on.
Lucky for us TypeScript has no problems with recursive type definitions.

The hardest part is always to find the right name.
But as an experienced coder, we know what to do: just call it an "item". 🙃

The items of a `DynFormGroup` can be either a `DynFormField` **or** a `DynFormGroup` itself.
And there it is again: the "or".
And "or" means "union".

When we want to "unionize" the fields with the group, we have to remember, that we need a discriminator.
We chose the `__type__` with a string literal, so we don't really have to think about what to do.

```ts
type DynFormGroup = Readonly<{
  __type__: "GROUP";
  key: string;
  items: readonly DynFormItem[];
}>;

type DynFormItem = DynFormGroup | DynFormField;
```

It looks like we slowly get used to define DUs (a widely used abbreviation for discriminated unions).

### Intermission for Intersection

Looking at the current state of the types, we see some kind of repetition there.
We know we need the "type discriminator", which we called `__type__` and we distinct them by using different string literals as types.
But we must be careful, because in every type we add to the union, the discriminator must be written in the same way.
Misspelling `__type__` with `__tpye__` may not be obvious at first (but surely will be noticed at some later point), but we can do better.

Maybe you're a practiced OOP developer and the first thing, which comes to mind, is using some base class.
And in a OOP context that would be totally fine.
But here we're not really doing OOP (we don't use classes), so we need another way.

We are lucky, there is another concept we can use: **Composition over Inheritance**

Instead of inheriting from various base classes or interfaces, we will define some helper types.
We will then use them, to plug them all together to get the type we actually want.
For this we can use **intersections**, the "counterpart" to unions.

We want an object, which has a property called `__type__` and it should have a string literal as its type.
That's a perfect usecase for generic type in TypeScript.

```ts
type WithType<TType extends string> = Readonly<{
  __type__: TType;
}>;
```

The generic parameter `TType` must be some kind of string (it can be `string` or some literal like `"TEXT"` or even a union of string literals).
That will be used as the type for the property named `__type__`.

But how do we compose that with, say, the `DynFormGroup`?

Remember: intersection is **and**, so we use `&`.

```ts
type DynFormGroup = Readonly<
  WithType<"GROUP"> & {
    key: string;
    items: readonly DynFormItem[];
  }
>;
```

If you wonder: it doesn't matter, if you put that `WithType<...> &` inside the `Readonly` or before or after.
The type will always be the same.
But if you but it inside, the visualization of the type from the TS compiler will be more readable.

We can apply this also to the different fields.
We can now be sure, that the discriminator `__type__` will always have the same name in every type.
Nice!

All our `DynFormItem`s will also share the `key` property, so we can do something similar.
Only this time we don't need a generic parameter, because all of them will have the type `string`.

```ts
type WithKey = Readonly<{
  key: string;
}>;

type DynFormGroup = Readonly<
  WithType<"GROUP"> &
    WithKey & {
      items: readonly DynFormItem[];
    }
>;
```

If we want to write a function, which only operates on the key (don't ask, I just make things up as we're going),
then we can use that type for our arguments.
We don't care about other properties, only the `key`.

```ts
function doSomethingWithTheKey(item: WithKey): void {
  console.log(item.key);
}
```

This is what "composition over inheritance" looks like.

We use the "intersection", so all of our types share the same discriminator.
And when we put all those types into one union, we can be sure, we can distinguish them by the discriminator.

And there's one final property, we can extract: `required` inside the validators.

```ts
type RequiredValidator = Readonly<{
  required: boolean;
}>;
```

As an example, this is how our `DynFormTextField` looks like.
It's not that pretty, but it has its advantages.
As always it's a tradeoff.

```ts
export type DynFormTextField = Readonly<
  WithType<"TEXT"> &
    WithKey &
    WithLabel & {
      validators?: Partial<
        Readonly<
          RequiredValidator & {
            minLength: number;
            maxLength: number;
          }
        >
      >;
    }
>;
```

### Where are we now?

...TO BE CONTINUED...
