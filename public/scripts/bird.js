const gravity = 1;
function line(x0,y0,x1,y1){
  ctx.beginPath();
  ctx.moveTo(x0,y0);
  ctx.lineTo(x1,y1);
  ctx.stroke();
}
function Bird(){
  this.x = 150;
  this.r = 18;
  this.velocity = 0;
  this.y = canvas.height / 2;
  this.score = 0;
}
Bird.prototype.show = function () {
  ctx.beginPath();
  ctx.fillStyle = "#FF0000";
  ctx.arc(this.x,this.y,this.r,0,Math.PI*2);
  ctx.fill();
  line(this.x,this.y-this.r/2,this.x,this.y+this.r/2);
  line(this.x-this.r/2,this.y,this.x,this.y+(this.velocity<=0?-1:1)*this.r/2);
  line(this.x+this.r/2,this.y,this.x,this.y+(this.velocity<=0?-1:1)*this.r/2);
};
Bird.prototype.up = function(){
  this.velocity -= 14;
}
Bird.prototype.update = function(){
  if(this.velocity < -14){
    this.velocity = -14;
  } else if(this.velocity > 14){
    this.velocity = 14
  }
  this.velocity += gravity;
  this.y += this.velocity;
  if(this.y+this.r > canvas.height){
    this.velocity = 0;
    this.y = canvas.height-this.r;
  } else if (this.y - this.r < 0){
    this.velocity = gravity;
    this.y = this.r;
  }
  this.score++;
}
