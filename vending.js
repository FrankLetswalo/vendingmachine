
var messageEl = document.getElementById("message")
var paidEl = document.getElementById("paid")

var msg = ""
var change = 0
var moneyInserted = 0
var resetting = ""
var totalPaid = 0
var sodas = ["Coke", "Sprite", "Lemon Twist", "Tab"]

const curreny_five = 5
const currency_one = 1
const currency_quarter = 0.25
const currency_nickel = 0.05
const currency_dime = 0.10

const price = 1.30

// Calculates how much money was entered
function getTotal() {
    var curreny_fives = Number(document.getElementById("5 Rands").value)
    var currency_ones = Number(document.getElementById("1 Rand").value)
    var currency_quarters = Number(document.getElementById("0.25 Cents").value)
    var currency_nickels = Number(document.getElementById("0.5 Cents").value)
    var currency_dimes = Number(document.getElementById("0.10 Cents").value)
    
    if (currency_ones > 0) {
        currency_ones = currency_ones * currency_one
    }
    
    if (curreny_fives > 0) {
        curreny_fives = curreny_fives * curreny_five
    }

    if (currency_quarters > 0) {
        currency_quarters = currency_quarters * currency_quarter
    }

    if (currency_nickels > 0) {
        currency_nickels = currency_nickels * currency_nickel
    }

    if (currency_dimes > 0) {
        currency_dimes = currency_dimes * currency_dime
    } 

    totalPaid = curreny_fives + currency_ones + currency_quarters + currency_nickels + currency_dimes
    return totalPaid.toFixed(2)
}

// Updates the display of Total Entered
function tally() {
    moneyInserted = getTotal()
    document.getElementById("paid").innerHTML = moneyInserted
}

// Resets the amount of Total Entered
function clearTally() {
    moneyInserted = 0
    document.getElementById("paid").innerHTML = moneyInserted
}

// Resets the form back to 0
function clearForm() {
    document.getElementById("5 Rands").value = 0
    document.getElementById("1 Rand").value = 0
    document.getElementById("0.25 Cents").value = 0
    document.getElementById("0.5 Cents").value = 0
    document.getElementById("0.10 Cents").value = 0
}

// Calculates the difference from total paid from price
function calculateChange() {
    var tempChange = 0

    if (getTotal() != 0) {
        return tempChange = (getTotal() - price).toFixed(2)
    }

    return tempChange.toFixed(2)
}

// Generate messages based on soda selected and amount paid
function dispenseSoda(soda) {
    messageEl.innerHTML = ''
    change = 0

    var selectedSoda = sodas[soda]
    
    change = calculateChange()

    if (change < 0) {
        msg = "You did not pay enough. R" + totalPaid.toFixed(2) + " has been returned to the coin return."
        totalPaid = 0
        change = 0
        clearForm()
        clearTally()
        messageEl.innerHTML = msg
    } else if (change > 0) {
        msg = selectedSoda + " has been dispensed. R" + change + " has been returned to the coin return."
        totalPaid = 0
        change = 0
        clearForm()
        clearTally()
        messageEl.innerHTML = msg
    } else if (totalPaid == 0) {
        msg = "Please pay before you select a soda."
        messageEl.innerHTML = msg
    } else if (change == 0) {
        msg = selectedSoda + " has been dispensed."
        totalPaid = 0
        change = 0
        clearForm()
        clearTally()
        messageEl.innerHTML = msg
    } 
}

// Cancels the transaction and resets the page
function cancel() {
    getTotal()
    if (totalPaid > 0) {
        msg = "Transaction cancelled. R" + totalPaid.toFixed(2) + " has been returned to the coin return."

        clearForm()
        clearTally()

        messageEl.innerHTML = msg
    } else if (totalPaid == 0) {
        msg = "Insert money first. Select a soda."

        messageEl.innerHTML = msg
    }
}

function reset(){
    moneyInserted = 0
    document.getElementById("paid").innerHTML = moneyInserted
    
    $("#success-alert").fadeTo(2000, 500).slideUp(500, function(){
        $("#success-alert").alert('close');
    });
}
