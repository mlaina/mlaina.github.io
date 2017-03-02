/**
 * MemoryGame es la clase que representa nuestro juego. Contiene un array con la cartas del juego,
 * el número de cartas encontradas (para saber cuándo hemos terminado el juego) y un texto con el mensaje
 * que indica en qué estado se encuentra el juego
 */
var MemoryGame = MemoryGame || {};

/**
 * Constructora de MemoryGame
 */
 var pointer=true;
MemoryGame = function(gs) {
	this.gs=gs;
	this.cards;
	this.check={card: new MemoryGameCard("back"), pos: -1};;
	this.cont=0;
	this.state=0;
	this.one=false;
	this.points=60;

	this.initGame = function(){
		this.cards=new Array(
			new MemoryGameCard("8-ball"), new MemoryGameCard("potato"), new MemoryGameCard("dinosaur"), new MemoryGameCard("kronos"),
			new MemoryGameCard("rocket"), new MemoryGameCard("unicorn"), new MemoryGameCard("guy"), new MemoryGameCard("zeppelin"),
			new MemoryGameCard("8-ball"), new MemoryGameCard("potato"), new MemoryGameCard("dinosaur"), new MemoryGameCard("kronos"),
			new MemoryGameCard("rocket"), new MemoryGameCard("unicorn"), new MemoryGameCard("guy"), new MemoryGameCard("zeppelin")
		 );


		this.shuffle();
		this.loop();
	};

	this.shuffle=function(){

		for (var i =0 ; i < this.cards.length; i++) {
			var index=Math.floor(Math.random()*this.cards.length+0);
			var card=this.cards[i];
			this.cards[i]=this.cards[index];
			this.cards[index]=card;
		}

	};

	this.draw = function(){
		
		switch(this.state){
			case 0: this.gs.drawMessage("Memory Game - Score: "+this.points);      break;
			case 1: this.gs.drawMessage("Match found - Score: "+this.points); 	   break;
			case 2: this.gs.drawMessage("Sorry, try again - Score: "+this.points); break;
			case 3: this.gs.drawMessage("You win - Final Score: "+this.points);    break;
			case 4: this.gs.drawMessage("You lost :( - Final Score: "+this.points);break;
		}
		
		for(var i=0; i<16; i++)
			this.cards[i].draw(this.gs, i);
		

	};

	this.loop = function(){
		
		var self=this;
		var interval=setInterval(function(){
			self.draw();
		}, 16);
		
		
	};

	this.onClick = function(pos){
		if(pointer && (pos>=0 && pos<16 && pos!=null)){
			this.gameLogic(pos);
		}
	};

	this.gameLogic=function(pos){
		var card=this.cards[pos];
		var other=this.check;

		if(!card.isFlip){
			this.cards[pos].flip();	


			if(card.compareTo(other.card.id) && this.one){
				this.cards[pos].found();
				this.cards[other.pos].found();
				this.state=1;
				this.points+=5;
				this.one=false;
				this.cont+=2;
				if(this.cont==16)this.state=3;
			}else{
				if(this.one){
					this.one=false;
					this.points-=10;
					var points=this.points;
					setTimeout(function(){
						card.flip();
						other.card.flip();
						if(points>0)
							pointer=true;
					}, 900);
					
					pointer=false;
					this.state=2;
					if(this.points<=0) this.state=4;
				}else{
					this.one=true;
					this.check.card=card;
					this.check.pos=pos;
					this.state=0;
				}
				
			}
		}
	};

};

/**
 * Constructora de las cartas del juego. Recibe como parámetro el nombre del sprite que representa la carta.
 * Dos cartas serán iguales si tienen el mismo sprite.
 * La carta puede guardar la posición que ocupa dentro del tablero para luego poder dibujarse
 * @param {string} id Nombre del sprite que representa la carta
 */
MemoryGameCard = function(id) {
	this.id=id;
	this.isFlip=false;
	this.isFound=false;

	this.flip = function(){
		this.isFlip=!this.isFlip;
	};

	this.found = function(){
		this.isFound=!this.isFound;
	};

	this.compareTo = function(otherCard){
		return (this.id==otherCard);
	};

	this.draw = function(gs, pos){
		if(this.isFlip)
			gs.draw(this.id, pos);
		else
			gs.draw("back", pos);
	};

};
