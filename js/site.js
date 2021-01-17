

var myChart1 = null;
var myChart2 = null;
var myChart3 = null;


// START LOAN MATH FUNCTIONS ==============================================================
function totalMonthlyPayment(amount, rate, months){
    if(rate > 0){   
        return(amount * (rate / 1200.0) / (1 - Math.pow((1+rate/1200.0), -months)));
    }
    else{
        if(months > 0){
            return(amount / months);
        }
        else{
            return(amount);
        }
    }
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
// END LOAN MATH FUNCTIONS ===============================================================

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

// function to return HTML text for a bootstrap table using a 2D array
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

// function to take inputs, caclulate, and produce outputs for loan information
function calculateLoanInfo(){

    // clear the small table
    document.getElementById("monthly").innerText = "----"
    document.getElementById("total_principal").innerText = "----"
    document.getElementById("total_interest").innerHTML = "----"
    document.getElementById("total_cost").innerHTML = "----"

    // clear the large table
    document.getElementById("largeTable").innerHTML = "";

    // Input values
    let amount_loaned = document.getElementById("loan_input").value;
    let term = document.getElementById("term_input").value;
    let rate = document.getElementById("rate_input").value;
    let monthly = totalMonthlyPayment(amount_loaned, rate, term);
    let = previousBalance = amount_loaned;
    let totalInterest = 0;
    let totalPrincipal = 0;


    // fixing user input ==============================
    if (amount_loaned == null || amount_loaned == "", term == null || term == "", rate == null || rate == "") {
        alert("Please Fill All Required Fields");
        document.getElementById('loanCard').style.display = "none";
        return null;
    }
    if(rate > 100.0){
        alert("Please Enter A Percentage Rate Less Than 100");
        document.getElementById('loanCard').style.display = "none";
        return null;
    }
    if(amount_loaned == 0){
        alert("Please Enter A Loan Amount Greater Than 0");
        document.getElementById('loanCard').style.display = "none";
        return null;
    }
    if(term == 0){
        alert("Please Enter A Term Greater Than 0");
        document.getElementById('loanCard').style.display = "none";
        return null;
    }
    // ==================================================

    // show the card
    document.getElementById('loanCard').style.display = "block";

    // number and string values for table
    monthArray = [];
    paymentArray = [];
    principalArray = [];
    interestArray = [];
    totalInterestArray = [];
    balanceArray = [];

    //float values for chart
    paymentFloatArray = [];
    principalFloatArray = [];
    interestFloatArray = [];
    totalInterestFloatArray = [];
    balanceFloatArray = [];


    // loop through the months and calculate and store all data
    for(let i = 0; i <= term; i++){
        monthArray.push(i+1);
        paymentFloatArray.push(monthly);
        paymentArray.push("$"+numberWithCommas(monthly.toFixed(2)));
        let balance = amount_loaned - totalPrincipal;
        let interest = interestPayment(balance, rate);
        interestFloatArray.push(interest);
        interestArray.push("$"+numberWithCommas(interest.toFixed(2)));
        let principal = principalPayment(monthly, interest);
        totalPrincipal += principal;
        principalFloatArray.push(principal);
        principalArray.push("$"+numberWithCommas(principal.toFixed(2)));
        totalInterest += interest;
        totalInterestFloatArray.push(totalInterest);
        totalInterestArray.push("$"+numberWithCommas(totalInterest.toFixed(2)));
        balanceFloatArray.push(balance);
        balanceArray.push("$"+numberWithCommas(balance.toFixed(2)));
    }

    // make the arrays for the large table and its labels
    let arraySet = [monthArray, paymentArray, principalArray, interestArray, totalInterestArray, balanceArray];
    let arrayFloatSet = [monthArray, paymentFloatArray, principalFloatArray, interestFloatArray, totalInterestFloatArray, balanceFloatArray];
    let labelArray = ["Month", "Payment", "Principal", "Interest", "Total Interest", "Balance"];

    //show the chart
    showCharts(monthArray, arrayFloatSet, labelArray);

    // print the top card table values
    let totalCost = parseFloat(amount_loaned) + parseFloat(totalInterest);
    document.getElementById("total_principal").innerText = "$"+numberWithCommas(parseFloat(amount_loaned).toFixed(2));
    document.getElementById("term").innerText = "$"+numberWithCommas(parseFloat(term).toFixed(2));;
    document.getElementById("rate").innerText = "$"+numberWithCommas(parseFloat(rate).toFixed(2));;
    document.getElementById("total_interest").innerText = "$"+numberWithCommas(parseFloat(totalInterest).toFixed(2));
    document.getElementById("total_cost").innerText = "$"+numberWithCommas(parseFloat(totalCost).toFixed(2));

    // Print the information for the large table
    document.getElementById("largeTable").innerHTML = displayTableLabel(labelArray);
    document.getElementById("largeTable").innerHTML += displayLargeTable(arraySet);
}

function clearInformation(){

    // clear the input fields
    document.getElementById("loan_input").value = "";
    document.getElementById("term_input").value = "";
    document.getElementById("rate_input").value = "";

    // clear the small table
    document.getElementById("monthly").innerText = "----";
    document.getElementById("total_principal").innerText = "----";
    document.getElementById("term").innerHTML = "----";
    document.getElementById("rate").innerHTML = "----";
    document.getElementById("total_interest").innerHTML = "----";
    document.getElementById("total_cost").innerHTML = "----";

    // // clear the large table
    document.getElementById("largeTable").innerHTML = "";

    // dont show the card anymore
    document.getElementById('loanCard').style.display = "none";
}

function toggleOff(id) {
    var x = document.getElementById(id);
    x.style.display = "block";
    x.style.display = "none";
}

function showCharts(independentVars, dataSet){
    var ctx = document.getElementById('myChart1').getContext('2d');
    if(myChart1 != null){
        myChart1.destroy();
    }
    myChart1 = new Chart(ctx, {
        type: 'line',
        data: {
            labels: independentVars,
            datasets: [
                {
                    label: "Total Interest",
                    borderColor: 'pink',
                    data: dataSet[4]
                },
                {
                    label: "Balance",
                    borderColor: 'black',
                    data: dataSet[5]
                }
            ]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
    var ctx2 = document.getElementById('myChart2').getContext('2d');
    if(myChart2 != null){
        myChart2.destroy();
    }
    myChart2 = new Chart(ctx2, {
        type: 'line',
        data: {
            labels: independentVars,
            datasets: [
                {
                    label: "Payment",
                    borderColor: 'blue',
                    data: dataSet[1]
                },
                {
                    label: "Principal",
                    borderColor: 'green',
                    data: dataSet[2]
                },
            ]
        },
    });
    var ctx3 = document.getElementById('myChart3').getContext('2d');
    if(myChart3 != null){
        myChart3.destroy();
    }
    myChart3 = new Chart(ctx3, {
        type: 'line',
        data: {
            labels: independentVars,
            datasets: [
                {
                    label: "Interest",
                    borderColor: 'orange',
                    data: dataSet[3]
                }
            ]
        },
    });
}

// dont show the card by default
document.getElementById('loanCard').style.display = "none";

// apply all laon calculations to cards when button is clicked
document.getElementById("submitButton").addEventListener("click", calculateLoanInfo);

// clear the information if clear button is clicked
document.getElementById("clearButton").addEventListener("click", clearInformation);

