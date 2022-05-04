## API Endpoints for ludotheque

method | route | description | returns | implemented ?
-------- | ------ | ---------- | ------- | -------
GET | /games | get all games already registered in databse | Array of Objet _game_ (JSON) | Done
GET | /games/{id} | get the game details that has the requested id | Object _game_ (JSON) | Done
GET | /games/{title} | fetch a game object from RAWG, corresponding with user request | Object _game_ (JSON) |
POST | /games | add a game in database, using previously returned game Object from RAWG | |
GET | /games/user/{id} | get all videogames possessed by the requested user | Array of Objet _game_ (JSON) |
GET | /platforms | get all videogames platforms in database | Array of _platform_ Object (JSON) | Done
GET | /platforms/{id} | get the videogames platform that has the requested id | _platform_ Object (JSON) | Done
GET | /games/platforms/{id} | get all videogames from platform requested | Array of Objet _game_ (JSON) |
GET | /genres | get all videogames genres in database| Array of _genre_ Object (JSON) | Done
GET | /genres/{id} | get the videogames genre that has the requested id | _genre_ Object (JSON) | Done
GET | /games/genre/{id} | get all videogames from genre requested | Array of Objet _game_ (JSON)
POST| users/register | Create a new user in database| Return a feedback message (String) | Done
POST| users//login | Log in user, verifying credentials in database| Welcome back message (String) | Done
POST| users/logout | Log out user| Goodbye message (String) | Done
GET | /users | get all users in database| Array of pseudo (String) | Done
