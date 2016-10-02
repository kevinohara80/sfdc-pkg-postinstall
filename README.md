# sfdc package postinstall

This is a postinstall script to be included in you Salesforce packages 
that you want to publish on npm.

## Getting Started

Usage:

Inside of your Salesforce package project that you want to publish to npm, 
initialize a `package.json` by running `npm init` or creating a `package.json`
file manually.

```bash
$ npm init
```

Next install this postinstall script as a `dependency` using `--save`. It's 
very important that you install this as a `dependency` and not a `devDependency`
because it needs to be installed when your package is installed.

```bash
$ npm install --save sfdc-pkg-postinstall
```

Now we need to add a simple postinstall script to the `package.json` scripts
hash. Here is what needs to be added.

```json
"postinstall": "node -e \"require('sfdc-pkg-postinstall').install()\""
```

Make sure you add the following keyword as one of your package's keywords. 
This will be used to facilitate easy searching for salesforce packages.

```json
keywords: ["sfdc-package"]
```

Now you can publish your package to npm and install it in another project!

Check out my [sfdc-trigger-framework project](https://github.com/kevinohara80/sfdc-trigger-framework) 
for an example of how this is accomplished. You can also check out the `package.json`
in that project for a full working example.

## Requirements

* In this initial version, your salesforce metadata must be in a `src`
directory and your subsequent folder structure should match what's returned
from the metadata api. For example, Apex Classes should be in `/src/classes`.

## Important Notes

* __THIS IS AN EXPERIMENTAL PROJECT__ - use at your own discretion. Also,
help me out by contributing!
* This script merges files into your project's `src` directory upon
install. __This is DESTRUCTIVE__. Use version control and make sure you
know what you're doing.
* Salesforce code cannot be namespaced unless in a managed package. 
Therefore, __name collisions on metadata files can occurr__. For example, 
you may have an Apex class called `MyClass.cls`. If you `npm install` 
a salesforce package that also has a class called `MyClass.cls`,
it will overwrite yours. 
* This does not deploy any code upon install. It simply merges the code
into your projects `src` dir. You can use something like
[dmc](https://github.com/kevinohara80/dmc) to deploy your code or other
common IDE's and tools like MavensMate.


