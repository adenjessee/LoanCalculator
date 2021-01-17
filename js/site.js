


function totalMonthlyPayment(amount, rate, months){
    return(amount * (rate / 1200.0) / (1 - Math.pow((1+rate/1200.0), -months)));
}

function remainingBalance(balancePrev, principal){
    return(balancePrev - principal * 1.0);
}

function interestPayment(balancePrev, rate){
    return(balancePrev * rate / 1200.0);
}

function principalPayment(monthlyPayment, interestPayment){
    return(monthlyPayment - interestPayment * 1.0);
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// loop though a set of arrays in an array to display its table
function displayLargeTable(arraySet) {

    // large string to append HTML for table
    let largeString = [];

    // loop through the number of values the user wants
    for(let i = 0; i < arraySet[0].length-1; i++){
        largeString += `<tr>`;
        for(let j = 0; j < arraySet.length; j++){
            largeString += `<td>${arraySet[j][i]}</td>`;
        }
        largeString += `</tr>`;
    }

    return(largeString);
}

function displayTableLabel(labelArray){

    // large string to store HTML
    let largeString = [];

    // loop through table labels and put them in HTML string
    largeString += `<tr>`;
    for(let j = 0; j < labelArray.length; j++){
        largeString += `<td>${labelArray[j]}</td>`;
    }
    largeString += `</tr>`;

    return(largeString);

}

function calculateLoanInfo(){
    // Input values
    let amount_loaned = document.getElementById("loan_total").value;
    let term = document.getElementById("term").value;
    let rate = document.getElementById("rate").value;
    let monthly = totalMonthlyPayment(amount_loaned, rate, term);
    let = previousBalance = amount_loaned;
    let totalInterest = 0;
    let totalPrincipal = 0;
    let shouldContinue = true;

    if(rate > 100.0){
        alert("Please Enter A Percentage Rate Less Than 100");
        shouldContinue = false;
    }

    // monthly values 
    monthArray = [];
    paymentArray = [];
    principalArray = [];
    interestArray = [];
    totalInterestArray = [];
    balanceArray = [];

    // loop through the months and calculate and store all data
    for(let i = 0; i <= term; i++){
        monthArray.push(i+1);
        paymentArray.push("$"+numberWithCommas(monthly.toFixed(2)));
        let balance = amount_loaned - totalPrincipal;
        let interest = interestPayment(balance, rate);
        interestArray.push("$"+numberWithCommas(interest.toFixed(2)));
        let principal = principalPayment(monthly, interest);
        totalPrincipal += principal;
        principalArray.push("$"+numberWithCommas(principal.toFixed(2)));
        totalInterest += interest;
        totalInterestArray.push("$"+numberWithCommas(totalInterest.toFixed(2)));
        balanceArray.push("$"+numberWithCommas(balance.toFixed(2)));
    }

    if (amount_loaned == null || amount_loaned == "", term == null || term == "", rate == null || rate == "") {
        alert("Please Fill All Required Fields");
        shouldContinue = false;
    }

    if(shouldContinue){
        // print the top card table values
        let totalCost = parseFloat(amount_loaned) + parseFloat(totalInterest);
        document.getElementById("monthly").innerText = numberWithCommas(monthly.toFixed(2));
        document.getElementById("total_principal").innerText = "$"+ numberWithCommas(parseFloat(amount_loaned).toFixed(2));
        document.getElementById("total_interest").innerHTML = "$"+numberWithCommas(parseFloat(totalInterest).toFixed(2));
        document.getElementById("total_cost").innerHTML = "$"+numberWithCommas(parseFloat(totalCost).toFixed(2));

        let arraySet = [monthArray, paymentArray, principalArray, interestArray, totalInterestArray, balanceArray];
        let labelArray = ["Month", "Payment", "Principal", "Interest", "Total Interest", "Balance"];

        console.log(displayTableLabel(labelArray));

        document.getElementById("largeTable").innerHTML = displayTableLabel(labelArray);

        document.getElementById("largeTable").innerHTML += displayLargeTable(arraySet);
    }
}

// apply all laon calculations to cards when button is clicked
document.getElementById("submitButton").addEventListener("click", calculateLoanInfo);

