function ui(){};

window['ui'] = ui;

ui.scenes = 
{
	'uiMainMenu': 
	{
		'controls':
		[
			{ 
			  'type': 'button',
			  'id': 'mcBtnPlay',
			  'x': 512,
			  'y': 500,
			  'clip': 'guiBtnPlay'
			},
			{ 
			  'type': 'clip',
			  'id': 'mcClipLogo',
			  'x': 512,
			  'y': 200,
			  'clip': 'guiClipLogo'
			},
			{
			  'type': 'clip',
			  'id': 'mcClipBg',
			  'x': 0,
			  'y': 0,
			  'clip': 'guiClipBg'
			}
		]
	}
};