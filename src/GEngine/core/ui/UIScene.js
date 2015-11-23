

/**
* @constructor
* @param {UISceneHandler} parent
* @param {PIXI.Container} canvas
* @param {string} id
*/
function UIScene( parent, canvas, id )
{
	/** @type {UISceneHandler} */
	this.m_parent = parent;
	/** @type {string} */
	this.id = id;
	/** @type {PIXI.Container} */
	this.m_canvas = canvas;
	/** @type {Object.<string,UIControl>} */
	this.m_controls = {};
	/** @type {boolean} */
	this.isPendingChange = false;

	this.init();
};

UIScene.prototype.init = function()
{
	if ( !window['ui']['scenes'][this.id] )
	{
		Log.warn( 'UIScene::init> this scene with id: ' + this.id + 
				  ' is not implemented' );
		return;
	}
	
	var tControls = window['ui']['scenes'][this.id]['controls'];
	for ( var i = 0; i < tControls.length; i++ )
	{
		var tNewControl = null;
		switch ( tControls[i]['type'] )
		{
			case UIControl.BUTTON:
				tNewControl = new UIButtonControl( this, tControls[i]['id'] );
			break;
			case UIControl.CLIP:
				tNewControl = new UIClipControl( this, tControls[i]['id'] );
			break;
		}

		if ( tNewControl )
		{
			this.m_controls[tNewControl.id] = tNewControl;
		}
	}
};

UIScene.prototype.free = function()
{
	this.m_parent = null;
	for ( key in this.m_controls )
	{
		this.m_controls[key].free();
		this.m_controls[key] = null;
	}
	this.m_controls = null;
};



UIScene.prototype.onExit = function()
{
	this.isPendingChange = true;
	//this.m_parent.requestSceneChange();
};