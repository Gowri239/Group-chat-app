const express = require('express')

const fs = require('fs')

const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.urlencoded({extended:false}))

app.get('/',(req,res) => {
   fs.readFile('message.txt',(err,data) => {
      if(err){
         data = 'No chat exists'
      }
      res.send(
         `${data}<form action="/" method="POST" onSubmit="document.getElementById('username').value = localStorage.getItem('username')">
         <input id="message" type="text" name="message">
         <input id="username" type="hidden" name="username" ><br/>
         <button type="submit">send</button>
         </form>`
      )
   }) 
})

app.post("/",(req,res) => {
   fs.writeFile("message.txt",`${req.body.username}:${req.body.message}`,{flag:'a'},(err) =>{
      err ? console.log(err) : res.redirect("/")
   })
})

app.use("/login",(req,res) => {
   res.send(
      `<form action="/" method="POST" onSubmit="localStorage.setItem('username',document.getElementById('username').value)">
      <input type="text" id="username" name="username"><br/>
      <button type="submit">login</button>
      </form>`)
})

app.post("/",(req,res) => {
   data.push(`${req.body.username}:${req.body.message}`)
   res.redirect("/")
})

 app.use((req,res,next) => {
    res.status(404).send('<h1>Page not Found</h1>')
 })

app.listen(3000)