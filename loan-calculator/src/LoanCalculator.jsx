import React, { useState } from 'react';

const LoanCalculator = () => {
  const [loanAmount, setLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [loanTerm, setLoanTerm] = useState('');
  const [monthlyPayment, setMonthlyPayment] = useState(null);
  const [totalPayment, setTotalPayment] = useState(null);
  const [totalInterest, setTotalInterest] = useState(null);

  const calculatePayment = (e) => {
    e.preventDefault();
    const principal = parseFloat(loanAmount);
    const calculatedInterest = parseFloat(interestRate) / 100 / 12;
    const calculatedPayments = parseFloat(loanTerm) * 12;

    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal * x * calculatedInterest) / (x - 1);

    if (isFinite(monthly)) {
      setMonthlyPayment(monthly.toFixed(2));
      setTotalPayment((monthly * calculatedPayments).toFixed(2));
      setTotalInterest(((monthly * calculatedPayments) - principal).toFixed(2));
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-200"> 
      <div className="calculator w-2/4 mx-auto p-4 pt-6 md:p-6 lg:p-12 bg-slate-400 rounded shadow-md">
        <h1 className="text-3xl font-bold mb-4 text-center text-slate-800">Loan Calculator</h1>
        <form onSubmit={calculatePayment} className="space-y-4">
          <div className="form-group mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="loanAmount">Loan Amount ($)</label>
            <input
              type="number"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="form-group mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="interestRate">Interest Rate (%)</label>
            <input
              type="number"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="form-group mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="loanTerm">Loan Term (Years)</label>
            <input
              type="number"
              value={loanTerm}
              onChange={(e) => setLoanTerm(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <button type="submit" className="bg-slate-700 hover:bg-slate-800 text-white font-bold py-2 px-4 rounded">Calculate</button>
        </form>

        {monthlyPayment && (
          <div className="results mt-6">
            <h2 className="text-2xl font-bold mb-2">Results:</h2>
            <p className="text-gray-700 text-sm">Monthly Payment: ${monthlyPayment}</p>
            <p className="text-gray-700 text-sm">Total Payment: ${totalPayment}</p>
            <p className="text-gray-700 text-sm">Total Interest: ${totalInterest}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoanCalculator;