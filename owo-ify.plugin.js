//META{"name":"owoify"}*//

class owoify {
  constructor() {
    this.makeOwO = function () {
      this.value = this.value.replace(/r|l/g, "w").replace(/R|L/g, "W");
    };
  }

  setup() {
    let self = this;
    let textarea = document.querySelector(".channel-text-area-default textarea");
    textarea.addEventListener("input", self.makeOwO);
  }

  cleanUp() {
    let textarea = document.querySelector(".channel-text-area-default textarea");
    textarea.removeEventListener("input", this.makeOwO);
  }

  load() {}

  start() {
    console.log("OwO what's this?");
    this.setup();
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
  getDescription () { return "Replaces all l's and r's in your own messages with w's"; }
  getVersion     () { return "0.2.0"; }
  getAuthor      () { return "kaloncpu57"; }
}
