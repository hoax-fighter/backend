# hoax-fighter
final project firefox

## API endpoint
All started with http://localhost:3002

### Source API
Route | HTTP | Description
----- | ---- | -----------
/api/source | POST | POST new hoax source
/api/source | GET | Get all hoax source

**Include this on your POST req on Source API as a body**
```javascript
1. title: 'your title here'
2. fact: 'your fact here'
3. hoax: 'your hoax here'
```

### Checker DB Turn Back Hoax API
Route | HTTP | Description
----- | ---- | -----------
/api/check | POST | POST user input to hoax checker function

**request body**
```javascript
input: 'your input here'
```

### Checker API BING NEWS
Route | HTTP | Description
----- | ---- | -----------
/api/source/news | POST | POST user input to bing api news function

**request body**
```javascript
word: 'your input here'
```