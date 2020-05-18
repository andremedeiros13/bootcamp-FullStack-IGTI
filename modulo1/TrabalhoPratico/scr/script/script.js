window.addEventListener('load', start);

function start () {

    console.log('login')
    SetColors();
    render();
}

var red = 0;
var green = 0;
var blue = 0;
var rgb =  [];


function SetColors() {

    var inputRed = document.querySelector('#red')
    var textRed = document.querySelector('#red-text')

    var inputGreen = document.querySelector('#green')
    var textGreen = document.querySelector('#green-text')

    var inputBlue = document.querySelector('#blue')
    var textBlue = document.querySelector('#blue-text')

    function setRed(value) {
        inputRed.value = value;
        textRed.value = value;
        red = value;
        render();
    }

    function setGreen(value) {
        inputGreen.value = value;
        textGreen.value = value;
        green = value;
        render();
    }

    function setBlue(value) {
        inputBlue.value = value;
        textBlue.value = value;
        blue = value;
        render();
    }
    inputRed.addEventListener('change', function() {
            setRed(event.target.value);
            event.preventDefault();
    })

    inputGreen.addEventListener('change', function(event) {
        setGreen(event.target.value);
        event.preventDefault();
    })

    inputBlue.addEventListener('change', function(event) {
        setBlue(event.target.value);
        event.preventDefault();
    })
}

function render() {
    clear();
    rgb.push(`${red},${green},${blue}`)

    var div = document.querySelector('.quadrado')
    div.style.backgroundColor=`rgb(${rgb})`;
}
function clear() {
    rgb = [];
}












// window.addEventListener('load', start);

// function start () {
//     console.log("iniciou")
//     colors();
//     render();
// }

// var rgb = [];
// var red = 0;
// var green = 0;
// var blue = 0;

// function colors () {

//     var inputRed = document.querySelector('#red');
//     var textRed = document.querySelector('#red-value');
//     textRed.value = inputRed.value;

//     var inputGreen = document.querySelector('#green');
//     var textGreen = document.querySelector('#green-value');
//     textGreen.value = inputGreen.value;

//     var inputBlue = document.querySelector('#blue');
//     var textBlue = document.querySelector('#blue-value');
//     textBlue.value = inputBlue.value

//     function updateRed(value) {
//         inputRed.value = value;
//         textRed.value = value;
//         red = value;
//     }

    
//     function updateGreen(value) {
//         inputGreen.value = value;
//         textGreen.value = value;
//         green = value;

//     }

    
//     function updateBlue(value) {
//         inputBlue.value = value;
//         textBlue.value = value;
//         blue = value;

//     }
    
//     inputRed.addEventListener('change', function(event){
//         updateRed(event.target.value)
//         event.preventDefault();
//         render();
//         clear();
//     });

//     inputGreen.addEventListener('change', function(event) {
//         updateGreen(event.target.value);
//         event.preventDefault();
//         render();
//         clear();

//     });

//     inputBlue.addEventListener('change', function(event) {
//         updateBlue(event.target.value);
//         event.preventDefault();
//         render();
//         clear();
//     })
    
// }

// function renderrgb () {
//     clear();
//     rgb.push(`${red}, ${green}, ${blue}`);
    
//     var div = document.createElement('div');
//     div.style.width='90px';
//     div.style.height='90px';
//     div.style.backgroundColor=`rgb(${rgb})`;
//     div.classList.add('rgb-color');

//     return div;
// }

// function render () {

//     if(document.querySelector('.rgb-colo')){
//         return
//     } else {

//         var div = renderrgb();
//         var divOrigin = document.querySelector('.rgb')
//         divOrigin.appendChild(div);
//     }
//     clear();
// }

// function clear() {
//     rgb = [];
// }