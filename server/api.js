var express = require('express')
var cors = require('cors')
var mongoClient = require('mongodb').MongoClient

var app = express();
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(cors())

var conString = 'mongodb://127.0.0.1:27017'

//Routes

app.get('/get-admin', (req, res) => {
    mongoClient.connect(conString).then(clientObject => {
        var database = clientObject.db('video-library')
        database.collection('admin').find({}).toArray().then(document => {
            res.send(document)
            res.end()
        })
    })
})

app.get('/get-users',(req, res)=>{
    mongoClient.connect(conString).then(clientObject=>{
        var database = clientObject.db('video-library')
        database.collection('users').find({}).toArray().then(document=>{
            res.send(document)
            res.end()
        })
    })
})

app.get('/get-videos',(req, res)=>{
    mongoClient.connect(conString).then(clientObject=>{
        var database = clientObject.db('video-library')
        database.collection('videos').find({}).toArray().then(document=>{
            res.send(document)
            res.end()
        })
    })
})

app.get('/get-categories',(req, res)=>{
    mongoClient.connect(conString).then(clientObject=>{
        var database = clientObject.db('video-library')
        database.collection('categories').find({}).toArray().then(document=>{
            res.send(document)
            res.end()
        })
    })
})

app.post('/add-user',(req,res)=>{
    mongoClient.connect(conString).then(clientObject=>{
        var database = clientObject.db('video-library')
        var user ={
            UserId :req.body.UserId,
            UserName : req.body.UserName,
            Password : req.body.Password,
            Mobile:req.body.Mobile,
            Email:req.body.Email
        }
        database.collection('users').insertOne(user).then(()=>{
            console.log('User Added')
            res.end()
        })
    })
})

app.post('/add-video',(req,res)=>{
    mongoClient.connect(conString).then(clientObject=>{
        var database = clientObject.db('video-library')
        var video = {
            VideoId: parseInt(req.body.VideoId),
            Title : req.body.Title,
            Url : req.body.Url,
            Likes: parseInt(req.body.Likes),
            Dislikes: parseInt(req.body.Dislikes),
            Views : parseInt(req.body.Views),
            Comments : req.body.Comments,
            CategoryId: parseInt(req.body.CategoryId)
        }
        database.collection('videos').insertOne(video).then(()=>{
            console.log('Video Added')
            res.end()
        })
    })
})

app.get('/video/:id',(req,res)=>{
    var id = parseInt(req.params.id)
    mongoClient.connect(conString).then(clientObject=>{
        var database = clientObject.db('video-library')
        database.collection('videos').find({VideoId:id}).toArray().then(document=>{
            res.send(document)
            res.end()
        })
    })
})

app.put('/edit-video/:id',(req,res)=>{
    var id = parseInt(req.params.id)
    mongoClient.connect(conString).then(clientObject=>{
        var database = clientObject.db('video-library')
        database.collection('videos').updateOne({VideoId:id},{$set:{
            VideoId : parseInt(req.body.VideoId),
            Title:req.body.Title,
            Url : req.body.Url,
            Likes : parseInt(req.body.Likes),
            Dislikes : parseInt(req.body.Dislikes),
            Views : parseInt(req.body.Views),
            Comments : req.body.Comments,
            CategoryId : parseInt(req.body.CategoryId) 
        }}).then(()=>{
            console.log('Video Update')
            res.end()
        })
    })
})

app.delete('/delete-video/:id',(req, res)=>{
    var id = parseInt(req.params.id)
    mongoClient.connect(conString).then(clientObject=>{
        var database = clientObject.db('video-library')
        database.collection('videos').deleteOne({VideoId:id}).then(()=>{
            console.log('Video-Deleted')
            res.end()
        })
    })
})

app.listen('4000')
console.log('server started : http://127.0.0.1:4000')
