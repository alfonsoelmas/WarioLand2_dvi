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
	
	add_Level(Q);
	add_wario(Q);
	add_stair(Q);
	add_enemy1(Q);
	add_Goomba(Q);
	
	Q.loadTMX('level0000pruebas.tmx, goomba.png, goomba.json, wario.png, wario.json, enemy1.png, enemy1.json', function()
	{		
		Q.compileSheets('wario.png', 'wario.json');
		Q.compileSheets('enemy1.png', 'enemy1.json');
		Q.compileSheets('goomba.png', 'goomba.json');
		Q.stageScene('level1');
	});
});
