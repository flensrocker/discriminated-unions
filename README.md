# Domain Modeling with TypeScript

## Table of Contents

- [Part 0: Introduction](README.d/part-0-the-domain-dynamic-forms.md)
- [Part 1: What is a Discriminated Union?](README.d/part-1-what-is-a-discriminated-union.md)
- [Part 2: Create the `FormGroup`](README.d/part-2-create-the-form-group.md)

## Preamble

Code written by library authors is intended for use by other developers accross multiple applications.
Libraries must provide instructions so that the developers know how to implement them properly.
Writing good and understandable documentation is a skill on its own.
And depending on how fast or huge the library grows, maintaining "the docs" often becomes a cumbersome, sometimes even an abandoned task.

One key concept of domain modeling is

> **Make illegal states unrepresentable.**

What this means is, that it should be impossible to write code, which will produce errors later at runtime.
[TypeScript](https://www.typescriptlang.org/) is an excellent tool for this, enabling us to define what our code expects as input and how the shape of the output will look like.
Users of our library will get an immediate feedback (red squiggly lines FTW!), if the code they are writing is valid at all.
Combined with the right amount of inline comments, which are often shown by tools like IntelliSense etc., the "real documentation" can be reduced to the neccessary amount of text.
The shorter it is, the easier the maintainance is.
And the propability that someone will read it, increases dramatically.

We all know: **TL;DR!**

Over the years I encoutered various patterns of how code can be structured.
In this documentation I will show how all those patterns work together, making my life as a maintainer easier - and helping the users of my code (myself included!) to do "The Right Thing".

And yes, I'm aware that these documents are not "short" - but I assure you, they're as short as possible.
Or at least as I'm capable of keeping them as short as I can... 😎

Have fun! 😀
