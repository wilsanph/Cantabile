

/**
* @constructor 
*/
function UISceneHandler()
{
	UISceneHandler.instance = this;

	/** @type {UIScene} */
	this.m_currentScene = null;
	/** @type {string} */
	this.m_currentSceneId = '';
	/** @type {string} */
	this.m_nextSceneId = '';

}

/** @type {UISceneHandler} */ UISceneHandler.instance = null;

UISceneHandler.prototype.changeScene = function( sceneId )
{
	
};

UISceneHandler.prototype.update = function( dt )
{
	if ( this.m_currentScene )
	{
		if ( this.m_currentScene.isPendingChange )
		{
			this.m_currentScene.free();
			this.changeScene();
		}
	}
};

UISceneHandler.prototype.requestSceneChange = function( nextSceneId )
{
	this.m_nextSceneId = nextSceneId;
};