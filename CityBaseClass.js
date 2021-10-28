class CityBase {

  buildingsLine = 0;
  buildingLineHeight = 0;
  fill_width = [];

  scrollSpeedMax = randomRange(180, 6);
  scrollSpeedMin = randomRange(0.006, this.scrollSpeedMax/2);


  colors = [
    { time: 0, weather: 'clear', skyColors: [Color.HEX('#888888'), Color.HEX('#ffffff')], objectColors: [Color.HEX('#000000'), Color.HEX('#888888')]},
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
      this.objects[i] = [];
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
      
    }, 1);
  }

  update() {
    for (let i=0; i<this.buildingsLine; i++) {
      this.lineScrollX[i] += Math.lerp(this.scrollSpeedMin, this.scrollSpeedMax, 1-Math.pow((i / (this.buildingsLine-1)), 2)) * Times.deltaTime;
    }
    this.createObjects();
    this.objects.map((v,i)=>v.map(vv=>vv.update(i, this.lineScrollX[i])));
    
    Times.endDeltaTime();
    console.log(Times.deltaTime);
  }

  draw() {
    let background = 'linear-gradient(0deg, $1, $2)'.format(
      this.getColor().skyColors[0].toHEX(),
      this.getColor().skyColors[1].toHEX()
      );
    if (background != mainElem.style.backgroundImage) {
      mainElem.style.backgroundImage = background;
    }
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
  
  getColor() {
    return this.colors[0];
  }
}


class CityNormal extends CityBase {
  constructor() {
    super();
  }

  createObjects() {
    
    for (let i = 0; i < this.buildingsLine; i++) {
      // this.fill_width[i] = 0;
      
      for (let ii=0; ii<= this.objects[i].length; ii++) {
        let obj = this.objects[i][ii];
        if (!obj) continue;
        if (obj.localPosX + obj.width - this.lineScrollX[i] < 0) {
          obj.destroy();
          this.objects[i][ii] = null;
        }
      }
      
      this.objects[i] = this.objects[i].filter(v=>v);
      
      while (this.fill_width[i] <= width + this.lineScrollX[i]) {
        let obj = new CityObjectNormalBuilding(this, this.lineElements[i], this.fill_width[i], Color.lerp(this.getColor().objectColors[0], this.getColor().objectColors[1], i / (this.buildingsLine-1)).toHEX() );
        this.objects[i].push(obj);
        this.fill_width[i] += obj.width + randomRange(-5, 5);
      }
    }
  }
}