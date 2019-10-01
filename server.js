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
router.route('/')
    .get(function(req, res) {
        res.json({
            message: 'apiサーバーが起動しました'
        })
    })


// ログイン機能の実装の断片
// router.route('/users')
//     .get(function(req, res) {
//         if (err) {
//             res.send(err)
//         }
//         res.json({
//             message: "ログインか新規登録してください"
//         })
//     })


router.route('/todos')
    //リクエストがgetの時
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

router.route('/todos/:todos_id')
    .get(function(req, res) {
        Todos.findById(req.params.todos_id, function(err, todos) {
            if (err) {
                res.send(err)
            }
            res.json(todos)
        })
    })
    .put(function(req, res) {
        Todos.findById(req.params.todos_id, function(err, todos) {
            if (err) {
                res.send(err)
            }
            res.json({
                message: "更新しました。"
            })
        })
    })
    .delete(function(req, res) {
        Todos.remove({
            _id: req.params.todos_id
        }, function(err, todos) {
            if (err) {
                res.send(err)
            }
            res.json({
                message: "削除削除削除削除"
            })
        })
    })


app.listen(port, ()=>{
    console.log('listening')
})



