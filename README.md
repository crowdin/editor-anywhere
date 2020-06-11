# Crowdin Editor Anywhere

[![GitHub release (latest by date)](https://img.shields.io/github/v/release/crowdin/editor-anywhere?cacheSeconds=5000&logo=github)](https://github.com/crowdin/editor-anywhere/releases/latest)
[![jsDelivr hits (GitHub)](https://img.shields.io/jsdelivr/gh/hm/crowdin/editor-anywhere?cacheSeconds=1000&logo=jsdelivr)](#)
[![jsDelivr hits (GitHub)](https://img.shields.io/jsdelivr/gh/hy/crowdin/editor-anywhere?cacheSeconds=4000&logo=jsdelivr)](#)
[![GitHub](https://img.shields.io/github/license/crowdin/editor-anywhere?cacheSeconds=20000)](https://github.com/crowdin/editor-anywhere/blob/master/LICENSE)

Plugin to any website that allows to search selected text in the Crowdin project and translate it in-place

# Usage

When enabled, your website users can select any text on the page, and click Search button. Then, Crowdin Editor opens in the popup, and user can translate strings found in connected Crowdin project, or review translations.

## Init

Add `<script src="https://cdn.jsdelivr.net/gh/crowdin/editor-anywhere@1.0/editorAnywhere.js"></script>` to your site.

Generate URLs to Crowdin Editor on your side with appropriate languages to translate.

Set this URL as parameter. 

**Tip:** Provide URL to the language that matches your website current language

```javascript
editorAnywhere.url = '{{url}}';
```

Always run `init` method

```javascript
editorAnywhere.init(function() {
    // custom callback
});
```

If translation mode was already turned on before page reloading, it will initialize the plugin. 

## Turn On

Create a toggle button on your side.

When user enables translation mode, use method `turnOn`

```javascript
editorAnywhere.turnOn(function() {
    // custom callback
});
```

Plugin will remain enabled even when page reloads.

## Turn Off

Create a toggle button on your side.

When user disables translation mode, use method `turnOff`

```javascript
editorAnywhere.turnOff(function() {
    // custom callback
});
```

Page will reload.

## Check Status

Use `isEnabled` method.

```javascript
var isEnabled = editorAnywhere.isEnabled();
```

It can be useful if there is one button to toggle translation mode.

## Contribution

We are happy to accept contributions to the Crowdin Editor Anywhere. To contribute please do the following:

1. Fork the repository on GitHub.
2. Decide which code you want to submit. Commit your changes and push to the new branch.
3. Ensure that your code adheres to standard conventions, as used in the rest of the library.
4. Submit a pull request with your patch on Github.

## Seeking Assistance

If you find any problems or would like to suggest a feature, please feel free to file an issue on Github at [Issues Page](https://github.com/crowdin/editor-anywhere/issues).

Need help working with Crowdin Editor Anywhere or have any questions?
[Contact Customer Success Service](https://crowdin.com/contacts).

## License

<pre>
The Crowdin Editor Anywhere is licensed under the MIT License.
See the LICENSE file distributed with this work for additional
information regarding copyright ownership.

Except as contained in the LICENSE file, the name(s) of the above copyright
holders shall not be used in advertising or otherwise to promote the sale,
use or other dealings in this Software without prior written authorization.
</pre>
