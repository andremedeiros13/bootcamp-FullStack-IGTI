'use strict';
window.addEventListener('load', () => {
    doSpread();
    doRest();
    doDestructuring();
});

function doSpread() {
    const marriedMen = people.results.filter(
        person => (person.name.title === 'Mr'));

    const marriedWomen = people.results.filter(
        person => (person.name.title === 'Ms'));

    const marriedPeople = [
        ...marriedMen,
        ...marriedWomen,
        { msg: 'olá' }
    ];

    console.log(marriedPeople);
}

function doRest() {
    console.log(infiniteSum(1, 2, 7, 9, 20, 35));
}

function infiniteSum(...numbers) {
    return numbers.reduce((acc, curr) => acc + curr, 0)
}

function doDestructuring() {
    const first = people.results[0];

    //Repetitivo, forma "convencional"
    // const username = first.login.username
    // const password = first.login.password

    const { username, password } = first.login;

    console.log(username);
    console.log(password);
}