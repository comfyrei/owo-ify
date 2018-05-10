//META{"name":"owoify"}*//

class owoify {
  constructor() {
    this.makeOwO = function (e) {
      if (e.keyCode == 13) {
        // this.value = this.value.replace(/r|l/g, "w").replace(/R|L/g, "W");
        let txt = this.value.replace(/r|l/g, "w").replace(/R|L/g, "W");
        this.focus();
        document.execCommand("selectAll");
        document.execCommand("insertText", true, txt);
      }
    };
  }

  setup() {
    let self = this;
    let textarea = document.querySelector('textarea');
    textarea.addEventListener("keydown", self.makeOwO);
  }

  cleanUp() {
    let textarea = document.querySelector('textarea');
    textarea.removeEventListener("keydown", this.makeOwO);
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
  getVersion     () { return "0.2.3"; }
  getAuthor      () { return "kaloncpu57"; }
}
