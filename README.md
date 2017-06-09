# hoax-fighter
final project firefox

## API endpoint
All started with http://localhost:3000

### Source API
Route | HTTP | Description
----- | ---- | -----------
/api/source | POST | POST new hoax source
/api/source | GET | Get all hoax source

**Include this on your POST req on Source API as a body**
1. title: 'your title here'
2. fact: 'your fact here'
3. hoax: 'your hoax here'

### Checker API
Route | HTTP | Description
----- | ---- | -----------
/api/check | POST | POST user input to hoax checker function