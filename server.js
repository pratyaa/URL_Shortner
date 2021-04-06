const express= require('express')
const mongoose=require('mongoose')
const shortUrl=require('./models/ShortURL')

const app= express()

mongoose.connect('mongodb://localhost/urlShortner',{
    useNewUrlParser:true , useUnifiedTopology:true
})
app.set('view engine','ejs')
app.use(express.urlencoded({extended:false}))

app.get('/',async (req,res)=>{
    const shorturls=await shortUrl.find()
    res.render('index',{shorturls:shorturls})
})

app.post('/shorturls',async (req,res)=>{
await shortUrl.create({full:req.body.fullurl})
res.redirect('/')
})

app.get('/:myshortUrl', async (req,res)=>
{
    var shortU = await shortUrl.findOne({ short: req.params.myshortUrl})
    console.log(shortU.short)
    if (shortU== null)
    {
        return res.sendStatus(404)
    }

    shortU.click++
    shortU.save((err)=>
    {
        if (err)
        console.out(err)
    })

    res.redirect(shortU.full)
})
app.listen(process.env.PORT || 3000)