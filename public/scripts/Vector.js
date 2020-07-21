class Vector{
  constructor(x,y){
    this.x = x;
    this.y = y;
  }
  set(x,y){
    this.x = x;
    this.y = y;
  }
  add(otherVector){
    this.x += otherVector.x;
    this.y += otherVector.y;
  }
  scalarX(scalar){
    this.x *= scalar;
  }
  scalarY(scalar){
    this.x *= scalar;
  }
}
