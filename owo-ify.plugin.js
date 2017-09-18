//META{"name":"owoify"}*//

class owoify {
  constructor() {
    this.makeOwO = function (owo, txt) {
      txt.value = txt.value.replace(/r|l/g, "w").replace(/R|L/g, "W");
    };
  }

  cleanUp() {
    document.querySelector(".channel-text-area-default textarea").removeEventListener("input", this.makeOwO);
  }

  load() {
    console.log("OwO what's this?");
    let self = this;
    let textarea = document.querySelector(".channel-text-area-default textarea");
    textarea.addEventListener("input", self.makeOwO.bind(textarea, self, textarea));
  }
  start() {
    let self = this;
    let textarea = document.querySelector(".channel-text-area-default textarea");
    textarea.addEventListener("input", self.makeOwO.bind(textarea, self, textarea));
  }

  stop() {
    this.cleanUp();
  }

  unload() {
    this.cleanUp();
  }

  getName        () { return "owo-ify"; }
  getDescription () { return "Replaces all l's and r's in your own messages with w's"; }
  getVersion     () { return "0.0.1"; }
  getAuthor      () { return "kaloncpu57"; }
}
