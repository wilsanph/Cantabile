// *********************
// 	GLoaderManager.js
//	Author: Wilsan
// *********************

/**
* @constructor
*/
function GLoaderManager()
{
	GLoaderManager.instance = this;

	/** @type {SoundsLoader} */
	this.soundsLoader = null;
	/** @type {boolean} */
	this.soundsReady = true;
	/** @type {Function} */
	this.soundsCompleteCallback = null;

	/** @type {GAnimationsLoader} */
	this.animationsLoader = null;
	/** @type {boolean} */
	this.animationsReady = true;
	/** @type {Function} */
	this.animationsCompleteCallback = null;

	this.init();
}

/** @type {GLoaderManager} */ GLoaderManager.instance = null;

/** @const */ GLoaderManager.RESOURCES_PATH_AUDIO = "resources/sounds/";
/** @const */ GLoaderManager.RESOURCES_PATH_ATLAS = "resources/atlas/";

GLoaderManager.prototype.init = function()
{
	this.soundsLoader = new GSoundsLoader( this,
										   GLoaderManager.RESOURCES_PATH_AUDIO );
	this.animationsLoader = new GAnimationsLoader( this,
												   GLoaderManager.RESOURCES_PATH_ATLAS );
};

/**
* @param {Array.<String>} soundsList
* @param {Function} onCompleteCallback
*/
GLoaderManager.prototype.loadSounds = function( soundsList, onCompleteCallback )
{
	if ( !this.soundsLoader )
	{
		Log.warn( 'GLoaderManager::loadSounds> There is no soundsLoader to handle this request :(' );
		return;
	}
	this.soundsReady = false;
	Log.info( 'GLoaderManager::loadSounds> Loading sounds list: ' );
	Log.info( soundsList );
	this.soundsLoader.load( soundsList, this.onSoundListLoaded );
	this.soundsCompleteCallback = onCompleteCallback;
};

GLoaderManager.prototype.loadAtlases = function( atlasList, onCompleteCallback )
{
	if ( !this.animationsLoader )
	{
		Log.warn( 'GLoaderManager::loadAtlases> There is no animationsLoader to handle this request :(' );
		return;
	}
	this.animationsReady = false;
	Log.info( 'GLoaderManager::loadAtlases> Loading atlas list: ' );
	Log.info( atlasList );
	this.animationsLoader.loadAtlases( atlasList, this.onAtlasListLoaded );
	this.animationsCompleteCallback = onCompleteCallback;
};

GLoaderManager.prototype.onSoundListLoaded = function()
{
	GLoaderManager.instance.soundsReady = true;
	if ( GLoaderManager.instance.soundsCompleteCallback )
	{
		GLoaderManager.instance.soundsCompleteCallback();
	}
};

GLoaderManager.prototype.onAtlasListLoaded = function()
{
	GLoaderManager.instance.animationsReady = true;
	if ( GLoaderManager.instance.animationsCompleteCallback )
	{
		GLoaderManager.instance.animationsCompleteCallback();
	}
};