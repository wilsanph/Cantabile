

/**
* @constructor
* @param {string} pName
* @param {number} pFps
* @param {number} pNumFrames
* @param {Object} pTextureMap
* @param {Array.<number>} pFrames
*/
function GAnimationData( pName, pFps, pNumFrames, pTextureMap, pFrames )
{
	/** @type {string} */
	this.name = name;
	/** @type {number} */
	this.fps = pFps;
	/** @type {number} */
	this.totalFrames = pNumFrames;
	/** @type {Object} */
	this.textureMap = pTextureMap;
	/** @type {Array.<number>} */
	this.frames = pFrames;
}