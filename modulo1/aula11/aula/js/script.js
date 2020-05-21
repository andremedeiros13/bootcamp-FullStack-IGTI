'use strict';
window.addEventListener('load', () => {
    doMap();
    doFilter();
    doForeach();
    doReduce();
    doFinde();
    doSome();
    doEvery();
    doSort();
}
);

function doMap() {
    const nameEmailArray = people.results.map(person => {
        return {
            name: person.name,
            email: person.email
        };
    });
    console.log(nameEmailArray);
    return nameEmailArray;
}

function doFilter() {
    const olderThan50 = people.results.filter(person => {
        return person.dob.age > 50;
    })

    console.log(olderThan50);

}

function doForeach() {
    const mappedPeople = doMap();

    mappedPeople.forEach(person => {
        person.nameSize = person.name.title.length + person.name.first.length + person.name.last.length;
    })

    console.log(mappedPeople);
}

function doReduce() {
    const totalAges = people.results.reduce((accumulator, current) => {
        return accumulator + current.dob.age;
    }, 0)

    console.log(totalAges);

    //Reduce subistitui o código abaixo:

    // let sumAges = 0;

    // for (let i = 0; i < people.results.length; i++) {
    //     var current = people.results[i];
    //     sumAges += current.dob.age;
    // }

    // console.log(sumAges);
}

function doFinde() {
    const found = people.results.find(person => {
        return person.location.state === 'Minas Gerais';
    })
    console.log(found);
}

function doSome() {
    const found = people.results.some(person => {
        return person.location.state === 'Amazonas';
    });
    console.log(found);
}

function doEvery() {
    const every = people.results.every(person => {
        return person.nat === 'BR';
    });
    console.log(every);
}

function doSort() {
    const mappedNames = people.results.map(person => {
        return {
            name: person.name.first
        };
    }).filter(person => {
        return person.name.startsWith('A');
    }).sort((a, b) => {
        return a.name.localeCompare(b.name);
        // return a.name.length - b.name.length;
    });
    console.log(mappedNames)


}