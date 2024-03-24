const form = document.querySelector("#form");
const diamondBook = document.querySelector("#diamond-book");
const awakeningBook = document.querySelector("#awakening-book");
const btnReset = document.querySelector("#default");
const totalDiamond = document.querySelector("#total-diamond");
const highestAwakening = document.querySelector("#max-awakening");
const spanUpdate = document.querySelector("#if-update");

class Parent {
    constructor(target, currAwakening, currPointAwakening, span, reminder) {
        this.target = target;
        this.currAwakening = currAwakening; 
        this.currPointAwakening = currPointAwakening;
        this.span = span;
        this.reminder = reminder;
    }   

    setValue(targetValue = 0, currAwakening = 0 , currPointAwakening = 0) {
        this.target.value = targetValue;
        this.currAwakening.value = currAwakening;
        this.currPointAwakening.value = currPointAwakening;
    }

    setSpan(value) {
        this.span.textContent = value;
    }

    calculateNeeded() {
        const result = ((parseInt(this.target.value) * 100) - 
        (parseInt(this.currAwakening.value) * 100 + parseInt(this.currPointAwakening.value))) / 30;

        return Math.ceil(result);
    }

    setTargetMaxValue(value) {
        this.target.setAttribute("max", value);
    }

    setCurrAwakeningMaxValue(value = this.target.value) {
        this.currAwakening.setAttribute("max", value);
    }

    showReminder(ifShow) {
        if (ifShow === true) {
            return this.reminder.removeAttribute("hidden");
        }
        return this.reminder.setAttribute("hidden", 0);
    }
}

// initialize parent1, parent2
const parent1 = new Parent(document.querySelector("#parent1-target"), document.querySelector("#parent1-current-awakening"), 
    document.querySelector("#parent1-current-point"), document.querySelector("#p1-result-display"), document.querySelector("#p1-reminder"));
const parent2 = new Parent(document.querySelector("#parent2-target"), document.querySelector("#parent2-current-awakening"),
    document.querySelector("#parent2-current-point"), document.querySelector("#p2-result-display"),document.querySelector("#p2-reminder"));

function displayUpdateSpan(ifShow) {
    if (ifShow === true) {
        spanUpdate.removeAttribute("hidden");
    }
    else {
        spanUpdate.setAttribute("hidden", 0);
    }
}

const COST = 100;
const DECREASE_PERCENTAGE = 0.02;

form.addEventListener("submit", (event)=> {
    event.preventDefault();

    if (ifValid === true) {
        // calculate and display the result that how many D grade units needed 
        const parent1Need = parent1.calculateNeeded();
        const parent2Need = parent2.calculateNeeded();

        // calculate how many diamond needed to buy these units
        const diamondNeed = ((parent1Need * COST) + (parent2Need * COST)) * 
            (1 - (diamondBook.value * DECREASE_PERCENTAGE));

        parent1.setSpan(parent1Need);
        parent2.setSpan(parent2Need);

        totalDiamond.textContent = diamondNeed;
        displayUpdateSpan(true);
    }
    else {
        alert("提交的資料有錯誤，請檢查提示後再提交吧!");
    }
});

const validate = (parent)=>{
    if (parseFloat(parseInt(parent.currAwakening.value) + 
        parseInt(parent.currPointAwakening.value)/100) > 
        parseInt(parent.target.value)) {
        parent.showReminder(true);
        return false;
    }
    parent.showReminder(false);
    return true;
};

let ifValid = true;

form.addEventListener("change", ()=> {
    updateMaxAwakening();
    parent1.setCurrAwakeningMaxValue();
    parent2.setCurrAwakeningMaxValue();
    displayUpdateSpan(false);

    if ((validate(parent1) && validate(parent2)) === true) {
        ifValid = true;
    } else {
        ifValid = false;
    }
});

const resetValue = function(valueDiamond = 0, valueAwakening = 0, valueParent1 = [0,0,0], valueParent2 = [0,0,0]) {
    diamondBook.value = valueDiamond;
    awakeningBook.value = valueAwakening;
    parent1.setValue(...valueParent1);
    parent2.setValue(...valueParent2);
}

btnReset.addEventListener("click", ()=>{
    // reset the value of the input
    resetValue(0, 0, [0,0,0], [0,0,0]);
    
    // update the max value and the span
    updateMaxAwakening();
    displayUpdateSpan(false);
    parent1.setCurrAwakeningMaxValue();
    parent2.setCurrAwakeningMaxValue();
    parent1.setSpan(0);
    parent2.setSpan(0);
    totalDiamond.textContent = 0;
})

function updateMaxAwakening() {
    const max = (5 * awakeningBook.value) + 5;
    parent1.setTargetMaxValue(max);
    parent2.setTargetMaxValue(max);
    highestAwakening.textContent = max;
}


