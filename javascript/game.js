CTE_WARIO = 1;
CTE_STAIRS = 4;
CTE_DOOR = 8;
CTE_NORMAL_BLOCK = 16;
CTE_COIN = 32;

window.addEventListener('load',function()
{
	var Q = Quintus({audioSupported:['mp3','ogg']})
			.include('Sprites, Scenes, Input, 2D, Anim, Touch, UI, TMX, Audio')		
		    .setup({ 
		    	width: 320, 
		    	height: 320 
		    })
		    .controls()
		    .touch()
		    .enableSound();	
	
	add_Level1(Q);
	add_Level2(Q);
	add_wario(Q);
	add_stair(Q);
	add_enemy1(Q);
	add_enemy2(Q);
	add_BigCoin(Q);
	add_sensor(Q);
	add_door(Q);
	add_bloque(Q);
	//add_Goomba(Q);
	
	Q.loadTMX('level001.tmx, level002.tmx, wario.png, wario.json, enemy1.png, enemy1.json,enemy2.png,enemy2.json, bigcoin.png, bigcoin.json, block.png, bloque.json', function()
	{		
		Q.compileSheets('wario.png', 'wario.json');
		Q.compileSheets('enemy1.png', 'enemy1.json');
		Q.compileSheets('enemy2.png', 'enemy2.json')
		Q.compileSheets('bigcoin.png', 'bigcoin.json');
		Q.compileSheets('block.png', 'bloque.json');
		//Q.compileSheets('goomba.png', 'goomba.json');
		Q.stageScene('level1');
	});
});
