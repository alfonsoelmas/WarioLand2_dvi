function add_enemy2(Q){
     Q.Sprite.extend('enemy2',{
        init: function(p){
            this._super(p,{
                sprite: 'anim_enemy2',
                sheet: 'enemy2',
                vx: 0,
                lado: 1,
                tiempo: 0,
                points: [[-6,-6],[6,-6],[6,6],[-6,6]],
                cargando: false,
                hamuerto:false,
                vaAmorir:false
            });
            this.add('2d, aiBounce, animation, defaultEnemy');
            this.on('dieT',this,'die');

            this.on("bump.top", function(collision) {
                if (collision.obj.isA("Wario"))
                  if(collision.obj.p.culetazo && !this.p.vaAmorir){
                  	this.p.vaAmorir = true;
                    this.p.vy = -300;
                    this.play("die");
                }
            });
            this.on("bump.left", function(collision) {
                if (collision.obj.isA("Wario"))
                    if (collision.obj.p.placando && !this.p.vaAmorir){
                    this.p.vaAmorir = true;
                    this.p.vx = -50;
                    this.p.vy = -300;
                    this.play("die");
                }
            });
            this.on("bump.right", function(collision) {
                if (collision.obj.isA("Wario"))
                    if (collision.obj.p.placando && !this.p.vaAmorir){
                    	this.p.vaAmorir = true;
                    	this.p.vx = -50;
                        this.p.vy = -300;
                        this.play("die");
                    }
            });
        },
        step: function(dt) 
        {	
            if(!this.p.vaAmorir){
	            if(this.p.time < 1){
	                this.play('chargeL'); //Izquierd
	                this.p.time +=dt;
	            }else if(this.p.time < 2){
	            		this.play('shootL');
	            		this.p.time +=dt;
	            	}else{
	            		this.p.time = 0;
	            		this.stage.insert(new Q.fireball({x: this.x - 5, y: this.y, vx:-50}));
	            	}
	        }else
               this.play('die');           
        },

        die: function(dt)
        {
            var probCrear = Math.floor(Math.random() * 100);
            if(probCrear<5){
                this.stage.insert(new Q.lifeObj({x: this.p.x, y: this.p.y}));
            }
            this.p.hamuerto = true;             
            this.destroy();
        }
    });


    Q.animations('anim_enemy2',{
        chargeR:{frames:[0,1,2], rate: 1/3, flip: false, loop: true},
        chargeL:{frames:[0,1,2], rate: 1/3, flip: "x", loop: true},
        shootR:{frames:[3], rate: 1/3, flip: "x", loop: true},
        shootL:{frames:[3], rate: 1/3, flip: false, loop: true},
        die:{frames:[4], rate: 1/3, loop: false,  trigger: "dieT"}
    });
}