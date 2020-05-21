'use strict';

//var x let

//var tem escopo abrangente
//let tem escopo reduzido

function withVar() {
    for (var i = 0; i < 10; i++) {
        console.log('var ' + i);
    }

    i = 20;
    console.log(i)
}

function withLet() {
    for (let i = 0; i < 10; i++) {
        console.log('let ' + i);
    }

    //i = 20;
    //console.log(i)
}

withVar();
withLet();

//const - não podemos reatribuir valores.

// const c = 10;
// c = 20;

const d = [];
console.log(d);

d.push(1);
console.log(d);

function sum(a, b) {
    return a + b;
};

const sum2 = function (a, b) {//função anonima
    return a + b;
};

//arrpw function 
const sum3 = (a, b) => {
    return a + b;
}

//arrow function reduzida
const sum4 = (a, b) => a + b;

console.log(sum(3, 5))
console.log(sum2(3, 5))
console.log(sum3(3, 5))
console.log(sum4(3, 5))


//template lierals
const name = 'Andre'
const surName = 'Medeiros'
const text1 = 'Meu nome é ' + name + ' ' + surName;
const text2 = `Meu nome é ${name} ${surName}`;

console.log(text1);
console.log(text2);

const sum5 = (a, b = 10) => a + b;
console.log(sum5(2, 5))