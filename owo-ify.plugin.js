//META{"name":"owoify"}*//

var owoify = (() => {
  var PluginUpdater, WebpackModules, Tooltip, Modals, ReactTools, ContextMenu, Patcher, Settings, PluginUtilities, DiscordAPI;

  return class owoify {
    constructor() {
      this.makeOwO = function (e) {
        if (e.keyCode == 13) {
          let txt = this.textContent.replace(/r|l/g, "w").replace(/R|L/g, "W").replace(/n/g, "ny").replace(/N/g, "NY").replace(/ove/g, "uv").replace(/OVE/g, "UV");
		  if (txt.startsWith("uwu:"))
				txt = txt.substring(4);
			else
				txt = this.textContent;
          this.focus();
          document.execCommand("selectAll");
          document.execCommand("insertText", true, txt);
        }
      };
    }


    inject(name, options) {
      let element = document.getElementById(options.id);
      if (element) element.parentElement.removeChild(element);
      element = document.createElement(name);
      for (let attr in options)
        element.setAttribute(attr, options[attr]);
      document.head.appendChild(element);
      return element;
    }

    initialize() {
      ({PluginUpdater, WebpackModules, Tooltip, Modals, ReactTools, ContextMenu, Patcher, Settings, PluginUtilities, DiscordAPI} = ZLibrary);
      PluginUpdater.checkForUpdate(this.getName(), this.getVersion(), "https://raw.githubusercontent.com/comfyrei/owo-ify/master/owo-ify.plugin.js");
      this.setup();
    }

    setup() {
      let self = this;
      let textarea = document.querySelector(".da-channelTextArea").querySelector("div[role='textbox']");
      if(textarea) {
        textarea.addEventListener("keydown", self.makeOwO);
      }
    }

    cleanUp() {
      let textarea = document.querySelector(".da-channelTextArea").querySelector("div[role='textbox']");
      if (textarea) {
        textarea.removeEventListener("keydown", this.makeOwO);
      }
    }

    load() {
  		let libraryScript=document.getElementById('ZLibraryScript');
  		if(!window.ZLibrary&&!libraryScript){
  			libraryScript=document.createElement('script');
  			libraryScript.setAttribute('type','text/javascript');
  			libraryScript.addEventListener("error",function(){if(typeof window.ZLibrary==="undefined"){window.BdApi.alert("Library Missing",`The library plugin needed for ${this.getName()} is missing and could not be loaded.<br /><br /><a href="https://betterdiscord.net/ghdl?url=https://raw.githubusercontent.com/rauenzi/BDPluginLibrary/master/release/0PluginLibrary.plugin.js" target="_blank">Click here to download the library!</a>`);}}.bind(this));
  			libraryScript.setAttribute('src','https://rauenzi.github.io/BDPluginLibrary/release/ZLibrary.js');
  			libraryScript.setAttribute('id','ZLibraryScript');
  			document.head.appendChild(libraryScript);
  		}
    }

    async start() {
      console.log("%c[owo-ify]", "color: #00ffff", "what's this?");
      let libraryScript=document.getElementById('ZLibraryScript');
        if(typeof window.ZLibrary!=="undefined")this.initialize();
        else libraryScript.addEventListener("load",()=>this.initialize());
    }

    stop() {
      this.cleanUp();
    }

    unload() {
      this.cleanUp();
    }

    onSwitch() {
      this.setup();
    }

    getName        () { return "owo-ify"; }
    getDescription () { return "Wepwaces aww l's anyd r's iny youw owny messages with w's, n with ny anyd ove with uv Owiginyaw Pwuginy by kaloncpu57 With help from Xpl0itR"; }
    getVersion     () { return "0.1.4"; }
    getAuthor      () { return "comfyrei"; }
  }
})();
