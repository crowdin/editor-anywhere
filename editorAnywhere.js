var editorAnywhere = {
  url: null,
  iframe: null,
  container: null,
  closeBtn: null,
  img: null,

  turnOn: function(callback) {
    localStorage.setItem('translation-mode', 1);
    this.init();

    callback && callback();
  },

  turnOff: function(callback) {
    if(localStorage.getItem('translation-mode')) {
      localStorage.setItem('translation-mode', 0);

      callback && callback();
      window.location.reload();
    }
  },

  init: function(callback) {
    if(window.crowdinEditorAnywhere) {
      console.log('Crowdin Editor Anywhere: plugin already loaded');
      return;
    }

    if(!this.url) {
      console.log('Crowdin Editor Anywhere: Editor URL was not provided');
      return;
    }

    if(!this.isEnabled()) {
      return;
    };

    var self = this;

    this.add_script('https://unpkg.com/draggabilly@2/dist/draggabilly.pkgd.min.js', function() {self.initDrags()});

    var currentOrigin = location.origin;

    this.iframe = document.createElement('iframe');
    this.iframe.setAttribute('src', this.url + '?iframe=' + currentOrigin);
    this.closeBtn = document.createElement('div');
    this.closeBtn.innerHTML = 'Close';
    this.container = document.createElement('div');
    this.container.classList.add('draggable-source');
    this.container.appendChild(this.closeBtn);
    this.container.appendChild(this.iframe);

    var imgSrc = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZD0iTTExLjUgOUMxMC4xMiA5IDkgMTAuMTIgOSAxMS41UzEwLjEyIDE0IDExLjUgMTQgMTQgMTIuODggMTQgMTEuNSAxMi44OCA5IDExLjUgOU0yMCA0SDRDMi45IDQgMiA0LjkgMiA2VjE4QzIgMTkuMSAyLjkgMjAgNCAyMEgyMEMyMS4xIDIwIDIyIDE5LjEgMjIgMThWNkMyMiA0LjkgMjEuMSA0IDIwIDRNMTYuNzkgMTguMjFMMTMuODggMTUuM0MxMy4xOSAxNS43NCAxMi4zNyAxNiAxMS41IDE2QzkgMTYgNyAxNCA3IDExLjVTOSA3IDExLjUgNyAxNiA5IDE2IDExLjVDMTYgMTIuMzggMTUuNzQgMTMuMTkgMTUuMyAxMy44OUwxOC4yMSAxNi43OUwxNi43OSAxOC4yMVoiIC8+PC9zdmc+";

    this.img = document.createElement('img');
    this.img.setAttribute('src', imgSrc);
    this.img.setAttribute('style', 'cursor: pointer; position: absolute; display: none; background: white; border-radius: 3px');

    this.iframe.setAttribute('style', "margin: 0px; border: 0px none; background: white; width: 100%; height: calc(100% - 80px); display: block");
    this.closeBtn.setAttribute('style', "float: right; padding: 0px 20px; margin: 0px; text-align: center; font-size: 14px; line-height: 50px; text-transform: uppercase; letter-spacing: 2px; width: auto; background: transparent; color: white; cursor: pointer; box-shadow: none;");
    this.container.setAttribute('style', "min-width: 400px; max-width: 90%; width: 1000px; max-height: 90%; height: 900px; top: 20px; left: 20px; position: fixed; z-index: 1000000; background: #afafaf; padding: 0px; margin: 0px; border-radius: 4px; overflow: hidden; display: none; box-shadow: 0 15px 40px rgba(0,0,0,.3); transform: translate3d(0,0,0);");

    document.body.appendChild(this.container);
    document.body.appendChild(this.img);

    this.bindSelection();
    this.initEditorListener();

    window.crowdinEditorAnywhere = 'loaded';

    callback && callback();
  },

  isEnabled: function() {
    return this.getState() === 'enabled';
  },
  
  getState: function() {
    switch(localStorage.getItem('translation-mode')) {
      case '1':
        return 'enabled';
      case '0':
        return 'disabled';
      default:
        return 'undefined';
    }
  },

  initDrags: function() {
    var self = this;

    var draggie = new Draggabilly( '.draggable-source', {});

    draggie.on( 'dragStart', function( event, pointer ) {
      self.iframe.style.pointerEvents = 'none';
    });

    draggie.on( 'dragEnd', function( event, pointer ) {
      self.iframe.style.pointerEvents = 'auto';
    });
  },

  sendSelection: function() {
    var text = window.getSelection().toString();

    var message = {
      msg_type: 'search',
      query: text
    };

    this.sendPostMessage(message);
  },

  bindSelection: function() {
    var self = this;

    this.closeBtn.addEventListener('click', function() {
      self.container.style.display = 'none';
    });

    this.img.addEventListener('click', function() {
      self.sendSelection();
      self.img.style.display = 'none';
      self.container.style.display = 'block';
    });

    document.addEventListener('mouseup', function(e) {
      var x = e.pageX + 5;
      var y = e.pageY - 20;

      var text = window.getSelection().toString();

      if(!text) {
        self.img.style.display = 'none';
        return;
      }

      self.img.style.top = y + 'px';
      self.img.style.left = x + 'px';
      self.img.style.display = 'block';
    });
  },

  sendPostMessage: function(message) {
    if(this.iframe) {
      this.iframe.contentWindow.postMessage(message, '*');
    }
  },

  initEditorListener: function() {
    var self = this;
    window.onmessage = function(event) {
      event = event || window.event;

      var message = event.data;

      if (message === 'logout') {
        window.location.reload();
      }

      switch(message.msg_type) {
        case 'close_editor':
          self.container.style.display = 'none';
          break;

        case 'success':
          if(self.container.style.display == 'block') {
            self.sendSelection();
          }
          break;

        default:
          return;
      }
    };
  },

  add_script: function(path, callback) {
    var js = document.createElement('script');
    js.setAttribute('src', path);
    if(typeof callback === 'function') {
      js.addEventListener('load', callback);
    }
    document.head.appendChild(js);
  }
};
