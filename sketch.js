let nbarray = [];
let button;
let detailX;
// 初始內容
function setup() {
  createCanvas(960, 460, WEBGL); // 決定 使用 3D 方式進行渲染
  for(let i=0;i<5;i+=1){
    // 主物件(大小)
    nbarray.push(new myBox(50,-height/2+(height/5)*i,0,65));
  }
  button = createButton('說明');
  button.position(480, 470);
  button.mousePressed(rule);
  
  detailX = createSlider(2, 24, 12);
  detailX.position(10, height + 5);
  detailX.style('width', '80px');
}

function rule() {
  window.alert('滑鼠位置改變背景顏色');
  window.alert('滑桿改變背景線條');
  window.alert('當滑鼠觸碰到飛天鑽石會使其發瘋亂轉');
  window.alert('—且使其焦慮移動');
}


function draw() {
  background(0,0,0);
    rotateX(frameCount*0.01);
    rotateY(frameCount*0.01);
  // 將袋子中 所有 東西 稱為 V 執行他的相關函式
  nbarray.forEach((v)=>{
    v.display();
  })
  rotateY(millis() / 1000);
  noFill();
  stroke(mouseX,mouseY,25);
  ellipsoid(600, 800, 800, detailX.value(), 16);
}

// 自訂一個類別物件
class myBox{ //主物件建構方式
  constructor(x,y,z,size){
    this.x=x;
    this.y=y;
    this.z=z;
    this.size=size*0.8;
    //主物件X軸移動
    this.mx = 1.3;
    this.my = 0.8;
    this.cc = color(random(255),0,random(255));
    rotateX(frameCount * 0.01);
    rotateZ(frameCount * 0.01);
    // 衛星的中心xyz = 物件，衛星的大小 < 物件， 衛星的距離自訂
    this.stela = new stela(this.x,this.y,this.z,this.size*0.5,this.size*2);
    this.stela2 = new stela2(this.x,this.y,this.z,this.size*0.5,this.size*3);
  }
  
  // 能力1:顯現這box
  display(){
    push();
      translate(this.x,this.y,this.z);   //接觸這個範圍的改變
      if (mouseX-width/2 > this.x-this.size/2 && 
          mouseX-width/2 < this.x+this.size/2 &&
          mouseY-height/2 > this.y-this.size/2 && 
          mouseY-height/2 < this.y+this.size/2){
        rotateX(frameCount*0.3);
        rotateY(frameCount*0.3);
        rotateZ(frameCount*0.3);
        this.mx = this.mx+12;//增加主物件X軸移動速度
        this.mx = this.my+8;
        this.cc = color(random(255),random(255),random(255));
        }
      this.stela.display();
      this.stela2.display();
      fill(this.cc);
      noStroke();
      cone(this.size);
    pop();
    this.move();
  }
  //能力2:移動規則
  move(){
    if (this.x>width/2){this.mx = -1*this.mx;}
    if (this.x<-width/2){this.mx = -1*this.mx;}
    if (this.y>width/2){this.my = -1*this.my;}
    if (this.y<-width/2){this.my = -1*this.my;}  
    this.x = this.x + this.mx;
    this.y = this.y + this.my;
  }
}
// 衛星
class stela{
  constructor(x,y,z,size,cdx){
    //衛星的旋轉中心
    this.x=x;
    this.y=y;
    this.z=z;
    this.size=size;
    // 衛星距離旋轉中心的x距離
    this.cdx=cdx;
    // 隨機產生物件顏色
    this.cc = color(random(255),0,0);
  }
  display(){
    push();
      rotateX(frameCount*0.01);
      rotateY(frameCount*0.01);
      rotateZ(frameCount*0.01);
      translate(this.cdx,0,0);  
      fill(mouseX,mouseY,150);
      stroke(mouseX,mouseY,150);
      box(this.size);
    pop();
  }
}

// 衛星2 環
class stela2{
  constructor(x,y,z,size,cdx){
    //衛星的旋轉中心
    this.x=x;
    this.y=y;
    this.z=z;
    this.size=size*0.5;
    // 衛星距離旋轉中心的x距離
    this.cdx=cdx;
    // 隨機產生物件顏色
    this.cc = color(random(255),0,0);
  }
  display(){
    push();
      rotateY(frameCount*0.05);
      rotateZ(frameCount*0.05);
      translate(this.cdx,0,0);  
      fill(mouseX,mouseY,150);
      stroke(this.cc);
      torus(this.size,this.size*0.5);
    pop();
  }
}