const express = require('express')
const app = express() //アプリの作成
const bodyParser = require('body-parser')

// データベースとの接続
const mongoose = require('mongoose')
// urlをデータベースへ
mongoose.connect('mongodb://localhost/todoList')
const Todos = require('./models/todos')

require('dotenv').config(); //?

// HTML.bodyのデータのエンコード
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// ポートの作成
const port = process.env.PORT || 3000

//Routerの作成。オブジェクト作成。
const router = express.Router()



app.use('/api', router)

//リクエストがgetの時
router.route('/')
    .get(function(req, res) {
        Todos.find(function (err, todos) {
            if (err) {
                res.send(err)
            }
            res.json(todos)
        })
})
    .post(function(req, res) {
        const todos = new Todos
        todos.title = req.body.title,
        todos.desc = req.body.desc,
        todos.isDone = false

        todos.save(function(err){
            if (err) {
                res.send(err)
            }
            res.json({
                message: 'todoを作成しました。'
            })
        })
    })

app.listen(port, ()=>{
    console.log('listening')
})



