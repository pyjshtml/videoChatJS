let vScore = 0;
let birds = [];
let pipes = [];
function init(){
  window.canvas = $("canvas");
  canvas.width = 600;
  canvas.height = 600;
  window.ctx = canvas.getContext("2d");
  pipes.push(new Pipe());
  let bird = new Bird();
  document.body.onkeydown = function(){
    if(event.keyCode == 38){bird.up()}
  }
  document.body.onclick = function(event){
    event.preventDefault();
    bird.up();
    return false;
  }
  window.itr = window.setInterval(function(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = "#000";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    bird.update();
    bird.show();
    let c = 0; // closest index
    let cD = Infinity;
    for(let j = 0; j < pipes.length; j++){
      if(pipes[j].x - bird.x < cD && (pipes[j].x + pipes[j].width) - (bird.x + bird.r)  > 0){
        cD = pipes[j].x - bird.x;
        c = j;
      }
    }
    if(bird.x + bird.r >= pipes[c].x && (bird.y + bird.r >= pipes[c].y + pipes[c].spacingY || bird.y - bird.r <= pipes[c].y)){
      clearInterval(itr);
    }
    for(let i = 0; i < pipes.length; i++){
      pipes[i].show();
      pipes[i].update();
    }
    if(pipes.length > 0){
      if(pipes[pipes.length-1].x+pipes[pipes.length-1].width <= canvas.width-pipes[pipes.length-1].spacingX){
        pipes.push(new Pipe());
      }
      if(pipes[0].x + pipes[0].width < 0){
        pipes.splice(0,1);
        vScore++;
      }
    }
    ctx.font = "20px Georgia";
    ctx.fillText(`Score: ${vScore}`, 20,20)
  },30);
}
