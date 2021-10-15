const $ = function(selector, parent=document) {
  return Array.from(parent.querySelectorAll(selector));
}

const randomRange = function(min, max) {
  return Math.min(max,min) + Math.random()*Math.abs(max-min);
}

const mainElem = $('div#main')[0];

height = 0;
width = 0;
const getPageSize = function() {
  height = mainElem.innerHeight;
  width = mainElem.innerWidth;
}
queryAddEventListeners([window], "load resize", getPageSize);