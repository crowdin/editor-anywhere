# Crowdin Editor Anywhere

Plugin to any website that allows to search selected text in the Crowdin project and translate it in-place

# Usage

When enabled, your website users can select any text on the page, and click Search button. Then, Crowdin Editor opens in the popup, and user can translate strings found in connected Crowdin project, or review translations.

## Init

Add `<script src="https://cdn.jsdelivr.net/gh/crowdin/editorAnywhere/editorAnywhere.js"></script>` to your site.

Generate URLs to Crowdin Editor on your side with appropriate languages to translate.

Set this URL as parameter. 

**Tip:** Provide URL to the language that matches your website current language

    editorAnywhere.url = '{{url}}';

Always run `init` method

    editorAnywhere.init(function() {
        // custom callback
    });

If translation mode was already turned on before page reloading, it will initialize the plugin. 

## Turn On

Create a toggle button on your side.

When user enables translation mode, use method `turnOn`

    editorAnywhere.turnOn(function() {
        // custom callback
    });

Plugin will remain enabled even when page reloads.

## Turn Off

Create a toggle button on your side.

When user disables translation mode, use method `turnOff`

    editorAnywhere.turnOff(function() {
        // custom callback
    });

Page will reload.

## Check Status

Use `isEnabled` method.

    var isEnabled = editorAnywhere.isEnabled();

It can be useful if there is one button to toggle translation mode.
