window.addEventListener('load', () => {

    doFetch();
    doFetchAsync();

    executDivisionPromise();
    executDivisionPromiseAsyncAwait();

    // divisionPromise(12, 6).then(result => {
    //     console.log(result);
    // });

    // divisionPromise(12, 0).then(result => {
    //     console.log(result);
    // }).catch(error => {
    //     console.log(error);
    // });

});
function doFetch() {
    fetch('https://api.github.com/users/andremedeiros13').then(res => {
        res.json().then(data => {
            showData(data);
        });
    }).catch(error => {
        console.log(error);
    });
}

async function doFetchAsync() {
    const res = await fetch('https://api.github.com/users/andremedeiros13')
    const json = await res.json();
    console.log(json);
}


function showData(data) {
    const user = document.querySelector('#user');
    user.textContent = `${data.login} ${data.name}`;
}

function divisionPromise(a, b) {
    return new Promise((resolve, reject) => {
        if (b === 0) {
            reject('Não é possível dividir por 0');
        }
        resolve(a / b);
    });
}

function executDivisionPromise() {
    divisionPromise(12, 6).then(result => {
        console.log(result);
    });

    divisionPromise(12, 0).then(result => {
        console.log(result);
    }).catch(error => {
        console.log(error);
    });

}

async function executDivisionPromiseAsyncAwait() {
    const division = await divisionPromise(12, 2);
    console.log(division);
}