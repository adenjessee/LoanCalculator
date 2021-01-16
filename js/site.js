


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

function calculateLoanInfo(){
    // Input values
    let amount_loaned = 25000;//document.getElementById("loan_total").value;
    let term = 60;//document.getElementById("term").value;
    let rate = 5;//document.getElementById("rate").value;
    let monthly = totalMonthlyPayment(amount_loaned, rate, term);
    let = previousBalance = amount_loaned;
    let totalInterest = 0;
    let totalPrincipal = 0;

    // monthly values 
    monthArray = [];
    paymentArray = [];
    principalArray = [];
    interestArray = [];
    totalInterestArray = [];
    balanceArray = [];

    // loop through the months of the loan payments
    for(let i = 0; i <= term; i++){
        monthArray.push(i+1);
        paymentArray.push(monthly);
        let balance = amount_loaned - totalPrincipal;
        let interest = interestPayment(balance, rate);
        interestArray.push(interest);
        let principal = principalPayment(monthly, interest);
        totalPrincipal += principal;
        principalArray.push(principal);
        totalInterest += interest;
        totalInterestArray.push(totalInterest);
        balanceArray.push(balance);
    }

    for(let i = 0; i < term; i++){
        console.log(monthArray[i]);
        console.log(paymentArray[i].toFixed(2));
        console.log(principalArray[i].toFixed(2));
        console.log(interestArray[i].toFixed(2));
        console.log(totalInterestArray[i].toFixed(2));
        console.log(balanceArray[i+1].toFixed(2));
        console.log("-----------")
    }

    // Calculate Main Output Values
    //let monthly = totalMonthlyPayment(amount_loaned, rate, term);
    //let interest = interestPayment(previousBalance, rate);
    //let principal = principalPayment(monthly, interest);

    let totaCost = amount_loaned + totalInterest;
    document.getElementById("monthly").innerHTML = monthly.toFixed(2);
    document.getElementById("total_principal").innerHTML = (amount_loaned.toFixed(2));
    document.getElementById("total_interest").innerHTML = (totalInterest.toFixed(2));
    document.getElementById("total_cost").innerHTML = (totaCost.toFixed(2));

    // Apply main outputs

}


document.getElementById("submitButton").addEventListener("click", calculateLoanInfo);
