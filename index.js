const express = require("express")
const app = express()
const cors = require('cors')
const pool = require("./db")

//middleware
app.use(cors())
app.use(express.json())

//checking server is working
app.listen(5000, () => {
    console.log('server is running on port 5000')
})

//ROUTES:

//create a todo
app.post("/todos", async (req, res)=> {
    try{
        console.log(req.body)
        const { todo_item } = req.body
        const new_todo = await pool.query(
        "INSERT INTO todos (todo_item) VALUES($1) RETURNING *",
        [todo_item]//this defines the value of $1 placeholder
    );
    res.json(new_todo.rows[0])
    } catch (err){
        console.log(err.message)
    }
    
})

//get all todos
app.get("/todos", async (req, res) => {
    try {
        const todos = await pool.query("SELECT * FROM todos")
        res.json(todos.rows)
    } catch (error) {
        console.error(error.message)
    }
})

//get a todo

//update a todo

//delete a todo