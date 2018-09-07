const express = require('express');
const bodyParse = require('body-parser');
const app = express();
//const morgan = require('morgan')
const cors = require('cors');
const Persons = require('./models/persons')

app.use(bodyParse.json());
app.use(cors())
app.use(express.static('build'))

//morgan('tiny');
//app.use(morgan('tiny'))

let persons = 
     [
      {
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": 1
      },
      {
        "name": "Martti Tienari",
        "number": "040-123456",
        "id": 2
      },
      {
        "name": "Arto Järvinen",
        "number": "040-123456",
        "id": 3
      },
      {
        "name": "Lea Kutvonen",
        "number": "040-123456",
        "id": 4
      },
      {
        "name": "Saara Saippua",
        "number": "121",
        "id": 9
      }
      
    ]
  
const format = (note) => {
    return{
        name: note.name,
        number: note.number,
        id: note._id
    }
}

app.get('/api/persons', (req, res) => {
    Persons
       .find({})
       .then(p => {
           res.json(p.map(format))
       })
    //res.json(persons)
})

app.post('/api/persons', (req, res) => {
    
    const uusi = req.body;

    const persons = new Persons ({
        name: uusi.name,
        number: uusi.number
    })

    persons
       .save()
       .catch(error => {
           console.log(error)
           res.status(404).end()
       })
       .then(savedP => {
           res.json(format(savedP))
    })
    
    /*
    const generId = Math.floor((Math.random()* 1000) + 1)    

    const uusi = req.body;
    if (uusi.name === '' || uusi.number === ''){
      return res.status(400).json({ error: 'name or number missing'})
    }  else  if (persons.some(x => x.name === uusi.name)) {
        return res.status(400).json({ error: 'nimi on jo listassa'})
 
    }
    const person = {
        name: uusi.name,
        number: uusi.number,
        id: generId
    }
    console.log(person)

    persons = persons.concat(person)
    res.json(person)
    */
app.put('/api/persons/:id', (req, res) => {
    const body = req.body
    console.log(body)

    const update = {
        name: body.name,
        number: body.number
    }
    Persons
      .findByIdAndUpdate(req.params.id, update)
      .then(x => {
          res.json(format(x))
      })
      .catch(error => {
          response.status(400).send({ error: 'Oh No'})
      })

    })

})
app.get('/info', (req, res) => {
    res.send(`
    <div>
    <p>puhelinluettelossa ${persons.length}  henkilon tiedot</p>
    <p> ${new Date()}</p>
    </div>`)
})

app.get('/api/persons/:id', (req, res) => {
    /*
    const id = Number(req.params.id);
    const henkilo = persons.find(x => x.id === id)
    if (henkilo) {
        res.json(henkilo)
    } else {
        res.status(404).end()
    }
    */
   Persons
     .findById(req.params.id)
     .then(response =>{
         if(response){
             res.json(format(response))
         } else {
             res.status(404).end()
         }
     })
     .catch(error =>{
         res.status(400).send({ error: 'ei löydy' })
     })
})


app.delete('/api/persons/:id', (req, res) => {
    const idd = req.params.id
    console.log('psass', idd)

    Persons
       .findByIdAndRemove(req.params.id)
       .then(results => {
           res.status(204).end()
       })
       .catch(error => {
        response.status(400).send({ error: 'malformatted id' })
       .find({})
       .then(r => {
           res.json(r.map(format))
       }) 
    })
     
       
    /*
    persons = person.filter(x => x.id !== idd)

    res.status(204).end();
    */
})



const PORT = process.env.PORT ||  3001;

app.listen(PORT, () => {
    console.log(`server running in ${PORT}`)
})



  