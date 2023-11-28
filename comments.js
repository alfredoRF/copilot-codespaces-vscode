// Create web server 
// 1. Load express module
const express = require('express')
// 2. Create web server object
const app = express()
// 3. Set port
const port = 3000
// 4. Load mysql module
const mysql = require('mysql')
// 5. Create connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'comments'
})
// 6. Connect to the database
connection.connect((err) => {
    if (err) throw err
    console.log('Connected to MySQL Server!')
})
// 7. Create a GET route for /comments
app.get('/comments', (req, res) => {
    // 8. Query the database
    connection.query('SELECT * FROM comments', (err, rows) => {
        if (err) throw err
        console.log('Data received from Db:\n')
        console.log(rows)
        // 9. Send the query result back to the client
        res.send(rows)
    })
})
// 10. Start the web server
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
```

### 2.2. Create a React App
```
// 1. Create a React App
$ npx create-react-app frontend
// 2. Run the React App
$ cd frontend
$ npm start
```

### 2.3. Create a React Component
```
// 1. Create a React Component
$ cd frontend/src
$ mkdir components
$ cd components
$ touch Comments.js
```

### 2.4. Create a React Component
```
// 2. Create a React Component
import React from 'react'
import axios from 'axios'
class Comments extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            comments: []
        }
    }
    componentDidMount() {
        // 3. Send a GET request to the server
        axios.get('http://localhost:3000/comments')
            .then(response => {
                console.log(response.data)
                this.setState({ comments: response.data })
            })
            .catch(error => {
                console.log(error)
            })
    }
    render() {
        // 4. Display the comments
        const comments = this.state.comments.map((