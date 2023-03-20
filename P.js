'use strict';
const GameWidth = 400,  GameHeight = 600,
      GameOWidth = 270, GameOHeight = 54,
      Bricknumber = 10, BrickHeight = 15,
      BrickInumber = 5, BrickIWidth = 24, BrickIHeight = 30,
      BrickI2number = 2, BrickI2Width = 16, BrickI2Height = 24,
      ElvesHeight = 30, ElvesWidth = 24;
const BRICKCOLOR = [ '#E166A3', '#A7D3A6', '#D399FF'];
const BRICKBORDERCOLOR = [ '#91CFDE', '#884E1B', '#FFC533'];
const BRICKWIDTH = [ 50, 100, 150];
const container = document.getElementById('container');

class Component{
  constructor(){
    this.node = document.createElement('div');
    this.node.style.left = '0px';
    this.node.style.top = '0px'
    container.appendChild(this.node);
  }
}

class Brick extends Component{
  constructor( x, y, w, c1, c2 ){
    super();
    this.node.setAttribute('class', 'brick');
    this.node.style.left = x +'px';
    this.node.style.top = y +'px';
    this.node.style.width = w+'px';
    this.node.style.backgroundColor = c1;
    this.node.style.borderColor = c2;
    this.move = { x:randInt(-3,3), y:1, y2:7 };
  }
  getX(){ return parseInt(this.node.style.left); }
  getY(){ return parseInt(this.node.style.top); }
  getW(){ return parseInt(this.node.style.width); }
  del(){ this.node.style.display = 'none'; }
  movebrick(){
    let x = Math.max(0, Math.min( parseInt(this.node.style.left)+this.move.x, GameWidth-parseInt(this.node.style.width) ));
    let y = parseInt(this.node.style.top)+this.move.y;
    this.node.style.left = x+'px';
    this.node.style.top = y+'px';
    if ( x>=GameWidth-parseInt(this.node.style.width) || x<=0 ) { this.move.x = -this.move.x; }
    if ( y+BrickHeight>=GameHeight ) { return false; }
  }
  movebrick2(){
    let x = Math.max(0, Math.min( parseInt(this.node.style.left)+this.move.x2*2, GameWidth-parseInt(this.node.style.width) ));
    let y = parseInt(this.node.style.top)+this.move.y2;
    this.node.style.left = x+'px';
    this.node.style.top = y+'px';
    if ( x>=GameWidth-parseInt(this.node.style.width) || x<=0 ) { this.move.x2 = -this.move.x2; }
    if ( y+BrickHeight>=GameHeight ) { return false; }
  }
}

class Brickitem extends Component{
  constructor( x, y ){
    super();
    this.node.setAttribute('class', 'brickitem');
    this.node.style.left = x +'px';
    this.node.style.top = y +'px';
  }
  del(elves){
    if( elves.getX()<=parseInt(this.node.style.left)+BrickIWidth &&
        elves.getX()+ElvesWidth>=parseInt(this.node.style.left) &&
        elves.getY()<=parseInt(this.node.style.top)+BrickIHeight &&
        elves.getY()+ElvesHeight>=parseInt(this.node.style.top) ){
      this.node.style.display = 'none';
      score ++;
      document.getElementById('s').innerHTML = score;
      return true;}
  }
}

class Brickitem2 extends Component{
  constructor( x, y ){
    super();
    this.node.setAttribute('class', 'brickitem2');
    this.node.style.left = x +'px';
    this.node.style.top = y +'px';
    this.move = { x:randInt(-2,2), y:randInt(-2,2)};
  }
  movebrickitem2(){
    let x = Math.max(0, Math.min( parseInt(this.node.style.left)+this.move.x, GameWidth-BrickI2Width ));
    let y = parseInt(this.node.style.top)+this.move.y;
    this.node.style.left = x+'px';
    this.node.style.top = y+'px';
    if ( x>=GameWidth-BrickI2Width || x<=0 ) { this.move.x = -this.move.x; }
    if ( y+BrickI2Height>=GameHeight || y<=0 ) { this.move.y = -this.move.y; }
  }
  del(brick, elves){
    if( elves.getX()<=parseInt(this.node.style.left)+BrickI2Width &&
        elves.getX()+ElvesWidth>=parseInt(this.node.style.left) &&
        elves.getY()<=parseInt(this.node.style.top)+BrickI2Height &&
        elves.getY()+ElvesHeight>=parseInt(this.node.style.top) ){
      this.node.style.display = 'none';
      for (let i=0; i<Bricknumber; i++){
        brick[i].movebrick2();}
      return true;}
  }
}

