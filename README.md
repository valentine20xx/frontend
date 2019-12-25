# Urlaubsverwaltung (Frontend-Part)

### Install
* npm install 
* npm i -s @angular/flex-layout @angular/cdk
* npm install -g json-server

### Deployment
* ng build --prod --base-href '/kaufvertrag/'

### User:
##### eine List von Benutzern anfragen:
* Methode: GET
* Path: /users
* Server -> Client: [{"id": string, "firstName": string, "lastName": string },{} ...]

##### einen Benutzer anlegen:
* Methode: POST
* Path: /user
* Client -> Server: {"firstName": string, "lastName": string}
* Server -> Client: [{"id": string, "firstName": string, "lastName": string },{} ...]

##### einen Benutzer löschen:
* Methode: DELETE
* Path: /user/:uuid
* Server -> Client: {"result": boolean}
