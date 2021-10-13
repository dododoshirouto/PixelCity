const $ = function(selector, parent=document) {
  return Array.from(parent.querySelectorAll(selector));
}

const mainElem = $('div#main')[0];

height = 0;
width = 0;
const getPageSize = function() {
  height = mainElem.innerHeight;
  width = mainElem.innerWidth;
}
queryAddEventListeners([window], "load resize", getPageSize);