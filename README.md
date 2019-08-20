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
  <script src="https://cdn.jsdelivr.net/gh/verdebydesign/keylani@0.0.1/dist/keylani.min.js"></script>
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

[Documentation](https://akaizn-junior.github.io/keylani/)

* [bind](https://akaizn-junior.github.io/keylani/global.html#bind)
* [map](https://akaizn-junior.github.io/keylani/global.html#map)
* [getAllBindings](https://akaizn-junior.github.io/keylani/global.html#getAllBindings)
* [listen](https://akaizn-junior.github.io/keylani/global.html#listen)

## Demo

* Play with Keylani on [Glitch](https://maroon-carnation.glitch.me/)
* Check out the dev version here [https://maroon-carnation.glitch.me/dev.html](https://maroon-carnation.glitch.me/dev.html)
* Clone the repo on [Github](https://github.com/verdebydesign/keylani.git) and run the demo locally

## Shout outs

[jsDelivr](https://www.jsdelivr.com/) for an amazing simple and free CDN

[Vectr](https://vectr.com/) for being an amazing editor

## Author

&copy; 2019 [Simao Nziaka](https://simaonziaka.com)
