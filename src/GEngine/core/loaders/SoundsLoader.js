//*********************
// 	SoundsLoader.js
//	Author: Wilsan
//*********************

/**
* @constructor
* @param {GLoaderManager} parent
* @param {string} soundsPath
*/
function GSoundsLoader( parent, soundsPath )
{
	GSoundsLoader.instance = this;

	/** @type {GLoaderManager} */
	this.parent = parent;
	/** @type {string} */
	this.m_path = soundsPath;

	/** @type {Array.<string>} */
	this.soundsList = [];
	/** @type {Array.<string>} */
	this.tmpSoundsList = [];
	/** @type {number} */
	this.tmpNumSoundsToLoad = 0;
	/** @type {Function} */
	this.onCompleteCallback = null;
}

/** @type {GSoundsLoader} */ GSoundsLoader.instance = null;

GSoundsLoader.prototype.soundsList = function()
{
	return this.m_soundsList;
};

GSoundsLoader.prototype.resourcesPath = function()
{
	return this.m_path;
};

/**
* @param {Array.<String>} soundsList
* @param {Function} completeCallback
*/
GSoundsLoader.prototype.load = function( soundsList, completeCallback )
{
	for ( var i = 0; i < soundsList.length; i++ )
	{
		this.tmpSoundsList.push( soundsList[i] );
		this.tmpNumSoundsToLoad++;
	}
	this.onCompleteCallback = completeCallback;
	window['Sound'].on( 'fileload', this.onLoadProgress );
	window['Sound'].registerSounds( this.tmpSoundsList, this.m_path );
};

GSoundsLoader.prototype.onLoadProgress = function( event )
{
	GSoundsLoader.instance.soundsList.push( event['src'] );
	GSoundsLoader.instance.tmpNumSoundsToLoad--;
	Log.info( 'GSoundsLoader::onLoadProgress> loaded sound ' + event['src'] );
	if ( GSoundsLoader.instance.tmpNumSoundsToLoad <= 0 )
	{
		if ( GSoundsLoader.instance.onCompleteCallback )
		{
			Log.info( 'GSoundsLoader::onLoadProgress> Finished loaded sound list' );
			GSoundsLoader.instance.onCompleteCallback();
		}
		else
		{
			Log.warn( 'GSoundsLoader::onLoadProgress> Didnt set a complete callback' );
		}
	}
};

