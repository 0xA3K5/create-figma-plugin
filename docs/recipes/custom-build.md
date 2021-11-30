## Customizing the build

### Customizing the underlying esbuild configuration

The `build-figma-plugin` CLI is powered by the [esbuild compiler](https://esbuild.github.io). To customize the underlying build configuration for the [main bundle](https://figma.com/plugin-docs/how-plugins-run/), create a `build-figma-plugin.main.js` file:

```js
// build-figma-plugin.main.js

module.exports = function (buildOptions) {
  // ...
  return {
    ...buildOptions,
    // ...
  }
}
```

`buildOptions` is the original [esbuild configuration object](https://esbuild.github.io/api/#build-api) used internally by the `build-figma-plugin` CLI. The exported function must return the new configuration object to be used.

Correspondingly, use a `build-figma-plugin.ui.js` file to customize the build configuration for the [UI bundle](https://figma.com/plugin-docs/how-plugins-run/).

#### Disabling automatic swapping of React imports

The `build-figma-plugin` CLI will detect and automatically swap out all `react` and `react-dom` imports with [`preact/compat`](https://preactjs.com/guide/v10/switching-to-preact/). To disable this behaviour, create a `build-figma-plugin.ui.js` file:

```js
// build-figma-plugin.ui.js

module.exports = function (buildOptions) {
  return {
    ...buildOptions,
    plugins: buildOptions.plugins.filter(function (plugin) {
      return plugin.name !== 'preact-compat'
    })
  }
}
```

### Customizing the `manifest.json` file

To modify the `manifest.json` file just before it gets output by the `build-figma-plugin` CLI, create a `build-figma-plugin.manifest.js` file:

```js
// build-figma-plugin.manifest.js

module.exports = function (manifest) {
  // ...
  return {
    ...manifest,
    // ...
  }
}
```

The exported function receives the original `manifest.json` that’s created by the `build-figma-plugin` CLI, and must return the new `manifest.json` plain object to be output.
