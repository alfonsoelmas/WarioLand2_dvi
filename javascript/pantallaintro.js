function add_PantallaIntro(Q)
{
	Q.scene('pantallaIntro',function(stage) 
	{
		var intro = stage.insert(new Q.Intro30sec());
		var confirm = true;

		Q.input.on('confirm', this, function() 
		{
            if (confirm) 
            {            
                Q.clearStages();
                Q.stageScene('pantallaMenu');
                confirm = false;
            }
        });
        stage.add('viewport').follow(intro);
	});
}