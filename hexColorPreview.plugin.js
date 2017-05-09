//META{"name":"hexColorPreview"}*//

class hexColorPreview {
  constructor() {
    this.regHex = new RegExp(/#(?:[0-9a-fA-F]{3}){1,2}\b/, 'g');
    this.hexElem = '<div class="hex-value" style="color: $&;">$&<div class="hex-preview" style="background: $&;"></div></div>';
  }

  wrapAll() {
    let self = this;
    $(".markup").each(function () {
      self.wrapHex(this);
    });
  }

  wrapHex(elem) {
    let self = this;
    if ($(elem).find(".hex-value").length) return;
    if ($(elem).text().match(self.regHex) !== null) {
      $(elem).contents()
        .filter(function () {
          return this.nodeType == Node.TEXT_NODE; // only replace hex values found in text
        })
        .each(function () {
          let html = $(this).text().replace(self.regHex, self.hexElem);
          $(this).replaceWith(html);
        });

      $(elem).find("code span").each(function () {
        if ($(this).text().match(self.regHex) !== null) {
          let html = $(this).text().replace(self.regHex, self.hexElem);
          $(this).replaceWith(html);
        }
      });

      $(elem).find("code.inline").each(function () {
        let html = $(this).text().replace(self.regHex, self.hexElem);
        $(this).html(html);
      });
    }
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

  updateSettings(save) {
    let input = $("#hexPreview-size").val();
    if (isNaN(input)) {
      $("#hexPreview-size").val(this.size);
    } else {
      this.size = input;
      this.updateStyle();
      if (save === true) {
        bdPluginStorage.set("hexColorPreview", "size", this.size);
      }
    }
  }

  start() {
    this.wrapAll();
  }

  stop() {
    this.cleanUp();
  }

  load() {
    this.size = bdPluginStorage.get("hexColorPreview", "size");
    if (this.size === null) this.size = "25";
    this.updateStyle();
  }

  unload() {
    this.cleanUp();
  }

  onSwitch() {
    this.wrapAll();
  }

  observer(e) {
    let elem = e.target;
    if(elem.className == "markup") {
      this.wrapHex(elem);
    }
  }

  getSettingsPanel() {
    return `
    <div style="background: black;color: white;">
      <label>
        <span>Preview Size (px)</span>
        <input id="hexPreview-size" type="number" value="${this.size}" />
      </label>
      <br/>
      <button onclick="hexColorPreview.prototype.updateSettings()">Update</button> <button onclick="hexColorPreview.prototype.updateSettings(true)">Save & Update</button>
    </div>
    `;
  }

  getName        () { return "Hex Color Preview"; }
  getDescription () { return "Hover over hex colors to get a popup preview of that color."; }
  getVersion     () { return "0.0.5"; }
  getAuthor      () { return "kaloncpu57"; }

}
