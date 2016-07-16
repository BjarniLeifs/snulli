# README *Windows*
## Setup
get & install [nodejs](https://nodejs.org/dist/v6.3.0/node-v6.3.0-x64.msi) <br />
get & install [Githup](https://github-windows.s3.amazonaws.com/GitHubSetup.exe) <br />

open Github desktop and clone armor from github. <br />
run command prompt [cmd](http://www.howtogeek.com/235101/10-ways-to-open-the-command-prompt-in-windows-10/) <br />
Go into the location where you stored armor and type "npm run setup-win" <br />

This will install postgres 9.5 and all the dependacies needed for the system to function correctly <br />
- user for the postgres server will be the username of your computer
- password for postgres will be 1234

## Run
run command prompt [cmd](http://www.howtogeek.com/235101/10-ways-to-open-the-command-prompt-in-windows-10/) <br />
go into the directory where you stored armor and type "npm run start" <br />
    
### Folder structure
- snulli (* Main directory *)
- |- bin			(* Server logic *)
- |- config		(* Server configurations *)
- |- data   		(* Server data for database test *)
- |- library		(* Library API helper files *)
- |- node_modules (* Node modules lodaded from dependancies *)
- |- public		(* Public data location - html and such *)
- |- readings	    (* All readings for the server setup and usage *)
- |- routes		(* Server API CALLBACK code *)
- |- sqlSchemas   (* Schemas for all SQL input *)
- |- test			(* Test data for server testing *)

# Code rules
- Camel casing is used <br />
	example: var thisNamingStyle

- Comments should be created above each new instance of function where there is a description of what this function is for and how to use.<br />
	example: /* <br />
					Description: Used to descripe the functionality<br />
					Usage: How to use this function<br />
			*/<br />

- if there is set of objects with comma seperation then they should be put into new line each of them where ":" is inline with each new set.<br />
	example: Let someObject = {<br />
									username: someObject.username,<br />
									stuff	: someObject.stuff<br />
							  }; <br />