render_pixel_multip_level = 2;
render_pixel_multip = Math.pow(2, render_pixel_multip_level);

cityObject = null;

const $ = function(selector, parent=document) {
  return Array.from(parent.querySelectorAll(selector));
}

const randomRange = function(min, max) {
  return Math.min(max,min) + Math.random()*Math.abs(max-min);
}

const mainElem = $('div#main')[0];
// const mainElem = document.body;

height = 0;
width = 0;
const getPageSize = function (level = render_pixel_multip_level) {
  render_pixel_multip_level = level;
  render_pixel_multip = Math.pow(2, render_pixel_multip_level);
  // height = mainElem.clientHeight;
  // width = mainElem.clientWidth;
  height = mainElem.clientHeight / render_pixel_multip;
  // height = window.innerHeight / render_pixel_multip;
  width = window.innerWidth / render_pixel_multip;

  if (cityObject) cityObject.resize();
}
queryAddEventListeners([window], "load resize", _=>{getPageSize()});