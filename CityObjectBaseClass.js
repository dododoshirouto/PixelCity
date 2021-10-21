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
  
  create = function(parent) {
    this.canvas = document.createElement('canvas');
    parent.append(this.canvas);
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.ctx = this.canvas.getContext('2d');
  }
  
  update = function(){};
  
  draw = function(){};
}



class CityObjectNormalBuilding extends CityObjectBase {
  constructor (parent, localPosX) {
    super();
    
    this.localPosX = localPosX;
    
    this.height = Math.sin(randomRange(0,Math.PI)) * 20 + 5;
    this.width = Math.sin(randomRange(0,Math.PI)) * 10 + 5;
    
    this.create(parent);
  }
}