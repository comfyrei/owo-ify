//META{"name":"greentext"}*//

var greentext = function(){};

function htmlEncode(s) {
  return $("<div>").text(s).html();
}

greentext.main = function (elem) {
  if ($(elem).find(".greentext") == []) return;
  var lines = $(elem).text().split("\n");
  lines.forEach(function (i) {
    i = htmlEncode(i);
    if (i.substr(0, 4) == "&gt;") {
      $(elem).html(function (_, html) {
        return html.replace(i, '<span class="greentext">' + i + '</span>');
      });
    }
  });
};

greentext.prototype.start = function () {
  $(".markup").each(function () {
    greentext.main(this);
  });
};

greentext.prototype.load = function () {
  BdApi.injectCSS("greentext-stylesheet", ".markup>.greentext{color:#789922!important;}");
};

greentext.prototype.onMessage = function () {
  $(".markup").each(function () {
    greentext.main(this);
  });
};

greentext.prototype.onSwitch = function () {
  $(".markup").each(function () {
    greentext.main(this);
  });
};

greentext.prototype.getName = function () {
  return "greentext plugin";
};

greentext.prototype.getDescription = function () {
  return "Make lines that start with \">\" into greentext";
};

greentext.prototype.getVersion = function () {
  return "0.0.1";
};

greentext.prototype.getAuthor = function () {
  return "kaloncpu57";
};
