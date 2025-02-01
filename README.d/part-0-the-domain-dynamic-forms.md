# Part 0: The Domain "Dynamic Forms"

First things first: This will not be a "full featured" dynamic forms module.
It will be some "minimal valuable product" (MVP) to explain, how we can use the type system and especially discrimintated unions, to support our users.

Theses are the requested features:

- Define a form with a serializable data structure,
- Provide different kind of fields:
  - single line text,
  - number inputs,
  - dropdown menu of a list of provided options,
- Define some validators on the fields like "required" (all), "maxLength", "minLength" (text), "min", "max" (numbers),
- Define groups of fields, which should be able to contain subgroups,
- Groups and fields have a "key", which will be the name of the property in the form's value,
- Fields have a "label" for display,
- Create an Angular/Forms `FormGroup` from the data structure,
- Provide a component to visualize the form (in a simple layout - designing forms is a topic on its own),

The "dynamic" in the domain relate to "dynamically create the needed components to display the form".
It's not meant as "dynamically change the form while it is displayed".
That's also an interesting topic, but not part of these lessons.

At this point I want to shout out a huge "Thank you!" to Bonnie from Tech Stack Nation for introducing me to this domain and encouraging me to implement it by myself!

## The Strategy

When implementing a domain, each developer has different strategies of how to approach it.
Some are more used to "top down", others are thinking "bottom up".
In reality it will be always both ways and we need to jump around on different levels of the code until it's finally "finished".

This documentation will use a "bottom up" approach.
We will start with the "types" of the input to our library.
This is usually the first thing our users encounter.
After designing the types we will implement the neccessary functions to convert them into something we can use in our application.
In this example that will be the `FormGroup` from the Angular framework.
And finally we will reach "the top" where we will visualize the form on the page with the help of a  component.
Of course it will expose some API to react to changes of the status or value and submitting the form.

- Create the `DynFormGroup`,
- Derive a `FormGroup` from it,
- Create a component `<dyn-form [form]="myDynForm">` for displaying it,
- Utilize the outputs of the component.

## Immutability

The input data of our library will be shared across multiple functions and components.
When sharing data in different parts of your application, it's usually easier to reason about that, when the data is immutable.
This means, once the data is created, it can never be mutated afterwards.
At first glance this may seem limiting.
But when the application grows it's reasonable to separate the data from the mutation of that data and how to communicate these changes throughout the app.

The current tool for communicating state changes are signals.
They will be used in the upcoming code, so a basic understanding of them is presumed.
One key to using signals "the right way" is, that the signal's value is changed in a way, the signal can detect and understand the change.
Otherwise it won't be able to notify the derived signals of the change.

The easiest way to achieve this is using an immutable object.
When such an object has to be changed, it's only possible to create a new object, copy all the values which should be preserved, and change those which have to be mutated.
For this the [spread operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax) is the perfect tool.
Creating a new object for every change will enable the signals to always detect the change.

TypeScript provides the [`Readonly<T>` utility type](https://www.typescriptlang.org/docs/handbook/utility-types.html#readonlytype) for a simpler definition of immutable types.
You will see that a lot in this documentation.
Be aware that this is not a recursive type, it will only mark the direct properties of the given type as `readonly`.
When nesting types we need to take care of that by ourselfs.

## "Make illegal states unrepresentable"

When we define some "state" (which is "just" some piece of data), we should be guided, which properties on the state must be given,
which are optional, and what kind of value they should (or must) contain.
And, of course, what values are not allowed.

As an example, if you want to define a "maxLength" validator on a text input, the maximum length should be a number and not a string or (even worse) a date.
And on the other hand a "maxLength" validator makes no sense on a number input.
We may want some "max" validator to limit the range of numbers which are allowed to enter.

In the first part we will learn how to use the rich type system of TypeScript to express the dynamic structure of different kinds of fields inside a form.

➡️ [Part 1: What is a Discriminated Union?](part-1-what-is-a-discriminated-union.md)
