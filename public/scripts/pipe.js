function Pipe(){
  this.spacingX = 200; // 275
  this.spacingY = 160; // 175
  this.width = 75;
  this.speed = 5;
  this.x = canvas.width;
  this.y = Math.floor(Math.random()*(canvas.height-this.spacingY));
}
Pipe.prototype.show = function () {
  ctx.fillStyle = "#FFF";
  // ctx.fillRect(this.x,0,this.width,this.y);
  ctx.drawImage($("pipeu"),this.x,0,this.width,this.y);
  // ctx.fillRect(this.x,this.y+this.spacingY,this.width,canvas.height);
  ctx.drawImage($("pipe"),this.x,this.y+this.spacingY,this.width,canvas.height-(this.y+this.spacingY));
};
Pipe.prototype.update = function () {
  this.x -= this.speed;
}
