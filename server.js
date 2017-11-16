const express= require("express")
const hbs= require("hbs")
const fs= require('fs')

let app= express()

app.set("view engine", "hbs")
app.use(express.static(__dirname+ "/public"))
app.use((req, res, next)=> {
  let now= new Date().toString(),
      log= `${now}: ${req.method} ${req.originalUrl}`
  console.log(log)
  fs.appendFile('server.log', log+ '\n', e=>{e? console.log('Unable to append to server.log'): null})
  next()
})
// app.use((req, res, next)=> {
//   res.render("maintenance.hbs")
// })
hbs.registerPartials(__dirname+ "/views/partials")

hbs.registerHelper("getCurrentYear", ()=> new Date().getFullYear())
hbs.registerHelper("screamIt", text=> text.toUpperCase())

app.get("/", (req, res)=> {
  res.render("home.hbs", {
    pageTitle: "Home Page",
    message: "Welcome to the Home page!"
  })
})
app.get("/about", (req, res)=> {
  res.render("about.hbs", {
    pageTitle: "About Page",
  })
})
app.get("/bad", (req, res)=> {
  res.send({
    errorMessage: "This page does not exist"
  })
})

app.listen(3000, ()=>{
  console.log("Listening on port 3000")
})
