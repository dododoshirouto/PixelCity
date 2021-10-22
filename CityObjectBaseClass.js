class CityObjectBase {

  elem = null;

  localPosX = 0;
  nextLocalPosX = 0;

  height = 0;
  width = 0;

  canvas = null;
  ctx = null;

  color = new Color();

  constructor(parent, localPosX, color) {
    this.localPosX = localPosX;
    this.color = color;
  }

  create(parent) {
    this.canvas = document.createElement('canvas');
    this.canvas.classList.add('object-canvas');
    parent.append(this.canvas);
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.canvas.style.top = -this.height * render_pixel_multip + 'px';
    this.canvas.style.width = this.width * render_pixel_multip + 'px';
    this.canvas.style.height = this.height * render_pixel_multip + 'px';
    this.canvas.style.left = this.localPosX * render_pixel_multip + 'px';
    this.ctx = this.canvas.getContext('2d');
  }

  update(){}

  draw(){}

  resize(){
    this.canvas.style.top = -this.height * render_pixel_multip + 'px';
    this.canvas.style.width = this.width * render_pixel_multip + 'px';
    this.canvas.style.height = this.height * render_pixel_multip + 'px';
  }
}



class CityObjectNormalBuilding extends CityObjectBase {
  constructor (parent, localPosX, color) {
    super(parent, localPosX, color);

    this.height = Math.sin(randomRange(0,Math.PI)) * 20 + 5;
    this.width = Math.sin(randomRange(0,Math.PI)) * 10 + 5;

    this.create(parent);
  }

  create(parent) {
    super.create(parent);

    this.ctx.fillStyle = this.color.toHEX();
    this.ctx.fillRect(0, 0, this.width, this.height);
  }

  update(){

  }
}