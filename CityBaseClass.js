class CityBase {
  
  buildingsLine = 0;
  buildingLineHeight = 0;
  
  skyColors = [
    {time:0, weather:'clear', colors: ['#88bbff', '#edf8ff']},
  ];
  
  scrollX = 0;
  
  objects = [[]];
  
  lineElements = [];
  
  constructor() {
    this.buildingsLine = Math.floor(randomRange(3,10));
    this.buildingLineHeight = randomRange(10,100);
    
    for(let i=0; i<=this.buildingsLine; i++) {
      this.lineElements[i] = document.createElement("div");
      main.append(this.lineElements[i]);
      this.lineElements[i].classList.add('line-element');
      this.lineElements[i].style.zIndex = 100 - i*10;
      this.lineElements[i].style.top = height - i*this.buildingLineHeight +'px';
    }
    
    setInterval(_=>{
      this.update();
      this.draw();
    }, 100);
  }
  
  update() {
    this.objects.map(v=>v.map(vv=>vv.update()));
  }
  
  draw() {
    this.objects.map(v=>v.map(vv=>vv.draw()));
  }
}


class CityNormal extends CityBase {
  constructor() {
    super();
    
    this.objects[0][0] = new CityObjectNormalBuilding(this.lineElements[0], 0);
  }
}