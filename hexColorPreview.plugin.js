//META{"name":"hexColorPreview"}*//

class hexColorPreview {
  constructor() {
    this.whatever = "whatever";
  }

  wrapAll() {
    setTimeout(function () {
      let regHex = new RegExp(/#(?:[0-9a-fA-F]{3}){1,2}\b/, 'g');
      $(".comment .markup").each(function () {
        if ($(this).find(".hex-value").length) return;
        if ($(this).text().match(regHex) !== null) {
          $(this).html(function (_, html) {
            return html.replace(regHex, '<div class="hex-value" style="color: $&;">$&<div class="hex-preview" style="background: $&;"></div></div>');
          });
        }
      });
    }, 100);
  }

  cleanUp() {
    $(".hex-value").each(function () {
      $(this).replaceWith(function () {
        return $(this).text();
      });
    });
  }

  updateStyle() {
    let self = this;
    let css = `
      .hex-value {
        position: relative;
        display: inline-block;
        font-weight: bold;
      }

      .hex-value .hex-preview {
        visibility: hidden;
        height: ${self.size}px;
        width: ${self.size}px;
        border-radius: 5px;

        position: absolute;
        z-index: 1;
        top: -10px;
        left: 105%;

        opacity: 0;
        transition: opacity 0.5s;
      }

      .hex-value:hover .hex-preview {
        visibility: visible;
        opacity: 1;
      }
    `;

    if ($("#hexPreview-stylesheet").length) {
      $("#hexPreview-stylesheet").html(css);
    } else {
      BdApi.injectCSS("hexPreview-stylesheet", css);
    }
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

  updateSettings(save) {
    let input = $("#hexPreview-size").val();
    if (isNaN(input)) {
      $("#hexPreview-size").val(this.size);
    } else {
      this.size = input;
      this.updateStyle();
      if (save === true) {
        bdPluginStorage.set("hexColorPreview", "size", this.size);
        PluginUtilities.showToast(`Settings updated and saved!`);
      } else {
        PluginUtilities.showToast(`Settings updated!`);
      }
    }
  }

  initialize() {
    PluginUtilities.checkForUpdate(this.getName(), this.getVersion(), "https://raw.githubusercontent.com/kaloncpu57/discord-plugins/master/hexColorPreview.plugin.js");

    //load settings
    this.size = bdPluginStorage.get("hexColorPreview", "size");
    if (this.size === null) this.size = "25";
    this.updateStyle();

    this.wrapAll();
  }

  start() {
    let libraryScript = this.inject('script', {
      type: 'text/javascript',
      id: 'zeresLibraryScript',
      src: 'https://rauenzi.github.io/BetterDiscordAddons/Plugins/PluginLibrary.js'
    });

    if (typeof window.ZeresLibrary !== "undefined") {
      this.initialize();
    } else {
      libraryScript.addEventListener("load", () => { this.initialize(); });
    }
  }

  stop() {
    this.cleanUp();
  }

  load() {}

  unload() {
    this.cleanUp();
  }

  observer({ addedNodes }) {
    if(addedNodes.length && addedNodes[0].classList && addedNodes[0].classList.contains('chat')
    || addedNodes.length && addedNodes[0].classList && addedNodes[0].classList.contains('markup')
    || addedNodes.length && addedNodes[0].classList && addedNodes[0].classList.contains('message')
    || addedNodes.length && addedNodes[0].classList && addedNodes[0].classList.contains('hide-overflow')
    || addedNodes.length && addedNodes[0].classList && addedNodes[0].classList.contains('messages-wrapper')) {
      this.wrapAll();
    }
  }

  getSettingsPanel() {
    let previewSize = bdPluginStorage.get("hexColorPreview", "size") || "25";
    return `
    <div class="form">
      <div class="ui-form-item flexChild-1KGW5q">
        <h5 class="h5 h5-18_1nd title-3sZWYQ size12-3R0845 height16-2Lv3qA weightSemiBold-NJexzi defaultMarginh5-2mL-bP marginBottom8-AtZOdT">Preview Size</h5>
        <div class="description description-3_Ncsb formText-3fs7AJ marginBottom8-AtZOdT modeDefault-3a2Ph1 primary-jw0I4K">
          The size, in pixels, of the color preview pop-up
          <input class="inputDefault-_djjkz input-cIJ7To size16-14cGz5" id="hexPreview-size" type="number" value="${previewSize}" />
        </div>
      </div>
      <div class="ui-form-item flexChild-1KGW5q">
        <button class="button-1x2ahC button-38aScr lookFilled-1Gx00P colorGreen-29iAKY sizeSmall-2cSMqn grow-q77ONN" onclick="hexColorPreview.prototype.updateSettings()">Update</button>
        <br/>
        <button class="button-1x2ahC button-38aScr lookFilled-1Gx00P colorGreen-29iAKY sizeSmall-2cSMqn grow-q77ONN" onclick="hexColorPreview.prototype.updateSettings(true)">Save & Update</button>
      </div>
    </div>
    `;
  }

  getName        () { return "Hex Color Preview"; }
  getDescription () { return "Hover over hex colors to get a popup preview of that color."; }
  getVersion     () { return "0.1.4"; }
  getAuthor      () { return "kaloncpu57"; }

}
