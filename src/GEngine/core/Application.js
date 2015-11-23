// *********************
// 	Application.js
//	Author: Wilsan
// *********************

/**
* @constructor
*/
function Application()
{
	Application.instance = this;

	/** @type {PIXI.SystemRenderer} */
	this.renderer = null;
	/** @type {PIXI.Container} */
	this.stage = null;
	/** @type {PIXI.Container} */
	this.canvas = null;
	/** @type {UISceneHandler} */
	this.sceneHandler = null;
	/** @type {GLoaderManager} */
	this.loaderManager = null;

	/** @type {number} */
	this.m_timeBef = 0;
	/** @type {number} */
	this.m_timeNow = 0;
	/** @type {number} */
	this.m_timeDelta = 0;

	this.testScene = null;

	this.init();
}

/** @type {Application} */ Application.instance = null;

/** @type {number} */ Application.APP_WIDTH	 = 1024;
/** @type {number} */ Application.APP_HEIGHT = 768;
/** @type {number} */ Application.APP_BG_COLOR = 0x000000;

/** @type {number} */ Application.MAX_DELTA = 50;

Application.prototype.init = function()
{
	Application.APP_WIDTH = window['config']['general']['ApplicationWidth'];
	Application.APP_HEIGHT = window['config']['general']['ApplicationHeight'];
	Application.APP_BG_COLOR = window['config']['general']['ApplicationBgColor'];
	Application.MAX_DELTA = window['config']['general']['ApplicationMaxDelta'];

	this.renderer = PIXI.autoDetectRenderer( Application.APP_WIDTH,
											 Application.APP_HEIGHT,
											 { backgroundColor : Application.APP_BG_COLOR } );
	document.body.appendChild( this.renderer.view );
	this.stage = new PIXI.Container();
	this.canvas = new PIXI.Container();
	this.stage.addChild( this.canvas );

	this.loaderManager = new GLoaderManager();
	this.loaderManager.loadSounds( window['sounds']['list'],
								   this.onFirstSoundsLoaded );
	this.loaderManager.loadAtlases( window['atlas']['list'],
									this.onFirstAtlasesLoaded );
};

Application.prototype.update = function()
{
	this.m_timeNow = Date.now();
	this.m_timeDelta = this.m_timeNow - this.m_timeBef;
	this.m_timeBef = this.m_timeNow;
	this.m_timeDelta = ( this.m_timeDelta > Application.MAX_DELTA ) ?
							Application.MAX_DELTA : this.m_timeDelta;

	if ( this.testScene )
	{
		this.testScene.update( this.m_timeDelta );
	}

	if ( this.sceneHandler )
	{
		this.sceneHandler.update( this.m_timeDelta );
		this.renderer.render( this.stage );
	}

};


// Loader callbacks ***********************

Application.prototype.onFirstSoundsLoaded = function()
{
	Log.info( 'Application::onFirstSoundsLoaded> Finished loading first sounds' );
	///Application.instance.playSound( 'SND_GAMEPLAY_1', 
	///								{ volume: 0.025, loop: -1 } );
	///Application.instance.playSound( 'SND_NOTE_1', 
	///								{ volume: 0.1, loop: -1 } );
};

Application.prototype.onFirstAtlasesLoaded = function()
{
	Log.info( 'Application::onFirstAtlasesLoaded> Finished loading first atlases' );
	Application.instance.testScene = new TestScene( null, Application.instance.canvas, "" );
};

// ****************************************
// SoundAPI helper functions **************


/**
* @param {string} id
* @param {Object} params
*/
Application.prototype.playSound = function( id, params )
{
	return window['Sound'].play( id, params );
};

// ****************************************


