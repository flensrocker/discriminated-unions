# Part 0: Introduction

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

## The Domain: Dynamic Forms

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

## Core Concepts

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

➡️ [Part 1: What is a Discriminated Union?](part-1-what-is-a-discriminated-union.md)
