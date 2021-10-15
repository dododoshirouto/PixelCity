class CityBase {
  
  buildingsLine = Math.floor(randomRange(3,10));
  buildingLineHeight = randomRange(10,100);
  
  skyColors = [
    {time:0, weather:'clear', colors: ['#88bbff', '#edf8ff']},
  ];
  
  scrollX = 0;
  
  objects = [[]];
  
  constructor() {
    
  }
  
  update = function() {
    
  }
  
  draw = function() {
    
  }
}