class Elves extends Component{
  constructor( x, y ){
    super();
    this.node.setAttribute('id', 'elves');
    this.node.style.left = x +'px';
    this.node.style.top = y +'px';
    this.move = { x:5, y:70, y_downo:2, y_downg:1 };
  }
  getX() { return parseInt(this.node.style.left); }
  getY() { return parseInt(this.node.style.top); }
  del(){ this.node.style.display = 'none'; }
  move_xr(){
    let xr = Math.max(0, Math.min( parseInt(this.node.style.left)+this.move.x, GameWidth-ElvesWidth ));
    if ( xr+ElvesWidth>=GameWidth ) { this.node.style.left = GameWidth-ElvesWidth+'px'; }
    else { this.node.style.left = xr+'px'; }
  }
  move_xl(){
    let xl = Math.max(0, Math.min( parseInt(this.node.style.left)-this.move.x, GameWidth-ElvesWidth ));
    if ( xl<=0 ) { this.node.style.left = 0+'px'; }
    else { this.node.style.left = xl+'px'; }
  }
  move_y(){
    let y = Math.max(0, Math.min( parseInt(this.node.style.top)-this.move.y, GameHeight-ElvesHeight ));
    if ( y<=0 ) { this.node.style.left = 0+'px'; }
    else { this.node.style.top = y+'px'; }
  }
  movedown(brick, i){
    let y = parseInt(this.node.style.top)+this.move.y_downo;
    if ( brick[i].getX()-ElvesWidth<=parseInt(this.node.style.left) &&
         brick[i].getX()+brick[i].getW()>=parseInt(this.node.style.left) &&
         brick[i].getY()<=parseInt(this.node.style.top)+ElvesHeight+4 &&
         brick[i].getY()>=parseInt(this.node.style.top)+ElvesHeight-4 ){
      this.node.style.top = y+'px';
      return true;}
    else { return false; }
  }
  movedown_gravity(brick){
    for ( let i=1; i<=10 ; i++ ){
      let y = parseInt(this.node.style.top)+this.move.y_downg;
      this.node.style.top = y+'px';
      for ( let i=9; i>=0 ; i-- ){
        if ( brick[i].getX()<=parseInt(this.node.style.left) &&
             brick[i].getX()+brick[i].getW()>=parseInt(this.node.style.left)+ElvesWidth &&
             brick[i].getY()<=parseInt(this.node.style.top)+ElvesHeight+4 &&
             brick[i].getY()>=parseInt(this.node.style.top)+ElvesHeight-4 ){
          y=brick[i].getY();
          break;}}
      }
  }
}

class Game extends Component{
  constructor(){
    super();
  }
  gameover(){
    this.node.setAttribute('id', 'gameover');
    this.node.style.left = (GameWidth-GameOWidth)/2 +'px';
    this.node.style.top = (GameHeight-GameOHeight)/2 +'px';
  }
}

let brick = new Array(Bricknumber);
brick[9] = new Brick(125, 560, BRICKWIDTH[2], BRICKCOLOR[2], BRICKBORDERCOLOR[2]);
for (let i=8; i>=0; i--){
  let j = randInt(0,2);
  let BrickWidth = BRICKWIDTH[j];
  let BrickColor = BRICKCOLOR[j];
  let BrickBorderColor = BRICKBORDERCOLOR[j];
  let BrickXGap = randInt(30,50)
  let BrickYGap = randInt(50,65)
  if ( brick[i+1].getX()+BrickXGap+BrickWidth<GameWidth ) {
    brick[i] = new Brick(brick[i+1].getX()+BrickXGap, brick[i+1].getY()-BrickYGap, BrickWidth, BrickColor, BrickBorderColor);}
  else if ( brick[i+1].getX()-BrickXGap>0 ) {
    brick[i] = new Brick(brick[i+1].getX()-BrickXGap, brick[i+1].getY()-BrickYGap, BrickWidth, BrickColor, BrickBorderColor);}
  else {
    brick[i] = new Brick( 10, brick[i+1].getY()-BrickYGap, BrickWidth, BrickColor, BrickBorderColor);}
}
let score=0;
let brickitem = new Array(BrickInumber);
for (let i=0; i<BrickInumber; i++){
  let j = randInt(0,9);
  brickitem[i] = new Brickitem( brick[j].getX()+(brick[j].getW()-BrickIWidth)/2, brick[i+1].getY()-BrickIHeight);
}
let brickitem2 = new Array(BrickI2number);
for (let i=0; i<BrickI2number; i++){
  brickitem2[i] = new Brickitem2( randInt(50, GameWidth-50-BrickI2Width), randInt(100, GameHeight-100-BrickI2Height));
}
let elves = new Elves( brick[4].getX()+brick[4].getW()/2-10, brick[4].getY()-ElvesHeight );
let game_o = new Game()

