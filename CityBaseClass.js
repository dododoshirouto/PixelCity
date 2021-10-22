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
    this.buildingsLine = Math.floor(randomRange(3,10));
    this.buildingLineHeight = randomRange(10,30);

    for(let i=0; i<=this.buildingsLine; i++) {
      this.lineElements[i] = document.createElement("div");
      main.append(this.lineElements[i]);
      this.lineElements[i].classList.add('line-element');
      this.lineElements[i].style.zIndex = 100 - i*10;
      this.lineElements[i].style.top = (height - i * this.buildingLineHeight) * render_pixel_multip + 'px';
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
      this.lineElements[i].style.top = (height - i * this.buildingLineHeight) * render_pixel_multip + 'px';
    }
    this.objects.map(v => v.map(vv => vv.resize()));
  }
}


class CityNormal extends CityBase {
  constructor() {
    super();

    for (let i = 0; i < this.lineElements.length; i++) {
      let fill_width = 0;
      this.objects[i] = [];
      while (fill_width <= width) {
        let obj = new CityObjectNormalBuilding(this.lineElements[i], fill_width, Color.lerp(Color.HEX('#edf8ff'), Color.HEX('#88bbff'), i / (this.lineElements.length-1)) );
        this.objects[i].push(obj);
        fill_width += obj.width + randomRange(-5, 5);
      }
    }
  }
}