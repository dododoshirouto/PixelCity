class CityObjectBase {
  
  elem = null;
  
  localPosX = 0;
  nextLocalPosX = 0;
  
  height = 0;
  width = 0;
  
  canvas = null;
  ctx = null;
  
  constructor() {
    
  }
  
  create(parent) {
    this.canvas = document.createElement('canvas');
    parent.append(this.canvas);
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.ctx = this.canvas.getContext('2d');
  }
  
  update(){};
  
  draw(){};
}



class CityObjectNormalBuilding extends CityObjectBase {
  constructor (parent, localPosX) {
    super();
    
    this.localPosX = localPosX;
    
    this.height = Math.sin(randomRange(0,Math.PI)) * 20 + 5;
    this.width = Math.sin(randomRange(0,Math.PI)) * 10 + 5;
    
    this.create(parent);
  }
  
  ctrate(parent) {
    super.create(parent);
    
    this.ctx.fillStyle = '#ff0000';
    this.ctx.fillRect(0, 0, this.width, this.height);
  }
  
  update(){
    console.log(this.canvas.offsetTop);
  }
}