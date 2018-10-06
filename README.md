# ProDoc.JS
**(!)** Only tested on Google Chrome

## Installation
Paste this into the end of your body tag, in an HTML document of course. :)
```
<div> 
<!-- Only neccessary to include these if you're planning on using the live web editor, (SHIFT-D in devmode) -->
    <script src="https://cdn.jsdelivr.net/npm/codemirror-minified@5.37.0/lib/codemirror.min.js"></script>
    <script src="dependencies/xml.js"></script>
<!-- -->
    <script src="prodoc.min.js"></script>
</div>
```

## Documentation

```
let prodoc = new ProDoc({
  "mode":"production",
});
```
As of right now *'mode'* is the only option and It's required. Choose between *'devmode'* or 'production'. Only use *'devmode'* if you're going to use the live web editor which is a work in progress.

# Example usage

**Create Element**
```javascript

let prodoc = new ProDoc({
  "mode":"production",
});

var exampleAttributes = ["title=leeroy"]

prodoc.createElement('h1', {
     "innerHTML":"Example",
     "identifiers":".className .anotherClassName #exampleID",
     "attributes":exampleAttributes,
     "parent":".someContainer"
});

var css = ["color: blue", "font-size: 45px"]

prodoc.appendStyle('#exampleID', css);

```