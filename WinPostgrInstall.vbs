' ------
' armor Postgres install V 1.0
' VB script for installing postgres onto windows machine
' ------

'---
' Create connection to Shell in Windows (Command prompt)
'---
	Set SystemFromShellObj = WScript.CreateObject( "WScript.Shell" )

'---
' Get current Users username
'---
	UserStr = SystemFromShellObj.ExpandEnvironmentStrings( "%USERNAME%" )

'---
' Postgres with bigsql for windows  - Version. 9.5.3-5
'---
	Wscript.Echo "Setting variables"
	FileUrlStr = "http://get.enterprisedb.com/postgresql/postgresql-9.5.3-1-windows-x64.exe"
	FileSaveStr = "C:\Users\" + UserStr + "\Documents\postgresql-9.5.3-1-windows-x64.exe"
	InstallLocationStr = "C:\Program Files\PostgreSQL\9.5"
	PsqlLocationStr = chr(34)+"C:\Program Files\PostgreSQL\9.5\bin\psql.exe"+chr(34)

'---
' Create http get request
'---
	Wscript.Echo "Creating HTTP GET request"
	Set FetchFileObj = CreateObject("MSXML2.XMLHTTP")
	FetchFileObj.open "GET", FileUrlStr, false
	FetchFileObj.send()

'---
' If success (status 200)
'---
	Wscript.Echo "Checking status code on GET request"
	If FetchFileObj.Status = 200 Then
		Wscript.Echo "Downloading Postgres"
		Set FetchFileStream = CreateObject("ADODB.Stream")
		FetchFileStream.Open
		' Set as binary
		FetchFileStream.Type = 1 
		FetchFileStream.Write FetchFileObj.ResponseBody
		FetchFileStream.Position = 0 'Set the stream position to the start

	Set FileStreamObject = CreateObject("Scripting.FileSystemObject")

'---
' Delete file if it is allready existing at this location
'---
	If FileStreamObject.Fileexists(FileSaveStr) Then FileStreamObject.DeleteFile FileSaveStr

'---
' Save to location that is predefined at start
'---
	Wscript.Echo "Saving to file at location " + FileSaveStr +  " ***"
	FetchFileStream.SaveToFile FileSaveStr
	FetchFileStream.Close

'---
' Lets end the first if sentance
'---
	End if
	
	Wscript.Echo "Finished downloading"

'---
' Lets run install
'---
	Wscript.Echo "--------------------------------------------------------------"
	Wscript.Echo " Remember this will do a full install and finish the install  "
	Wscript.Echo " super account will be set to " + UserStr
	Wscript.Echo " super password will be set to 1234                           "
	Wscript.Echo " Location will be set at " + InstallLocationStr
	Wscript.Echo " Data directory will be set at " + InstallLocationStr + "\data"
	Wscript.Echo "--------------------------------------------------------------"

	SystemFromShellObj.run FileSaveStr + " --disable-stackbuilder 1 --mode unattended --superpassword 1234 --serverport 5432", 1, true

'---
' Adding new Role with your username and password 1234
'---

	PsqlStr = chr(34) + "CREATE USER " + chr(92) + chr(34) + UserStr + chr(92) + chr(34) + " WITH PASSWORD " + chr(39) + "1234" + chr(39) + " SUPERUSER CREATEDB REPLICATION;" + chr(34)
	Wscript.Echo PsqlStr
	SystemFromShellObj.run PsqlLocationStr + " -d postgres -U postgres -c " + PsqlStr

'---
' Cleanup after Use
'---
	Set FileStreamObject = Nothing
	Set FetchFileStream = Nothing
	Set FetchFileObj = Nothing
	Set SystemFromShellObj = Nothing

Wscript.Echo "Install Finished and everything is setup as it is suppose to be"