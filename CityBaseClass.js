class CityBase {

  buildingsLine = 0;
  buildingLineHeight = 0;

  skyColors = [
    { time: 0, weather: 'clear', colors: [Color.HEX('#88bbff'), Color.HEX('#edf8ff')], objectColors: [Color.HEX('#edf8ff'), Color.HEX('#88bbff')]},
  ];

  scrollX = 0;

  objects = [[]];

  lineElements = [];

  constructor() {
    this.buildingsLine = Math.floor(randomRange(3,20));
    this.buildingLineHeight = randomRange(0,8);

    for(let i=0; i<=this.buildingsLine; i++) {
      this.lineElements[i] = document.createElement("div");
      main.append(this.lineElements[i]);
      this.lineElements[i].classList.add('line-element');
      this.lineElements[i].style.zIndex = 1000 - i*10;
      this.lineElements[i].style.top = Math.round(height - i * this.buildingLineHeight) * render_pixel_multip + 'px';
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

  resize() {
    for (let i = 0; i <= this.buildingsLine; i++) {
      this.lineElements[i].style.top = Math.round(height - i * this.buildingLineHeight) * render_pixel_multip + 'px';
    }
    this.objects.map(v => v.map(vv => vv.resize()));
  }
}


class CityNormal extends CityBase {
  constructor() {
    super();

    for (let i = 0; i < this.buildingsLine; i++) {
      let fill_width = 0;
      this.objects[i] = [];
      while (fill_width <= width) {
        let obj = new CityObjectNormalBuilding(this.lineElements[i], fill_width, Color.lerp(Color.HEX('#edf8ff'), Color.HEX('#00439c'), i / (this.buildingsLine-1)).toHEX() );
        this.objects[i].push(obj);
        fill_width += obj.width + randomRange(-5, 5);
      }
    }
  }
}