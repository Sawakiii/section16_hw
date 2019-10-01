const mongoose = require("mongoose")

// スキーマのオブジェクト作成。モデルのデータの型の作成。
const TodosSchema = new mongoose.Schema({
    title: String,
    desc: String, 
    isDone: Boolean
})

// UserモデルのスキーマはUserSchemaですという文
module.exports = mongoose.model('Todos', TodosSchema)






