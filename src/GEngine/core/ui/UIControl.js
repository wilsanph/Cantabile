

/**
* @constructor
* @param {UIScene} parent
* @param {string} id
*/
function UIControl( parent, id )
{
	/** @type {UIScene} */
	this.m_parent = parent;
	/** @type {string} */
	this.id = id;

	/** @type {GAnimation} */
	this.clip = null;
}

/** @const */ UIControl.BUTTON 	= 'button';
/** @const */ UIControl.CLIP 	= 'clip';