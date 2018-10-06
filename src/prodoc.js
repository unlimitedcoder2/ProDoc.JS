var pdoc;

function pdocLoadObj(){

pdoc = {

  "devmodeSwitchStatus": 0,

  "mode":"production",

  "devmode": function() {
    if(pdoc.mode !== 'devmode') return console.error('ProDoc Devmode must be activated for this feature to work!')

    var devbody = document.getElementsByClassName('pdoc-body')[0];
    var body = document.body;

    var editorDiv = document.createElement('DIV');
    var editor = document.createElement('TEXTAREA');
    var devmodeTitle = document.createElement('H1');

    devmodeTitle.style.fontFamily = 'K2D';
    devmodeTitle.style.color = '#FFF';
    devmodeTitle.style.userSelect = 'none';
    devmodeTitle.innerHTML = 'ProDocs Devmode';
    devmodeTitle.style.textAlign = 'center';

    editor.setAttribute('id', 'pdoc-devmode-editor');
    editor.style.height = '100%';

    editorDiv.style.float = 'left';
    editorDiv.style.height = '80%';
    editorDiv.style.width = '35%';
    editorDiv.style.background = '#263238';
    editorDiv.setAttribute('id', 'pdoc-devmode-editorDiv');

    editorDiv.appendChild(devmodeTitle);
    editorDiv.appendChild(editor);

    if(pdoc.devmodeSwitchStatus == 0) {
      body.style.background = '#16111E';
      devbody.style.float = 'right';
      devbody.style.overflowY = 'auto';
      devbody.style.padding = '8px';
      devbody.style.width = '60%';
      devbody.style.maxHeight = '80%';
      devbody.style.height = '80%';
      devbody.style.background = '#FFF';

      var title = document.title;
      document.title = 'Live Website Editing | ProDocs';

      body.appendChild(editorDiv);

      var codemirrorIDE = CodeMirror.fromTextArea(document.getElementById("pdoc-devmode-editor"), {
            lineNumbers: true,
            mode: 'xml',
            htmlMode: true,
            matchBrackets: true,
            theme: 'material'
          });

      codemirrorIDE.getDoc().setValue(devbody.innerHTML)
      codemirrorIDE.on('change',function(textarea){
        devbody.innerHTML = textarea.getValue();
      });

        pdoc.devmodeSwitchStatus++
      }
    else {
      body.style.background = 'inherit';
      devbody.setAttribute('style', '')
      if(title) {
        document.title = title;
      }
      else {
        document.title = document.URL;
      }
      pdoc.devmodeSwitchStatus = 0;

      document.getElementById('pdoc-devmode-editorDiv').remove();
    }
  },

  "createElement": function(type, options) {
    if(!type) return console.error('ProDoc-TypeError: No element type was defined!')
    var elm = document.createElement(type.toUpperCase());
    if(!options && pdoc.mode === 'devmode') {
      document.querySelector('.pdoc-body').appendChild(elm);
      return elm;
    }
    else if(!options && pdoc.mode === 'production'){
      document.querySelector('body').appendChild(elm);
      return elm;
    }
    if(options && pdoc.mode === 'devmode') {
      options.parent = '.pdoc-body';
    }
    else if(options && pdoc.mode === 'production'){
      options.parent = 'body';
    }
    if(document.querySelector(options.parent) == null) return console.error('ProDoc-TypeError: Parent ' + options.parent.toUpperCase() + ' could not be located, did you spell it right?')
    if(Array.isArray(options.attributes)) {
      var i;
      var attrCollection = [];
      for (i = 0; i < options.attributes.length; i++) {
        attrCollection.push(options.attributes[i].split('='));
            elm.setAttribute(attrCollection[i][0], attrCollection[i][1]);
          }
        }
    else if(typeof options.attributes == "string") {
        console.warn('ProDoc TypeError: The attributes option only accepts arrays! Read more on the documentation. Attributes were dismissed.')
    }
    if(options.identifiers) {
      var idArray = options.identifiers.split(' ');
      var i;
      for (i = 0; i < idArray.length; i++) {
        if(idArray[i].startsWith('#')) {
          elm.setAttribute('id', idArray[i].substring(1))
        }
        else if(idArray[i].startsWith('.')) {
          elm.setAttribute('class', elm.className + ' ' + idArray[i].substring(1))
        }
        else {
          console.warn('ProDoc TypeError: Incorrect identifier formatting.')
        }
      }
    }
    if(options.innerHTML) {
      var t = document.createTextNode(options.innerHTML);
      elm.appendChild(t);
    }
      document.querySelector(options.parent).appendChild(elm);
      return elm;
  },
  "createImage": function(src, options) {
    var image = document.createElement('IMG');
    image.src = src;

    document.querySelector(options.parent).appendChild(image);
  },
  "appendStyle": function(element, css) {
    if(Array.isArray(css)) {
      var i;
      var styling = '';
      for (i = 0; i < css.length; i++) {
        if(css[i].endsWith(';')) {
          styling = styling + css[i]
        }
        else {
          styling = styling + css[i] + ';'
        }
          document.querySelector(element).setAttribute('style', styling)
        }
    }
    else return console.error('ProDoc-TypeError: appendStyle only accept arrays!')
  },
  "html": {
    "edit": function(element, code) {
      if(!element || !code) return console.error('ProDoc-TypeError: Missing argument')
      document.querySelector(element).innerHTML = code;
    },
    "content": function(element) {
      if(!element) element = 'html';
      return document.querySelector(element).innerHTML;
    },
  }
};
};

function ProDoc(options) {
    pdocLoadObj();
    if(!options.mode) return console.error('ProDoc Missing Argument: No mode was defined! Please use (production/devmode)')
    if(!options.mode === 'production' || !options.mode === 'devmode') return console.error('ProDoc TypeError: ' + options.mode.toUpperCase() + ' is not a valid mode. Did you spell it right?')
    if(document.getElementsByClassName('pdoc-body')[0] && options.mode === 'production') return console.warn('ProDoc: Devmode is already injected into this webpage. For full production mode please run the site using production mode!')
    pdoc.mode = options.mode;
    if(pdoc.mode === 'devmode') {
      console.warn("ProDoc: This website is currently running in 'devmode'. For production use please read the documentation.");
      document.onkeypress = function(e){
        if(e.key === 'D' && e.shiftKey == true) {
          if(pdoc.mode !== 'devmode') return;
          pdoc.devmode();
        }
      }

      var devbody = document.createElement('SECTION');
      devbody.setAttribute('class', 'body pdoc-body')
      var bodyContent = document.body.innerHTML;
      document.body.innerHTML = '';
      devbody.innerHTML = bodyContent;
      document.body.appendChild(devbody);

      var GoogleFont = document.createElement('LINK');
      GoogleFont.setAttribute('href', 'https://fonts.googleapis.com/css?family=K2D');
      GoogleFont.setAttribute('rel', 'stylesheet');
      GoogleFont.setAttribute('type', 'text/css');
      document.head.appendChild(GoogleFont);

      var scriptTags = devbody.querySelectorAll('SCRIPT');
      scriptTags.forEach(function(elm){
        var element = elm.cloneNode(true);
        document.body.appendChild(element);
        elm.remove();
      });
  }
    return pdoc;
}
