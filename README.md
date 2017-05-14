| |
| :---: |
| <h1>A-Frame Webpack Boilerplate</h1> |
| A-Frame Starter Kit of WebVR with Webpack2 SASS |
| [![Build Status][ci-image]][ci-url] [![Grade Badge][codacy-grade-image]][codacy-grade-url] [![Coverage Badge][coverage-image]][coverage-url] [![A-Frame Version][aframe-image]][aframe-url] [![Project License][license-image]][license-url] |

### A-Frame Project skeleton

- **config** project configuration files.
- **devel** development
  - **coverage** coverage report
- **dist** project release files, output of `npm run build`.
- **src** project source files.
  - **api** Dummy API served by Express
  - **assets** project assets
    - **audio** audio files
    - **images** image files
    - **models** 3D objects and models
    - **video** video files
  - **js** javascript files
    - **a-components** custom components
    - **a-primitives** custom primitives
    - **a-shaders** custom shaders
    - **a-systems** custom systems
    - **project** main application
  - **sass**
    - **config** sass variables and themes
    - **vendor** vendor sass files
    - **project** application styles
  - **scene** A-Frame scene
    - **camera** camera templates (handlebars)
    - **entity** entity templates (handlebars)
    - **sky** sky templates (handlebars)
- **test** testsuites.
- **tmp** Temporary files.

### Custom A-Frame Theme
You can change A-Frame themes by modifying SASS configuration [`$theme` variable](src/sass/config/_index.scss)
```sass
// Color themes red !default, yellow, green, blue
$theme: red;
```
| red | blue | green | yellow |
| :---: | :---: | :---: | :---: |
| ![Theme Default][screeenshot-theme-red] | ![Theme Default][screeenshot-theme-blue]  | ![Theme Default][screeenshot-theme-green]  | ![Theme Default][screeenshot-theme-yellow] |

<!-- ASSETS and LINKS -->
<!-- License -->
[license-image]: https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square
[license-url]: https://raw.githubusercontent.com/mkungla/aframe-php/master/LICENSE
<!-- A-Frame -->
[aframe-image]: https://img.shields.io/badge/a--frame-0.5.0-FC3164.svg?style=flat-square
[aframe-url]: https://aframe.io/
<!-- travis-ci -->
[ci-image]: https://travis-ci.org/mkungla/aframe-webpack-boilerplate.svg?branch=master
[ci-url]: https://travis-ci.org/mkungla/aframe-webpack-boilerplate
<!-- Codacy Badge Grade -->
[codacy-grade-image]: https://api.codacy.com/project/badge/Grade/7a47a8ae8682467b9e33a3d47a6fbd54
[codacy-grade-url]: https://www.codacy.com/app/marko-kungla/aframe-webpack-boilerplate?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=mkungla/aframe-webpack-boilerplate&amp;utm_campaign=Badge_Grade
<!-- Codacy Badge Coverage -->
[coverage-image]: https://api.codacy.com/project/badge/Coverage/7a47a8ae8682467b9e33a3d47a6fbd54
[coverage-url]: https://www.codacy.com/app/marko-kungla/aframe-webpack-boilerplate?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=mkungla/aframe-webpack-boilerplate&amp;utm_campaign=Badge_Coverage
<!-- Screenshots -->
[screeenshot-theme-red]: src/assets/images/screenshots/theme-red.png
[screeenshot-theme-blue]: src/assets/images/screenshots/theme-blue.png
[screeenshot-theme-green]: src/assets/images/screenshots/theme-green.png
[screeenshot-theme-yellow]: src/assets/images/screenshots/theme-yellow.png
