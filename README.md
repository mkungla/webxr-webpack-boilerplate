# A-Frame Webpack Boilerplate

**Starter Kit for building rich, immersive WebXR projects with A-Frame, Webpack, handlebars and SASS**

[![A-Frame Version][aframe-img]][aframe-link]
[![Project License][license-img]][license-link]

## Introduction

The goal of A-Frame Webpack Boilerplate is to provide a high-quality, high-performance code base to accelerate Web XR development with A-Frame.  
It is designed to be flexible in order to support rapid implementation and customization within your project.

**Build Status**

| Linux | macOS | Windows |
| --- | --- | --- |
| [![TravisCI Build Status][travis-img]][travis-link] | [![CircleCI Build Status][circleci-img]][circleci-link] | [![AppveyorCI Build Status][appveyor-img]][appveyor-link] |

[![Grade Badge][codacy-grade-img]][codacy-grade-link]
[![Coverage Badge][coverage-img]][coverage-link]
[![Dependencies][dep-status-img]][dep-status-link]
[![Dev Dependencies][devdep-status-img]][devdep-status-link]

---

- [Overview](#overview)
  * [Project structure](#project-structure)
  * [Custom A-Frame Theme](#custom-a-frame-theme)
- [Getting Started](#getting-started)
  * [Fork this repository](#fork-this-repository)
    + [(option 1) Create fork to contribute back to this repository](#-option-1--create-fork-to-contribute-back-to-this-repository)
    + [(option 2) Create new Open Source project based on this repository](#-option-2--create-new-open-source-project-based-on-this-repository)
    + [(option 3) Create new private project based on this repository](#-option-3--create-new-private-project-based-on-this-repository)
  * [First run](#first-run)
  * [Build Configuration](#build-configuration)
    * [Add A-Frame components](#add-a-frame-components)
    * [Add 3rd party libraries](#add-3rd-party-libraries)
    * [Build or rebuild 3rd party libraries](build-or-rebuild-3rd-party-libraries)

---
## Overview
> here is overview of A-Frame Webpack Boilerplate project and what's included.

### Project structure

- **build** development and staging build output directory
- **devel** development related files like webpack and project configuration files.
  - **coverage** coverage report
- **dist** project release files, output of `yarn run dist`.
- **docs** project documentation or gh-pages
- **res** all static and raw resources which are rather src files for `src/assets` e.g raw design files.
  - **audio** audio files
  - **images** image files
  - **models** 3D objects and models
  - **video** video files
- **src** project source files.
  - **aframe** A-Frame compnents,systems.shaders
    - **components** custom components
    - **primitives** custom primitives
    - **shaders** custom shaders
    - **systems** custom systems
  - **api** dummy API
  - **assets** project assets which may be processed by Webpack if rule is set in Webpack configuration
    - **static** all assets are just copied to {build}/assets/static
  - **js** main application
  - **partials** partials for handlebars
    - **aframe** partials for A-Frame scenes
    - **html** partials for HTML pages
    - **...** your own partials structure
  - **scenes** all your A-Frame scenes or HTML pages
  - **style** project styles
    - **config** style configuration
      - **themes** style themes
      - **vendor** vendor sass files
    - **app** your app styles
- **tests** test suites.
- **tmp** temporary and local files which are not tracked by git.

---

### Custom A-Frame Theme

| red | blue | green | yellow |
| :---: | :---: | :---: | :---: |
| ![Theme red][screeenshot-theme-red] | ![Theme blue][screeenshot-theme-blue]  | ![Theme -green][screeenshot-theme-green]  | ![Theme yellow][screeenshot-theme-yellow] |

You can change A-Frame themes by modifying SASS configuration  `$theme` variable in [src/style/app-theme.scss](src/style/app-theme.scss)

```sass
// Color themes red !default, yellow, green, blue
$theme: red;
```

---

## Getting Started
> instructions to set up your project

### Fork this repository
> Follow one of the 3 options below

> navigate to directory you keep your projects and set following temporary environment variables

```bash
cd <your-projects>
PROJECT_NAME="<your-new-project-dir-name>"
GITHUB_USERNAME="<github-username>"
```

*for full copy you need [git-lfs plugin for git][git-lfs-link]*

#### (option 1) Create fork to contribute back to this repository
> clone full copy of this repository and set remotes to be able sync your repository with upstream

```bash
git clone --origin github/"$GITHUB_USERNAME" git@github.com:$GITHUB_USERNAME/aframe-webpack-boilerplate.git "$PROJECT_NAME"
cd "$PROJECT_NAME"
git remote add github/mkungla git@github.com:mkungla/aframe-webpack-boilerplate.git
```
<sup>and start hacking.</sup>

#### (option 2) Create new Open Source project based on this repository
> clone minimal copy of this repository and set remotes for your new repository.  
> Your repository GitHub project URL should be in form of  
> https://github.com/$GITHUB_USERNAME/$PROJECT_NAME  
> and repository should be new (clean repository)

```bash
GIT_LFS_SKIP_SMUDGE=1 git clone --depth=1 --origin github/"$GITHUB_USERNAME" git@github.com:$GITHUB_USERNAME/aframe-webpack-boilerplate.git "$PROJECT_NAME"
cd "$PROJECT_NAME"
git remote set-url github/"$GITHUB_USERNAME" git@github.com:$GITHUB_USERNAME/"$PROJECT_NAME".git
git push -f github/"$GITHUB_USERNAME" master
```
<sup>and start hacking.</sup>

#### (option 3) Create new private project based on this repository


```bash
GIT_LFS_SKIP_SMUDGE=1 git clone --depth=1 --origin github/"$GITHUB_USERNAME" git@github.com:"$GITHUB_USERNAME"/aframe-webpack-boilerplate.git "$PROJECT_NAME"
cd "$PROJECT_NAME"
git remote rm github/"$GITHUB_USERNAME"
```
<sup>and start hacking.</sup>

### First run

By default `yarn start` will not build vendor libraries to improve `webpack-dev-server` performance a bit.
Vendor libraries are only built when running `yarn run build` or `yarn run dist`

```
yarn install
yarn run build
yarn start
```

### Build Configuration

#### Add A-Frame components

```
yarn add -D <some-aframe-component>
```
add import statement to `./src/aframe/aframe-base.js`

#### Add 3rd party libraries

```
yarn add -D <some-library>
```

optionally add import statement to `./src/js/vendors.js` if you want to bundle that dependency together with other 3rd party libraries

#### Build or rebuild 3rd party libraries*

when you want to update/rebuild vendor libraries you have to run `yarn run build` before `yarn start`.

> - `./src/aframe-base.js` *where you import A-Frame and external A-Frame components.*
> - `./src/js/vendors.js` *where you import any other 3rd party libraries*


however if you some reason want to rebuild and watch vendor libraries while
developing you can enable that by setting environment variable.

```
WITH_VENDORS="true" yarn start
```

---
<!-- ASSETS and LINKS -->
<!-- License -->
[license-img]: https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square
[license-link]: https://raw.githubusercontent.com/mkungla/aframe-php/master/LICENSE

<!-- A-Frame -->
[aframe-img]: https://img.shields.io/badge/a--frame-0.7.1-FC3164.svg?style=flat-square
[aframe-link]: https://aframe.io/
[aframe-logo]: assets/images/aframe/logo-152.png

<!-- travis-ci -->
[travis-img]: https://travis-ci.org/mkungla/aframe-webpack-boilerplate.svg?branch=master
[travis-link]: https://travis-ci.org/mkungla/aframe-webpack-boilerplate

<!-- circleci -->
[circleci-img]: https://circleci.com/gh/okramlabs/aframe-webpack-boilerplate/tree/master.svg?style=svg
[circleci-link]: https://circleci.com/gh/okramlabs/aframe-webpack-boilerplate/tree/master

<!-- appveyor -->
[appveyor-img]: https://ci.appveyor.com/api/projects/status/c8nebbmvwxby2rjd?svg=true
[appveyor-link]: https://ci.appveyor.com/project/mkungla/aframe-webpack-boilerplate

<!-- Codacy Badge Grade -->
[codacy-grade-img]: https://api.codacy.com/project/badge/Grade/7a47a8ae8682467b9e33a3d47a6fbd54
[codacy-grade-link]: https://www.codacy.com/app/marko-kungla/aframe-webpack-boilerplate?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=mkungla/aframe-webpack-boilerplate&amp;utm_campaign=Badge_Grade

<!-- Codacy Badge Coverage -->
[coverage-img]: https://api.codacy.com/project/badge/Coverage/7a47a8ae8682467b9e33a3d47a6fbd54
[coverage-link]: https://www.codacy.com/app/marko-kungla/aframe-webpack-boilerplate?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=mkungla/aframe-webpack-boilerplate&amp;utm_campaign=Badge_Coverage

[dep-status-img]: https://david-dm.org/mkungla/aframe-webpack-boilerplate/status.svg
[dep-status-link]: https://david-dm.org/mkungla/aframe-webpack-boilerplate#info=dependencies
[devdep-status-img]: https://david-dm.org/mkungla/aframe-webpack-boilerplate/dev-status.svg
[devdep-status-link]: https://david-dm.org/mkungla/aframe-webpack-boilerplate#info=devDependencies

[git-lfs-link]: https://git-lfs.github.com/

<!-- images -->
[screeenshot-theme-red]: res/images/screenshots/theme-red.png
[screeenshot-theme-blue]: res/images/screenshots/theme-blue.png
[screeenshot-theme-green]: res/images/screenshots/theme-green.png
[screeenshot-theme-yellow]: res/images/screenshots/theme-yellow.png
