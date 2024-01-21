if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', ready);
}else{
    ready();
}

var maleWeightClass = ['Heavyweight', 'Light-Heavyweight', 'Middlewieght', 'Welterweight',
                      'Lightweight', 'Featherweight', 'Bantamweight', 'Flyweight'];

var femaleWeightClass = ['Featherweight', 'Bantamweight', 'Flyweight'];

function ready(){
    var genderRadioButton = document.getElementsByName('genderChoice');
    genderChoice(genderRadioButton);
}


//********** Gender & WeightClass(Start) **********/

function genderChoice(genderRadioButton){
    for(var i = 0; i < genderRadioButton.length; i++){
        genderRadioButton[i].addEventListener('change', event => {
            displayWeightClass(event.target);
        });
    }
}

function clearOptions(weightClassElement){
    while (weightClassElement.options.length > 0) {                
        weightClassElement.remove(0);
    } 
}

function displayWeightClass(genderChoice){
    var weightClass = (genderChoice.value == 'Male') ? maleWeightClass : femaleWeightClass;
    var weightClassElement = document.getElementsByName('weightSelection')[0];
    clearOptions(weightClassElement);

    weightClass.forEach(element => {
         var option = document.createElement('option');
        option.value = element;
        option.innerHTML = element;
        weightClassElement.appendChild(option);
    })
}

//********** Gender & WeightClass(End) **********/
