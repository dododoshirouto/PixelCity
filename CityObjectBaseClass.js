class CityObjectBase {

  city = null;
  elem = null;

  localPosX = 0;
  nextLocalPosX = 0;

  height = 0;
  width = 0;

  canvas = null;
  ctx = null;

  color = "#000000FF";

  constructor(city, parent, localPosX, color) {
    // this.parent = parent;
    this.city = city;
    this.localPosX = localPosX;
    this.color = color;
  }

  create(parent) {
    this.canvas = document.createElement('canvas');
    this.canvas.classList.add('object-canvas');
    parent.append(this.canvas);
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.canvas.style.top = -Math.round(this.height) * render_pixel_multip + 'px';
    this.canvas.style.width = Math.round(this.width) * render_pixel_multip + 'px';
    this.canvas.style.height = Math.round(this.height) * render_pixel_multip + 'px';
    this.canvas.style.left = Math.round(this.localPosX) * render_pixel_multip + 'px';
    this.ctx = this.canvas.getContext('2d');
  }

  update(lineNm, scrollX){
    this.canvas.style.left = (this.localPosX - scrollX) * render_pixel_multip + 'px';
  }

  draw(lineNm, scrollX){}

  resize(){
    this.canvas.style.top = -Math.round(this.height) * render_pixel_multip + 'px';
    this.canvas.style.width = Math.round(this.width) * render_pixel_multip + 'px';
    this.canvas.style.height = Math.round(this.height) * render_pixel_multip + 'px';
  }
  
  destroy() {
    if (this.elem) this.elem.remove();
    // this = null;
  }
}



class CityObjectNormalBuilding extends CityObjectBase {
  constructor (city, parent, localPosX, color) {
    super(city, parent, localPosX, color);

    this.height = Math.round(Math.sin(randomRange(0,Math.PI)) * 20 + 5);
    this.width = Math.round(Math.sin(randomRange(0,Math.PI)) * 10 + 5);

    this.create(parent);
  }

  create(parent) {
    super.create(parent);

    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(0, 0, this.width, this.height);
    for (let x=0; x<(this.width-2)/2-1; x++) {
      for (let y=0; y<(this.height-4)/2-1; y++) {
        if (Math.random()<0.7) this.ctx.clearRect(1+x*2, 2+y*2, 1, 1);
      }
    }
  }


}