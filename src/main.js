var app = new Application();


requestAnimationFrame( animate );

function animate ()
{
	requestAnimationFrame( animate );

	app.update();

	app.renderer.render( app.stage );

};