const express = require('express');
const bodyParse = require('body-parser');
const app = express();
const morgan = require('morgan')
const cors = require('cors');

app.use(bodyParse.json());
app.use(cors())
app.use(express.static('build'))
morgan('tiny');
app.use(morgan('tiny'))

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
  


app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.post('/api/persons', (req, res) => {
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
})
app.get('/info', (req, res) => {
    res.send(`
    <div>
    <p>puhelinluettelossa ${persons.length}  henkilon tiedot</p>
    <p> ${new Date()}</p>
    </div>`)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    const henkilo = persons.find(x => x.id === id)
    if (henkilo) {
        res.json(henkilo)
    } else {
        res.status(404).end()
    }
})

app.delete('/api/delete/:id', (req, res) => {
    const idd = Number(req.params.id)
    persons = person.filter(x => x.id !== idd)

    res.status(204).end();
})



const port = process.env.port ||  3001;

app.listen(port, () => {
    console.log(`server running in ${port}`)
})



  