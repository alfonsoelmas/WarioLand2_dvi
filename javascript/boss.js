function add_boss(Q){
    Q.Sprite.extend('boss',{
        init: function(p){
            this._super(p,{
                sprite: 'anim_boss',
                sheet: 'boss',
                vx: -50,
                vy: -50, 
                lado: 1,
                points: [[-6,-15],[6,-15],[6,24],[-5,24]],
                bola: false,
                hamuerto:false,
                vaAmorir:false
            });
            this.add('2d, aiBounce, animation, defaultEnemy');
            this.on('dieT',this,'die');



            this.on("bump.top", function(collision) {
                if (collision.obj.isA("Wario") && !this.p.vaAmorir)
                  if(collision.obj.p.culetazo){
                    this.p.vx=0;
                    this.p.vy=0;
                    this.p.bola = true;
                    this.p.points = [[-6,-15],[6,-15],[6,15],[-5,15]];
                    this.play("ball");
                }
          	});
          	this.on("bump.left", function(collision) {
                if (collision.obj.isA("Wario") && !this.p.vaAmorir && !this.p.bola)
                  if(this.p.lado == 0){
                    //collision.obj.play("die");
                    collision.obj.die();
                  }else if (collision.obj.p.placando && this.p.bola){
                    this.p.vaAmorir = true;
                    this.p.bola = false;
                    this.p.vy = -300;
                    this.p.points = [[-6,-15],[6,-15],[6,24],[-5,24]],
                    this.p.sensor=true;
                    this.play("ballhitL");

            	  }
          	});
          	this.on("bump.right", function(collision) {
                if (collision.obj.isA("Wario") && !this.p.vaAmorir && !this.p.bola)
                  if(this.p.lado == 1){
                    //collision.obj.play("die");
                    collision.obj.die();
                  }else if (collision.obj.p.placando && this.p.bola){
                    this.p.vaAmorir = true;
                    this.p.bola = false;
                    this.p.vy = -300;
                    this.p.sensor=true;
                    this.play("ballhitL");

                    }
          	});
        },
          
        die: function()
        {
            this.p.hamuerto = true;             
            this.destroy();
        },

        step: function(dt) 
        {
            if(this.p.vx > 0 ) 
                this.p.lado=1; //Derecha
            else if(this.p.vx<0) 
                this.p.lado = 0; //Izquierda


            if(!this.p.vaAmorir){
                if(this.p.vy == 0 && !this.p.bola)
                    this.p.vy = -200;
                if(this.p.vx > 0 ){
                    this.play('jumpL'); //Izquierda
                }else if(this.p.vx<0){
                    this.play('jumpR'); //Derecha
                }
            }
            else{
                this.play('die');           
            }
        },

    });
   
    Q.animations('anim_boss',{
        jumpL:{frames:[0,1,2,3,4], rate: 1/6, flip: "x", loop: true},
        jumpR:{frames:[0,1,2,3,4], rate: 1/6, flip: false, loop: true,},
        ball:{frames:[5], rate: 1/6, flip: false, loop: true, },
        ballhitL:{frames:[6], rate: 1/6, flip: "x", loop: true,},
        ballhitR:{frames:[6], rate: 1/6, flip: false, loop: true,},
        die:{frames:[7,8,9], rate: 1/3, loop: false,  trigger: "dieT"}
    });
       
}