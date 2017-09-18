//META{"name":"owoify"}*//

class owoify {
  constructor() {
    this.makeOwO = function () {
      this.value = this.value.replace(/r|l/g, "w").replace(/R|L/g, "W");
    };
  }

  cleanUp() {
    let textarea = document.querySelector(".channel-text-area-default textarea");
    textarea.removeEventListener("input", this.makeOwO);
  }

  load() {}

  start() {
    console.log("OwO what's this?");
    let self = this;
    let textarea = document.querySelector(".channel-text-area-default textarea");
    textarea.addEventListener("input", self.makeOwO);
  }

  stop() {
    this.cleanUp();
  }

  unload() {
    this.cleanUp();
  }

  getName        () { return "owo-ify"; }
  getDescription () { return "Replaces all l's and r's in your own messages with w's"; }
  getVersion     () { return "0.1.0"; }
  getAuthor      () { return "kaloncpu57"; }
}
