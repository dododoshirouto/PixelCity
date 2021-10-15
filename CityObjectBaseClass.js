class CityObjectBase {
  
  elem = null;
  
  localPosX = 0;
  nextLocalPosX = 0;
  
  height = 0;
  width = 0;
  
  constructor() {
    
  }
  
  update = function(){};
  
  draw = function(){};
}



class CityObjectNormalBuilding extends CityObjectBase {
  constructor (parent, localPosX) {
    this.localPosX = localPosX;
    
    this.height = Math.sin(randomRange(0,Math.PI)) * 20 + 5;
    this.width = Math.sin(randomRange(0,Math.PI)) * 10 + 5;
    
    
  }
}