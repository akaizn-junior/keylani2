# Keylani

![Keylani logo](./logo.png)

A js key bindings library. Pronounced [Kae · lani]

## Install

```js
<script src="keylani.min.js"></script>
```

## How to use

```html
  <a href="#top" data-keybind="t" data-keyshow="true">Top</a>
  .
  .
  <!-- View the correct version to use. Keylani uses SemVer for its versions. Versions might have a '-' (alpha|beta) when they are on testing stages -->
  <script src="https://cdn.jsdelivr.net/gh/verdebydesign/keylani2/dist/0.0.3/grande/keylani.min.js"></script>
```

```js
<script>
  // bind a key to a callback
  Keylani.bind('Control + a', (data) => { console.log(data); });

  // a map of key bindings
  Keylani.map({
    'h+e+l+l+o': {
      bind: callA,
      label: 'Combo "h+e+l+l+o" bound from Keylani.map',
      when: true
    },
    'r+3': {
      bind: callA,
      label: 'Combo "r+3" bound from Keylani.map',
      when: true
    },
    'Tab': {
      bind: callA,
      label: 'Cmd "Tab" bound from Keylani.map',
      when: true
    }
  });

  // listen for all bindings
  Keylani.listen({
    style: 'key-class',
    loud: true,
    keyshow: true,
    showLoudData: true,
    loudTimer: 15000
  });

  // see all current added key bindings
  console.log(Keylani.getAllBindings());
</script>
```

## Links

[Documentation](https://verdebydesign.github.io/keylani2/)

* [bind](https://verdebydesign.github.io/keylani2/global.html#bind)
* [map](https://verdebydesign.github.io/keylani2/global.html#map)
* [getAllBindings](https://verdebydesign.github.io/keylani2/global.html#getAllBindings)
* [listen](https://verdebydesign.github.io/keylani2/global.html#listen)

## Demo

* Play with Keylani on [Glitch](https://keylanijs.glitch.me/)
* Check out the dev version here [https://keylanijs.glitch.me/](https://keylanijs.glitch.me/dev.html)
* Check out the Glitch [page](https://glitch.com/~keylanijs)
* Clone the repo on [Github](https://github.com/verdebydesign/keylani.git) and run the demo locally

## Tests

* Run [unit tests](https://keylanijs.glitch.me/test.html) on Glitch

## Builds and versions

* Keylani nano build: supports adding binding with functions only, such as 'bind' and 'map'
* Keylani grande build: supports nano and adding bindings with html dataset, with 'data-keybind' and 'data-keylabel'
* Both nano and grande builds offer dev and prod versions, for testing and production use respectively
* Access different builds and versions via a cdn or locally by the path: ```.../keylani2/dist/[version]/[build]/[keylani.js|keylani.min.js]```

## Shout outs

[jsDelivr](https://www.jsdelivr.com/) for an amazing simple and free CDN

[Vectr](https://vectr.com/) for being an amazing editor

## Semver

This project uses [semver](https://semver.org/) for versioning.

* Major version updates, remove deprecated code/features (Introduce Breaking changes)

* Minor version updates, introduce new features and deprecates features (Backwards compatible)

* Patch version updates, fixes a bug or clean up code (Does not affect the main API)

* In addition to semver, Keylani concatenates '-alpha' or '-beta' in the version number to indicate the stage of the version

* Finally each released version will have a codename, provided by [makever](https://www.npmjs.com/package/makever). See 'version.json' for the most current version details.

## Author

&copy; 2019 [Simao Nziaka](https://simaonziaka.com)
