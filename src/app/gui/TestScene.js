

function TestScene( parent, canvas, id )
{
    UIScene.call( this, parent, canvas, id );

    this.m_testAnimation = new GAnimation( 'red_walk_down' );
    this.m_canvas.addChild( this.m_testAnimation );
    this.m_testAnimation.x = 100;
    this.m_testAnimation.y = 100;

    this.m_timer = 0;
    this.m_waitTime = 250;
    this.m_noteIndx = 0;
};

TestScene.prototype = Object.create( UIScene.prototype );
TestScene.prototype.constructor = TestScene;

TestScene.prototype.update = function ( dt )
{
    this.m_testAnimation.update( dt );
    this.m_timer += dt;
    if ( this.m_timer > this.m_waitTime )
    {
        this.m_timer = 0;
        ///Application.instance.playSound( 'SND_NOTE_' + ( this.m_noteIndx + 1 ),
        ///                                { volume: 0.1, loop: 0 } );
        this.m_noteIndx = ( this.m_noteIndx + 1 ) % 10;
    }
};