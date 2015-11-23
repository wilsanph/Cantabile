//*********************
// 	GAnimationsLoader.js
//	Author: Wilsan
//*********************

/**
* @constructor
* @param {GLoaderManager} parent
* @param {string} assetsPath
*/
function GAnimationsLoader( parent, assetsPath )
{
	/** @type {GLoaderManager} */
	this.m_parent = parent;
	/** @type {string} */
	this.m_path = assetsPath;
	/** @type {Array.<string>} */
	this.resourcesList = [];
	/** @type {number} */
	this.resourcesLoaded = 0;
	/** @type {Array.<string>} */
	this.toLoadResourcesList = [];
	/** @type {number} */
	this.toLoadNumResources = 0;
	/** @type {Function} */
	this.m_completeCallback = null;
}

/**
* @param {Array.<string>} resourcesList
*/
GAnimationsLoader.prototype.loadAtlases = function( resourcesList, fnCallback )
{
	this.m_completeCallback = fnCallback;
	this.toLoadResourcesList = [];
	this.toLoadNumResources = 0;
	for ( var i = 0; i < resourcesList.length; i++ )
	{
		this.toLoadResourcesList.push( resourcesList[i] );
		this.toLoadNumResources++;
		this.load( 'res' + this.toLoadNumResources, 
				   this.m_path + resourcesList[i],
				   this.onResourceLoaded );
	}
};

GAnimationsLoader.prototype.load = function( resourceName, resourceID, callback )
{
	Log.log( "GAnimationsLoader::add> added resource: ( " + resourceName + ", " + resourceID + " )" );
	var tLoader = PIXI.loader
					.add( resourceName, resourceID )
					.load( callback );
	tLoader['parent'] = this;
	tLoader['resourceID'] = resourceID;
	tLoader['resourceName'] = resourceName;
};

GAnimationsLoader.prototype.path = function()
{
	return this.m_path;
};

GAnimationsLoader.prototype.onResourceLoaded = function( loader, resources )
{
	Log.info( 'GAnimationsLoader::onResourceLoaded> loaded' );
	loader['parent'].resourcesList.push( loader['resourceID'] );
	loader['parent'].resourcesLoaded++;
	loader['parent'].toLoadNumResources--;

	if ( !window['animations'] )
	{
		window['animations'] = {};
	}

	// Parse the data from the json file
	var resName = loader['resourceName'];
	var jsonData = resources[resName]['data']['animations'];
	var textureMapping = resources[resName]['data']['textureMapping'];
	// TODO: Potential memory leak, objects referenced to a non user controller object
	for ( var i = 0; i < jsonData.length; i++ )
	{
		var animData = new GAnimationData( jsonData[i]['name'],
										   jsonData[i]['fps'],
										   jsonData[i]['numFrames'],
										   textureMapping,
										   jsonData[i]['frames'] );
		window['animations'][jsonData[i]['name']] = animData;
	}

	if ( loader['parent'].toLoadNumResources <= 0 )
	{
		if ( loader['parent'].m_completeCallback )
		{
			loader['parent'].m_completeCallback();
		}
	}
};