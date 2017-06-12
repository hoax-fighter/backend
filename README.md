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

### Checker API BING WEB
Route | HTTP | Description
----- | ---- | -----------
/api/source/web | POST | POST user input to bing api web function

**request body**
```javascript
word: 'your input here'
```

### Feedback on result API
Route | HTTP | Description
----- | ---- | -----------
/api/source/feedback | GET | GET all feedbacks from user
/api/source/feedback | POST | POST new feedback from user

**request body**
```javascript
userId: 'user id here'
value: 'insert number here (1 or -1)'
name: 'title'
description: 'description'
```

### User API
Route | HTTP | Description
----- | ---- | -----------
/api/board/users | GET | GET all user
/api/board/users | POST | CREATE new user
/api/board/users/:id | DELETE | DELETE a user

**request body for create new user**
```javascript
uid: 'user id here (get from firebase)'
name: 'name here'
email: 'email here'
```