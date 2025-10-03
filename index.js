require('dotenv').config();
const Person = require('./models/person');
const express = require('express');
// const morgan = require('morgan');

const app = express();

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
};

app.use(express.static('dist'));
app.use(express.json());
app.use(requestLogger);
// app.use(morgan('tiny'));
// morgan.token('body', (req) => JSON.stringify(req.body));
// app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));
// can use morgan for logging or create your own middleware for logging


app.get('/api/persons', (req, res) => {
    Person.find({}).then(persons => {
        res.json(persons);
    });
});

app.get('/info', (req, res) => {
    const date = new Date();
    Person.find({})
        .then(persons => {
            res.send(`
                <p>Phonebook has info for ${persons.length} people</p>
                <p>${date}</p>
            `);
        })
});

app.get('/api/persons/:id', (req, res) => {
    Person.findById(req.params.id)
        .then(person => {
            if (person) {
                res.json(person);
            } else {
                res.status(404).end();
            }
        })
        .catch(error => {
            console.log(error);
            next(error);
        })
});

app.delete('/api/persons/:id', (req, res, next) => {
    const id = req.params.id;
    Person.findByIdAndDelete(id)
        .then(result => {
            if (result) {   
                res.status(204).end();
            } else {
                res.status(404).json({ error: 'Person not found' });
            } 
        })
        .catch(error => {
            console.log(error);
            next(error);
        });
});

app.post('/api/persons', async (req, res) => {
    try {
        const { name, number } = req.body;

        if (!name || !number) {
            return res.status(400).json({ error: 'Name and number are required' });
        }

        const existingName = await Person.findOne({ name });
        if (existingName) {
            return res.status(400).json({ error: 'Name must be unique please' });
        }

        const existingNumber = await Person.findOne({ number });
        if (existingNumber) {
            return res.status(400).json({ error: 'Number must be unique please' });
        }

        const newPerson = new Person({ name, number });
        const savedPerson = await newPerson.save();
        res.status(201).json(savedPerson);
    } catch (error) {
        console.error(error);
        if (error.name === 'ValidationError') {
            return res.status(400).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
});

app.put('/api/persons/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const { name, number } = req.body;

        if (!name || !number) {
            return res.status(400).json({ error: 'Name and number are required' });
        }

        const person = await Person.findById(id);
        if (!person) {
            return res.status(404).json({ error: 'Person not found' });
        }

        const existingName = await Person.findOne({ name });
        if (existingName && existingName.id !== id) {
            return res.status(400).json({ error: 'Name must be unique please' });
        }

        const existingNumber = await Person.findOne({ number });
        if (existingNumber && existingNumber.id !== id) {
            return res.status(400).json({ error: 'Number must be unique please' });
        }

        person.name = name;
        person.number = number;
        await person.save();
        res.json(person);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error updating person' });
    }
});

const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' });
};
app.use(unknownEndpoint);

const errorHandler = (error, req, res, next) => {
    console.error(error.message);

    if (error.name === 'CastError') {
        return res.status(400).send({ error: 'malformatted id' })
    }
    next(error);
};
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});