let timer = setInterval( function() {
  let flag=true;
  for ( let i=9; i>=0 ; i-- ){
    if ( elves.movedown(brick, i) ) {
      elves.movedown(brick, i);
      flag=false; }
    if ( brick[i].movebrick()==false ){
      brick[i].del()
      let j = randInt(0,2);
      brick[i] = new Brick(randInt(10, GameWidth-BRICKWIDTH[j]), 0, BRICKWIDTH[j], BRICKCOLOR[j], BRICKBORDERCOLOR[j]); }
    else { brick[i].movebrick();}
  }
  for (let i=0; i<BrickI2number; i++){
    brickitem2[i].movebrickitem2();
  }
  if ( flag ){ elves.movedown_gravity(brick); }
  if ( elves.getY()+ElvesHeight>=GameHeight ) {
    clearInterval(timer);
    game_o.gameover(); }
},100 );

window.addEventListener('keydown', function(e){
  e = e || window.event;
  if( e.key=='ArrowRight' ) {
    elves.move_xr();
    for (let i=0; i<BrickInumber; i++){
      brickitem[i].del(elves);
      if ( brickitem[i].del(elves) ){
        let j = randInt(0,9);
        brickitem[i] = new Brickitem( brick[j].getX()+(brick[j].getW()-BrickIWidth)/2, brick[i+1].getY()-BrickIHeight);
        break;}
    }
    for (let i=0; i<BrickI2number; i++){
      brickitem2[i].del(brick, elves);
      if ( brickitem2[i].del(brick, elves) ){
        brickitem2[i] = new Brickitem2( randInt(50, GameWidth-50-BrickI2Width), randInt(100, GameHeight-100-BrickI2Height));
        break;}
    }
  }
  if( e.key=='ArrowLeft' ) {
    elves.move_xl();
    for (let i=0; i<BrickInumber; i++){
      brickitem[i].del(elves);
      if ( brickitem[i].del(elves) ){
        let j = randInt(0,9);
        brickitem[i] = new Brickitem( brick[j].getX()+(brick[j].getW()-BrickIWidth)/2, brick[i+1].getY()-BrickIHeight);
        break;}
    }
    for (let i=0; i<BrickI2number; i++){
      brickitem2[i].del(brick, elves);
      if ( brickitem2[i].del(brick, elves) ){
        brickitem2[i] = new Brickitem2( randInt(50, GameWidth-50-BrickI2Width), randInt(100, GameHeight-100-BrickI2Height));
        break;}
    }
  }
  if( e.key=='ArrowUp' ) {
    for ( let i=9; i>=0 ; i-- ){
      if ( elves.movedown(brick, i) ){
        elves.move_y();
        for (let i=0; i<BrickInumber; i++){
          brickitem[i].del(elves);
          if ( brickitem[i].del(elves) ){
            let j = randInt(0,9);
            brickitem[i] = new Brickitem( brick[j].getX()+(brick[j].getW()-BrickIWidth)/2, brick[i+1].getY()-BrickIHeight);
            break;}
        }
        for (let i=0; i<BrickI2number; i++){
          brickitem2[i].del(brick, elves);
          if ( brickitem2[i].del(brick, elves) ){
            brickitem2[i] = new Brickitem2( randInt(50, GameWidth-50-BrickI2Width), randInt(100, GameHeight-100-BrickI2Height));
            break;}
        }
        break;}}
  }
});

function randInt(start, end){
    return Math.floor(Math.random()*(end-start+1)+start);
}
