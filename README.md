# generator-tfountain-webstack

This is a [Yeoman](http://yeoman.io/) generator that scaffolds out a ready-to-hack web frontend with Typescript and React for components, Less for styles, and webpack for building. Think Create React App, but customised for a specific toolset and without all the hand-holding.

## Getting Started

Install Yeoman via yarn, or npm, or whatever JS package manager is hot this week:

    $ yarn global add yo

Once you've got Yeoman set up, install this generator:

    $ yarn global add generator-tfountain-webstack

Create the directory in which your new project will live, then call Yeoman to scaffold out your project:

    $ mkdir awesome-app
    $ cd awesome-app
    $ yo tfountain-webstack

Answer a couple of easy questions, and you'll be greeted with a ready-to-rock project. Open the directory up in your editor of choice (I like [VS Code](https://code.visualstudio.com/)), fire up your terminal, and start a dev server with `yarn start`.

## Batteries Included

* **Typescript 3.x** -- For those of us who prefer a little C# in our JS.
* **Webpack 4.x** -- You prefer Rollup? Browserify? Parcel? Gulp? Grunt? _(!?)_ Great! I prefer Webpack.
* **Less** -- Writing straight CSS is madness, and Sass is just too much of a good thing.
* **React 16.x** -- It's dangerous to go alone. Here, take all of Facebook's domain knowledge and best practices with you.