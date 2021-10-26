class CityBase {

  buildingsLine = 0;
  buildingLineHeight = 0;
  fill_width = [];
  
  scrollSpeedMax = 10;
  scrollSpeedMin = 3;
  

  skyColors = [
    { time: 0, weather: 'clear', colors: [Color.HEX('#88bbff'), Color.HEX('#edf8ff')], objectColors: [Color.HEX('#edf8ff'), Color.HEX('#88bbff')]},
  ];

  lineScrollX = [];

  objects = [[]];

  lineElements = [];

  constructor() {
    this.buildingsLine = Math.floor(randomRange(3,20));
    this.buildingLineHeight = randomRange(0,8);

    for(let i=0; i<=this.buildingsLine; i++) {
      this.fill_width[i] = 0;
      this.lineScrollX[i] = 0;
      this.lineElements[i] = document.createElement("div");
      main.append(this.lineElements[i]);
      this.lineElements[i].classList.add('line-element');
      this.lineElements[i].style.zIndex = 1000 - i*10;
      this.lineElements[i].style.top = Math.round(height - i * this.buildingLineHeight) * render_pixel_multip + 'px';
    }
    
    this.createObjects();

    setInterval(_=>{
      this.update();
      this.draw();
    }, 100);
  }

  update() {
    for (let i=0; i<this.buildingsLine; i++) {
      this.lineScrollX[i] += Math.lerp(this.scrollSpeedMin, this.scrollSpeedMax, i / (this.buildingsLine-1))
    }
    this.createObjects();
    this.objects.map((v,i)=>v.map(vv=>vv.update(i, this.lineScrollX[i])));
  }

  draw() {
    this.objects.map((v,i)=>v.map(vv=>vv.draw(i, this.lineScrollX[i])));
  }

  resize() {
    for (let i = 0; i <= this.buildingsLine; i++) {
      this.lineElements[i].style.top = Math.round(height - i * this.buildingLineHeight) * render_pixel_multip + 'px';
    }
    this.objects.map(v => v.map(vv => vv.resize()));
  }
  
  createObjects() {
    
  }
}


class CityNormal extends CityBase {
  constructor() {
    super();
  }
  
  createObjects() {
    for (let i = 0; i < this.buildingsLine; i++) {
      // this.fill_width[i] = 0;'
      this.objects[i] = [];
      while (this.fill_width[i] <= width + this.lineScrollX[i]) {
        let obj = new CityObjectNormalBuilding(this.lineElements[i], this.fill_width[i], Color.lerp(Color.HEX('#edf8ff'), Color.HEX('#00439c'), i / (this.buildingsLine-1)).toHEX() );
        this.objects[i].push(obj);
        this.fill_width[i] += obj.width + randomRange(-5, 5);
      }
    }
  }
}