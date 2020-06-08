const { promises } = require('fs');

const { readFile, writeFile } = promises;

const cities = [];
const states = [];

//load();
//CountCities('SP');
//MaxCities();
//MinCities();
//MaxNameCities();
//MinNameCities();
//CityMaxName();
//CityMinName();

async function load() {
    try {
        const cityData = await readFile('./Cidades.json');
        const city = JSON.parse(cityData);


        const stateData = await readFile('./Estados.json');
        const state = JSON.parse(stateData);

        for (let indexState = 0; indexState < state.length; indexState++) {

            let data = city.filter(city => city.Estado === `${state[indexState].ID}`);
            await writeFile(`./json/${state[indexState].Sigla}.json`, JSON.stringify(data));

        }

    } catch (err) {
        console.error(err);
    }
}

function CountCities(UF) {
    try {
        const count = require(`./json/${UF}.json`);
        console.log(count.length);

    } catch (err) {
        console.error(err);
    }
}

async function MaxCities() {
    const stateData = await readFile('./Estados.json');
    const json = JSON.parse(stateData);
    let state;
    let numCities = [];
    const results = [];


    for (let index = 0; index < json.length; index++) {
        state = require(`./json/${json[index].Sigla}.json`);
        numCities.push({
            UF: `${json[index].Sigla}`,
            Quantity: state.length
        })
    }

    numCities = numCities.sort((a, b) => {
        return b.Quantity - a.Quantity
    });

    for (let index = 0; index < 5; index++) {

        results.push(`${numCities[index]['UF']} - ${numCities[index]['Quantity']}`);
    }

    console.log(results);
}

async function MinCities() {
    const stateData = await readFile('./Estados.json');
    const json = JSON.parse(stateData);
    let state;
    let numCities = [];
    const results = [];


    for (let index = 0; index < json.length; index++) {
        state = require(`./json/${json[index].Sigla}.json`);
        numCities.push({
            UF: `${json[index].Sigla}`,
            Quantity: state.length
        })
    }

    numCities = numCities.sort((a, b) => {
        return a.Quantity - b.Quantity;
    });

    for (let index = 0; index < 5; index++) {

        results.push(`${numCities[index]['UF']} - ${numCities[index]['Quantity']}`);
    }

    console.log(results);
}

async function MaxNameCities() {
    const stateData = await readFile('./Estados.json');
    const json = JSON.parse(stateData);
    let state;
    let cities = [];
    const results = [];

    for (let index = 0; index < json.length; index++) {
        state = require(`./json/${json[index].Sigla}.json`);

        for (let indexName = 0; indexName < state.length; indexName++) {
            nameLength = state[indexName]['Nome'].length;

            cities.push({
                UF: `${json[index].Sigla}`,
                name: `${state[indexName].Nome}`,
                nameLength: `${nameLength}`
            });

        }
    }
    cities = cities.sort((a, b) => {
        return b.nameLength - a.nameLength;
    });

    for (let index = 0; index < json.length; index++) {

        results.push(`${cities[index]['name']} - ${cities[index]['UF']}`);
    }

    console.log(results);
}

async function MinNameCities() {
    const stateData = await readFile('./Estados.json');
    const json = JSON.parse(stateData);
    let state;
    let cities = [];
    const results = [];

    for (let index = 0; index < json.length; index++) {
        state = require(`./json/${json[index].Sigla}.json`);

        for (let indexName = 0; indexName < state.length; indexName++) {
            nameLength = state[indexName]['Nome'].length;

            cities.push({
                UF: `${json[index].Sigla}`,
                name: `${state[indexName].Nome}`,
                nameLength: `${nameLength}`
            });

        }
    }
    cities = cities.sort((a, b) => {
        return a.nameLength - b.nameLength;
    });

    for (let index = 0; index < json.length; index++) {

        results.push(`${cities[index]['name']} - ${cities[index]['UF']}`);
    }

    console.log(results);
}

async function CityMaxName() {
    const stateData = await readFile('./Estados.json');
    const json = JSON.parse(stateData);
    let state;
    let cities = [];
    const results = [];

    for (let index = 0; index < json.length; index++) {
        state = require(`./json/${json[index].Sigla}.json`);

        for (let indexName = 0; indexName < state.length; indexName++) {
            nameLength = state[indexName]['Nome'].length;

            cities.push({
                UF: `${json[index].Sigla}`,
                name: `${state[indexName].Nome}`,
                nameLength: `${nameLength}`
            });

        }
    }
    cities = cities.sort((a, b) => {
        return b.nameLength - a.nameLength;
    });

    for (let index = 0; index < 1; index++) {

        results.push(`${cities[index]['name']} - ${cities[index]['UF']} - ${cities[index]['nameLength']}`);
    }

    console.log(results);
}

async function CityMinName() {
    const stateData = await readFile('./Estados.json');
    const json = JSON.parse(stateData);
    let state;
    let cities = [];
    const results = [];

    for (let index = 0; index < json.length; index++) {
        state = require(`./json/${json[index].Sigla}.json`);

        for (let indexName = 0; indexName < state.length; indexName++) {
            nameLength = state[indexName]['Nome'].length;

            cities.push({
                UF: `${json[index].Sigla}`,
                name: `${state[indexName].Nome}`,
                nameLength: `${nameLength}`
            });

        }
    }
    cities = cities.sort((a, b) => {
        return a.nameLength - b.nameLength;
    });

    for (let index = 0; index < 1; index++) {

        results.push(`${cities[index]['name']} - ${cities[index]['UF']} - ${cities[index]['nameLength']}`);
    }

    console.log(results);
}