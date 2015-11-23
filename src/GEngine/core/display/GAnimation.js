/**
* @param {string} id
* @extends PIXI.Container
*/
function GAnimation ( id ) 
{	
	PIXI.Container.call( this );

	/** @type {Object} */
	this.data = window["animations"][id];
	/** @type {string} */
	this.name = id;
	/** @type {number} */
	this.totalFrames = 0;
	/** @type {number} */
	this.fps = 30;
	/** @type {Object} */
	this.textureMap = null;
	/** @type {Array.<number>} */
	this.frames = null;
	/** @type {number} */
	this.m_deltaTime = 0;
	/** @type {number} */
	this.m_time = 0;
	/** @type {number} */
	this.currentFrame = 0;
	/** @type {number} */
	this.loop = true;
	/** @type {PIXI.Sprite} */
	this.sprite = null;

	this.m_caller = null;
	this.m_callback = null;

	this.init();
};


GAnimation.prototype = Object.create( PIXI.Container.prototype );
GAnimation.prototype.constructor = GAnimation;


GAnimation.prototype.setEndAnimationCallback = function setEndAnimationCallback( caller, callback ) {
	this.m_caller = caller;
	this.m_callback = callback;
};

GAnimation.prototype.init = function init() {
	if ( !this.data ) 
	{
		Log.error( "GAnimation::init> couldn't find the animation with id " + this.name );
		return;
	}

	this.totalFrames = this.data.totalFrames;
	this.fps = this.data.fps;
	this.textureMap = this.data.textureMap;
	this.frames = this.data.frames;

	this.m_deltaTime = 1000 / this.fps;
	this.setFrame( this.currentFrame );
	this.addChild( this.sprite );
	this.sprite.anchor.x = 0.5;
	this.sprite.anchor.y = 0.5;
};

GAnimation.prototype.update = function update( dt ) 
{
	this.m_time += dt;
	if ( this.m_time > this.m_deltaTime ) 
	{
		this.m_time = 0;
		this.currentFrame++;
		if ( this.currentFrame >= this.totalFrames ) 
		{
			if ( this.m_caller !== null && this.m_callback !== null ) 
			{
				this.m_callback.call( this.m_caller, this );
			}
			if ( this.loop ) 
			{
				this.currentFrame = 0;
			}
		}
		this.setFrame( this.currentFrame );
	}
};

GAnimation.prototype.setFrame = function setFrame( frame ) 
{
	var frameTextureID = this.textureMap[this.frames[frame]];
	if ( this.sprite !== null ) 
	{
		this.sprite.texture = PIXI.utils.TextureCache[frameTextureID];
	}
	else
	{
		this.sprite	= new PIXI.Sprite( PIXI.utils.TextureCache[frameTextureID] );		
	}	
};

