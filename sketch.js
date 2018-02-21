console.log('we are connected to script')
console.log(p5)

var symbol; 
var symbolSize = 24;
var streams = [];

function setup(){
    createCanvas(
        window.innerWidth ,//might have ot change when intergrate into site
        window.innerHeight
    );
    background(0, 900);
    var x = 0;
    var y = random(-1000, 0);
    for(var i = 0; i<= width / symbolSize; i++){
        //we divide width by symbolsize in order to get toal number of streams since each stream is one symbol wide
        //increas symbol sie ( maybe to symbolsize* 3 or three to make there be eless streams)
        var stream = new Stream();
        stream.generateSymbols(x,y);
        streams.push(stream);
        x += symbolSize
    }
    textSize(symbolSize);
    
}

function draw(){
    background(6, 125) //we want tohe background to re-render for each symbol. second arg is opacity
    streams.forEach((stream)=>{
        stream.render();
    })
}
function Symbol(x, y, speed, first){ //x and y is position on canvas
    this.x = x;
    this.y = y;
    this.value;
    this.speed=speed;
    this.switchInterval = round(random(2,20));
    this.first = first;

    this.setToRandomSymbol = function(){
        if(frameCount % this.switchInterval == 0){ // framecount is built in p5 var. whenever framerate divieds evenly into framcount execute this line of code 
                // here we use unicode to bring up the foreign symbols
            this.value = String.fromCharCode(
                0x30A0 + round(random(0,96)) //look around 8 min for explaination
            );
        }
    }
    // this.render = function(){
    //     fill(0, 255, 34); //these are RGB values
    //     text(this.value, this.x, this.y);
    //     this.rain()
    //     this.setToRandomSymbol()
    // }
    this.rain = function(){
        // if(this.y>=height){ 
        //     //if the y is greater than or equal to the height that means it has reached the bottom
        //     this.y=0
        // }else{
        //     this.y+=this.speed;
        // }
        // this.y+=this.speed;
        this.y = this.y>=height ? 0 : this.y+= this.speed;
    }
}

function Stream(){
    this.symbols = [];
    this.totalSymbols = round(random(5,30)) //each stram will have a random number of symbols. reduce this to get less symbols
    this.speed = random(2, 8);

    this.generateSymbols = function(x,y){
        var first = round(random(0,4)) ==1;
        for(var i= 0; i<= this.totalSymbols; i++){
            symbol = new Symbol(x, y, this.speed, first);
            symbol.setToRandomSymbol();
            this.symbols.push(symbol);
            y -= symbolSize  //this is to stack the symbols on top of each other 24:30 for explaination. if oyu want to space them out more do it here
            first = false;
        }
    }
    this.render = function(){
        this.symbols.forEach((symbol)=>{

            symbol.first ? fill(180, 255, 180): fill(255, 0, 0);
            text(symbol.value, symbol.x, symbol.y);
                symbol.rain()
                symbol.setToRandomSymbol()
        });
        //can also have the symbols themselves carry the above responsibilits
    }
}