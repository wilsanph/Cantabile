
function GEntryPoint (){};

GEntryPoint.include = function include( file )
{
	document.write( '<script type="text/javascript" languaje="javascript" src="' +		
					file + '"></script>');
};

GEntryPoint.begin = function begin () 
{
	var files = window["EntryPointFiles"];
	for ( var i = 0; i < files.length; i++ ) 
	{
			GEntryPoint.include( files[i] );
	}
};

