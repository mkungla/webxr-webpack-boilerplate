# WebXR Webpack Boilerplate

**Starter Kit for building rich, immersive WebXR projects (featuring [A-Frame][aframe-link]) PWA with Webpack, Handlebars and SASS**

[![Project License][license-img]][license-link] [![A-Frame Version][aframe-img]][aframe-link]

## Introduction

The goal of WebXR Webpack Boilerplate is to provide a high-quality, high-performance code base to accelerate WebXR development and specially prototyping. It is designed to be flexible in order to support rapid implementation and customization within your project. — **take a look at [demo][demo-link]**  

> Personally I use this boilerplate mostly for quick prototyping WebXR ideas,  
while final product going to production may require major refactoring the code base.  
[@mkungla](https://github.com/mkungla)

**Project build status**

| Linux | macOS | Windows |
| --- | --- | --- |
| [![TravisCI Build Status][travis-img]][travis-link] | [![CircleCI Build Status][circleci-img]][circleci-link] | [![AppveyorCI Build Status][appveyor-img]][appveyor-link] |

[![Grade Badge][codacy-grade-img]][codacy-grade-link]
[![Coverage Badge][coverage-img]][coverage-link]
[![Dependencies][dep-status-img]][dep-status-link]
[![Dev Dependencies][devdep-status-img]][devdep-status-link]

- [Overview](#overview)
  * [Custom A-Frame Theme](#custom-a-frame-theme)
  * [Project structure](#project-structure)
- [Getting Started](#getting-started)
  * [Setup project based on this repository](#setup-project-based-on-this-repository)
    + [(option 1) Create fork to contribute back to this repository](#create-fork-to-contribute-back-to-this-repository)
    + [(option 2) Create new project based on this repository and keep commit history](#create-new-project-based-on-this-repository-and-keep-commit-history)
    + [(option 3) Create new project based on this repository without commit history](#create-new-project-based-on-this-repository-without-commit-history)
  * [Build and development server configuration](#build-and-development-server-configuration)
  * [First run](#first-run)  
- [Development](#development)
  * [Minimal example of app.js](#minimal-example-of-app-js)
  * [Example Addon](#example-addon)
  * [Add A-Frame components](#add-a-frame-components)
  * [Add 3rd party libraries](#add-3rd-party-libraries)
- [Build and deploy](#build-and-deploy)
  * [Static app](#static-app)
  * [Build and run Docker image](#build-and-run-docker-image)


## Overview
Here is overview of WebXR Webpack Boilerplate project and what's included.

### Custom A-Frame Theme

| red | blue | green | yellow |
| :---: | :---: | :---: | :---: |
| ![Theme red][screeenshot-theme-red] | ![Theme blue][screeenshot-theme-blue]  | ![Theme -green][screeenshot-theme-green]  | ![Theme yellow][screeenshot-theme-yellow] |

You can change A-Frame themes by modifying [./app.json](app.json) sassTheme property which sets SASS configuration  `$theme` variable

```json
// Color themes red !default, yellow, green, blue
{
    "sassTheme": "red"
}
```

if that property is not set then default theme is used in [src/style/_theme-vars.scss](src/style/_theme-vars.scss)

```scss
// Color themes red !default, yellow, green, blue
$theme: red !default;
```

---

### Project structure
Project `./src` contains some unnecessary files which are included for demo and example purposes. You can remove all of these files and associated references and imports from your project.

- **.circleci** [CircleCI][circleci-site] Continuous Integration and Delivery configurations, feel free to delete that if you dont use [CircleCI][circleci-site] as your CI provider. This project uses [CircleCI][circleci-site] for macOS builds.
- **.github** All Github related config files.
- **build** Build directory `yarn run build`.
- **devel** Development related files like webpack and project configuration files.
- **src** Project source files.
  - **hbs** Project handlebars templates
    - ***index.hbs*** outputs `./build/index.html`
    - **partials** handlebars partials used within views
      - **aframe** partials for A-Frame entities
      - **app** app partials
      - **html** common html partials like headrs and footers
      - **scenes** good place to put markup of your different WebXR scenes.

  - **js** Application javascript code and entry points
    - **aframe** A-Frame compnents,systems.shaders. Create your custom A-Frame components to this directory.
    - ***lib-aframe.js*** In this file you would import A-Frame, external npm components and also your custom components which will be bundled into one single file ensuring that your component registration is done right.
    - ***app.js*** Main app entrypoint. File where you configure the application, while you should avoid writing your application logic code there. Instead use [./src/js/application/addons](src/js/application/addons) for that. Take look at [Minimal example of app.js](#minimal-example-of-app-js)
    - **application** Application javascript code
      - **addons** Most of your application logic should be here in application addons. Take a look at [Example Addon](#example-addon)
      - **core** Application core most of cases you don't need to edit this code however if you find something add or enhance there please consider opening a pull request and contribute your modification to this project.
    - ***background.worker.js*** Background web Worker if you need to use one, which requires you do modifications in [./src/js/application/core/index.js](src/js/application/core/index.js) how your worker is behaving and change webpack config in [./devel/webpack/configure-app.js](devel/webpack/configure-app.js) to load and build that Worker correctly.
    - ***vendors.js*** In this file you would import all your external vendor dependencies `e.g. Lodash, jQuery etc.` If any of vendor libraries have embedded styles then these will be extracted to `./buid/app/css/vendors.css` so make sure that you import it in your handlebars header template used `e.g.` [./src/hbs/partials/html/header.hbs](src/hbs/partials/html/header.hbs) If you need to customize some vendor styles then use [./src/style/vendors/vendors-style.scss](src/style/vendors/vendors-style.scss) for that.
  - **pwa** Progressive Web App entrypoint, service worker and other PWA assets. Everything in this directory could be taken as independent app from main app and since the handlebars templates result html pages in `./build` root then you should make sure that you dont have conflicting file names which would result only one of them being created. If you want to change that behavior edit [./devel/webpack/configure-pwa.js](devel/webpack/configure-pwa.js) config. Also note that even though you can cross reference handlebar templates within webpack cross compiler you should try to avoid that and keep your partials related to views found in `./src/pwa` in `./src/pwa/pwa-partials`
    - ***logo.png*** Changing that logo will generate all the variations of your logo under `./build/assets/pwa/` using [webapp-webpack-plugin][webapp-webpack-plugin-link]
    - ***offline.js*** entrypoint you could use for app when application is offline.
    - ***offline.scss*** example offline style entry
    - **pwa-partials** handlebars partials related to views found in `./src/pwa`
  - **static** Static assets copied over to `./build/assets/static`. By default only `CopyWebpackPlugin` is used if you need more control edit [./devel/webpack/configure-static-assets.js](devel/webpack/configure-static-assets.js) config file.
    - **audio**
    - **images**
    - **models**
    - **video**
  - **style** Application style scss files
    - ***app.scss*** main app entrypoint
    - **theme** directory to contain your theme sass partials
      - ***_theme-base.scss*** theme base file, if that file grows to big separate your design into smaller partials under same directory and include these in [./src/style/app.scss](src/style/app.scss)
    - ***_theme-vars.scss*** scss file where you define your theme variables
    - **vendors** Vendor styles
      - ***vendors-style.scss*** vendor style entrypoint
- **tests** tests.
- **tmp** temporary and local files which are not tracked by git.

---

## Getting Started
instructions to set up your project

### Setup project based on this repository
Follow one of the 3 options below which suits best for your needs. Options below are shown for [github.com](github.com) public and private repositories, so if your project will be hosted elsewhere you know your self what you have to change.  

#### Create fork to contribute back to this repository
(option 1)

**First** Fork this repository in [github.com](https://github.com/digabrain/webxr-webpack-boilerplate)

**Next** navigate to directory where you keep your projects and set following temporary environment variables

```bash
cd <your-projects>
GITHUB_USERNAME="<github-username>"
```

**Next** clone full copy of this repository and set remotes to be able to sync your repository with upstream
```bash
git clone --origin github/"$GITHUB_USERNAME" git@github.com:$GITHUB_USERNAME/webxr-webpack-boilerplate.git
cd webxr-webpack-boilerplate
git remote add github/digaverse git@github.com:digaverse/webxr-webpack-boilerplate.git
```
<sup>and start hacking.</sup>

#### Create new project based on this repository and keep commit history
(option 2)

**First** navigate to directory you keep your projects and set following temporary environment variables

```bash
cd <your-projects>
GITHUB_USERNAME="<github-username>"
# PROJECT_NAME should be valid github repository name
PROJECT_NAME="<your-new-project-name>"
```

**Next** go and create new public or private repository under `$GITHUB_USERNAME` and set project name same as `$PROJECT_NAME`. While creating the repository make sure that no default files are created,

- unselect `Initialize this repository with a README `
- make sure that both `Add .gitignore and Add a license` are set to NONE  

**Next**

```bash
git clone --bare git@github.com:digaverse/webxr-webpack-boilerplate.git
cd webxr-webpack-boilerplate.git
git push --mirror git@github.com:$GITHUB_USERNAME/$PROJECT_NAME.git
cd ..
rm -rf webxr-webpack-boilerplate.git
git clone --origin github/"$GITHUB_USERNAME" git@github.com:$GITHUB_USERNAME/$PROJECT_NAME.git
```

<sup>and start hacking.</sup>

##### Create new project based on this repository without commit history
(option 3)

**First** navigate to directory you keep your projects and set following temporary environment variables

```bash
cd <your-projects>
GITHUB_USERNAME="<github-username>"
# PROJECT_NAME should be valid github repository name
PROJECT_NAME="<your-new-project-name>"
```

**Next** go and create new public or private repository under `$GITHUB_USERNAME` and set project name same as `$PROJECT_NAME`. While creating the repository make sure that no default files are created,

- unselect `Initialize this repository with a README `
- make sure that both `Add .gitignore and Add a license` are set to NONE  

```bash
git clone --depth=1 git@github.com:digaverse/webxr-webpack-boilerplate.git $PROJECT_NAME
cd "$PROJECT_NAME"
rm -rf .git
git init
git add -A && git commit -m"initial commit"
git remote add github/"$GITHUB_USERNAME" git@github.com:$GITHUB_USERNAME/$PROJECT_NAME.git
git push -u github/"$GITHUB_USERNAME" master
```

<sup>and start hacking.</sup>

---

### Build and development server configuration

Most of build and configuration options can be set in [./app-dev.json](app-dev.json), but if you need more control or customization look into config files in [./devel](devel) directory.

---

### First run

make sure you have [yarn](https://yarnpkg.com/lang/en/docs/install/) installed, alternately you can use `npm` command instead `yarn`

```bash
# copy app-dev.json
cp example.app-dev.json app-dev.json
# copy  app.json
cp example.app.json app.json
# install and setup
yarn install
yarn run setup # first time run generates SSL certificates so we can serve https and http2 locally
yarn build # creates static assets under ./build directory
```

to start the dev server run

```bash
yarn start
```

You may need to update/rebuild static assets sometimes then just run `yarn run build` before `yarn start`.

And now open your browser https://localhost:9000 and accept self signed certificates.

---

## Development

application configuration file is [./app.json](app.json) all properties will be available within both in handlebars templates and `PROJECT.{property}` and in application/addon level `this.session.get('config').{property}` while most of webpack config is set in [./app-dev.json](app-dev.json). Keep in mind when you edit these files you have to restart development server in order these changes to take effect.


### Minimal example of app js

Here is minimal Example for [./src/js/app.js](src/js/app.js)

```javascript
/* global PROJECT */

import Application from './application/core'
// import application addons you want to register
// import yourAddon from './application/addons/your-addon'

const app = new Application(PROJECT)

// Reqister all application addons by calling registerAddon
// app.registerAddon(yourAddon, addonConfigObject)

// Start the application as soon as possible
app.start().then((log) => {
  log.debug('webapp is running callback')
}).catch((err) => {
  console.error(err)
})
```

Project is shipped with example adding controls to `start/stop/play/pause` application.
NOTE that application `start/stop/play/pause` does not affect A-Frame scene. If you wich to do so then you have to set `{"ppaframe": true}` in [./app.json](app.json). Also when you have page which does not have A-Frame scene but in header template you load `lib-aframe.js` then application will not play since A-Frame core system is paused when `<a-scene>` is not found, so you may better create different header file wich you include in pages which do not have a A-Frame scene so that application falls back to using `window.requestAnimationFrame`.

---

### Example Addon

Most of application logic is added to application by creating and registering Addons. bellow is outline of how to define your Addon.

```javascript
/* ./application/addons/your-addon */
export default {
  name: 'your-addon',
  // this addon will not be reqistered if aframe is not present on loaded page
  // default false
  aframeRequired: true,
  // You can set configuration defaults to your Addon here
  // or set that object as second parameter when you register
  // your Addon by calling app.registerAddon()
  data: {},

  setup() {
    // Called once when you register the Addon
    // Sets the data to values passed to registerAddon 2 param

    // Within addon following properties are set
    //
    // this.aframeRequired  - is aframe required
​    // this.enabled         - is addon enabled
​    // this.isPlaying       - is addon playing
    // this.name            - addon given name
    // this.data            - addon configuration  
​    // this.app             - reference to app
    //   this.app.session   - access application session
    //   this.app.store     - app localStorage
    //   this.app.addons['addon-name'] - access other registered addons
    //     ``
    // this.log             - gives named logger for current addon.
    //      Displaying these messages depends on
    //      your ./app.json setting which logLevel is set
    //        this.log.debug(args...)
    //        this.log.info(args...)
    //        this.log.ok(args...)
    //        this.log.warn(args...)
    //        this.log.error(args...)
  },

  start() {
    // Called every time when you start the application
    // and everytime when you call application start after stoping it.
  },

  play() {
    // Called every time when application play is called
  },

  pause() {
    // Called every time when application pause is called
  },

  tick() {
    // Called in every render loop when application is playing
  },

  dispose() {
    // Called when application stop is called.
    // Currently dispose does not delete this Addon
    // so calling application start after stop will call
    // this objects .start again, but not .setup .
    // This behavior may change in this project skeleton
    // in the future allowing you to dispose Addons on
    // run time and re register Addons on demand.
    // Therefore the name dispose instead of stop
    // which it is right now by behavior.
  }
}

```

----

#### Add A-Frame components

```
yarn add <some-aframe-component>
```
add import statement to [./src/js/lib-aframe.js](src/js/lib-aframe.js)

---

#### Add 3rd party libraries

```
yarn add <some-library>
```

if needed add import statement to [./src/js/vendors.js](src/js/vendors.js) if you want to bundle that dependency together with other 3rd party libraries or sass import statment to [./src/style/vendors/vendors-style.scss](src/style/vendors/vendors-style.scss) when adding 3rd party styles.

---

## Build and deploy

### Static app

To build static site just run

```bash
# (not required): do sign version git tags
yarn config set version-sign-git-tag true
# (not required): to remove "v" version-tag-prefix
yarn config set version-tag-prefix ""
# (not required): do update version
yarn version
# build everything into ./build directory
yarn build
# git push to remote
git push && git push --tags
```

Contents of [./build](build) directory are ready to be served just copy contents of `./build` directory to your webserver root. e.g. [demo][demo-link] is hosted with github pages, take a look at [gh-pages](https://github.com/digaverse/webxr-wb-test/tree/gh-pages) branch for example


### Build and run Docker image

requires `yarn build` before

```bash
yarn run build:docker
```
and fire up your docker image

```bash
yarn run start:docker
```

And now open your browser https://localhost:8080

<!-- ASSETS and LINKS -->
<!-- License -->

[license-img]: https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square
[license-link]: https://raw.githubusercontent.com/digaverse/webxr-webpack-boilerplate/master/LICENSE

<!-- A-Frame -->
[aframe-img]: https://img.shields.io/badge/a--frame-0.8.2-FC3164.svg?style=flat-square
[aframe-link]: https://aframe.io/
[aframe-logo]: assets/images/aframe/logo-152.png

<!-- demo -->
[demo-link]: https://digaverse.github.io/webxr-webpack-boilerplate

<!-- travis-ci -->
[travis-img]: https://travis-ci.org/digaverse/webxr-webpack-boilerplate.svg?branch=master
[travis-link]: https://travis-ci.org/digaverse/webxr-webpack-boilerplate

<!-- circleci -->
[circleci-img]: https://circleci.com/gh/digaverse/webxr-webpack-boilerplate/tree/master.svg?style=svg
[circleci-link]: https://circleci.com/gh/digaverse/webxr-webpack-boilerplate/tree/master

<!-- appveyor -->
[appveyor-img]: https://ci.appveyor.com/api/projects/status/fqyc4q7p1tya4dld/branch/master?svg=true
[appveyor-link]: https://ci.appveyor.com/project/mkungla/webxr-webpack-boilerplate

<!-- Codacy Badge Grade -->
[codacy-grade-img]: https://api.codacy.com/project/badge/Grade/4210783bda4d4dc9af327a1480cff45b
[codacy-grade-link]: https://www.codacy.com/app/mkungla/webxr-webpack-boilerplate?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=digaverse/webxr-webpack-boilerplate&amp;utm_campaign=Badge_Grade

<!-- Coverage Badge -->
[coverage-img]: https://img.shields.io/coveralls/github/digaverse/webxr-webpack-boilerplate.svg
[coverage-link]: https://github.com/digaverse/webxr-webpack-boilerplate

<!-- Dependencies -->
[dep-status-img]: https://david-dm.org/digaverse/webxr-webpack-boilerplate/status.svg
[dep-status-link]: https://david-dm.org/digaverse/webxr-webpack-boilerplate#info=dependencies

[devdep-status-img]: https://david-dm.org/digaverse/webxr-webpack-boilerplate/dev-status.svg
[devdep-status-link]: https://david-dm.org/digaverse/webxr-webpack-boilerplate#info=devDependencies

[circleci-site]: https://circleci.com/

[webapp-webpack-plugin-link]: https://github.com/brunocodutra/webapp-webpack-plugin

<!-- images -->
[screeenshot-theme-red]: src/static/images/screenshots/theme-red.png
[screeenshot-theme-blue]: src/static/images/screenshots/theme-blue.png
[screeenshot-theme-green]: src/static/images/screenshots/theme-green.png
[screeenshot-theme-yellow]: src/static/images/screenshots/theme-yellow.png
