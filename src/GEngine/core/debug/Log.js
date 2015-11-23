

function Log()
{

}

Log.logsEnabled = true;

Log.log = function( message )
{
	if ( !Log.logsEnabled )
	{
		return;
	}
	console.log( message );
};

Log.warn = function( message )
{
	if ( !Log.logsEnabled )
	{
		return;
	}
	console.warn( message );
};

Log.info = function( message )
{
	if ( !Log.logsEnabled )
	{
		return;
	}
	console.info( message );
};

Log.error = function( message )
{
	if ( !Log.logsEnabled )
	{
		return;
	}
	console.error( message );
};
