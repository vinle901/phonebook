const mongoose = require('mongoose');

const password = process.argv[2];

const url = ` `;

mongoose.set('strictQuery', false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
});

const Person = mongoose.model('Person', personSchema);

if (process.argv.length === 5) {
    const name = process.argv[3];
    const number = process.argv[4];

    const person = new Person({
        name,
        number,
    });
    person.save().then(() => {
        console.log(`Added ${name} number ${number} to phonebook`);
        mongoose.connection.close();
    });
}
if (process.argv.length === 3) {
    Person.find({}).then(result => {
        console.log('Phonebook:');
        result
        .forEach(person => {
            console.log(`${person.name} ${person.number}`);
        });
        mongoose.connection.close(); //put here to avoid hanging connections
    });
};
