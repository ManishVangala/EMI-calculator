import { useEffect, useState } from "react";
import "./App.css";
import { TenureData } from "./utils/constants";
function App() {
  const [cost, setCost] = useState(0);
  const [interest, setInterest] = useState(10);
  const [fee, setFee] = useState(1);
  const [downPayment, setDownPayment] = useState(0);
  const [tenure, setTenure] = useState(12);
  const [emi, setEmi] = useState(0);

  const calculateEMI = (downpayment) => {
    if (!cost) return;

    const loanAmount = cost - downpayment;
    const rateOfInterest = interest / 100;
    const numOfYears = tenure / 12;

    const EMI =
      (loanAmount * rateOfInterest * (1 + rateOfInterest) ** numOfYears) /
      (((1 + rateOfInterest) ** numOfYears) - 1);

    return Number(EMI / 12).toFixed();
  };

  const calculateDownPayment = (emi) => {
    if (!cost) return;
    const downPaymentPercentage = 100 - (emi / calculateEMI(0)) * 100;
    return Number((downPaymentPercentage / 100) * cost).toFixed(0);
  };

  const updateEmi = (e) => {
    if (!cost) return;
    const dp = Number(e.target.value);
    setDownPayment(dp.toFixed(0));

    // calculate emi and update it
    const emi = calculateEMI(dp);
    setEmi(emi);
  };

  const updateDownPayment = (e) => {
    if (!cost) return;
    const emi = Number(e.target.value);
    setEmi(emi.toFixed(0));

    const dp = calculateDownPayment(emi);
    setDownPayment(dp);

    // calcuate downpayment and update it
  };

  useEffect(() => {
    if (!(cost > 0)) {
      setDownPayment(0);
      setEmi(0);
    }

    const emi = calculateEMI(downPayment);
    setEmi(emi);
  }, [tenure]);

  return (
    <div className="App">
      <span
        className="title"
        style={{ textAlign: "center", marginTop: "20px" }}
      >
        EMI CALCULATOR
      </span>

      <span className="title">LOAN AMOUNT</span>
      <input
        type="number"
        value={cost}
        placeholder="Enter Cost"
        onChange={(e) => setCost(e.target.value)}
      />

      <span className="title">Interest rate (in %) </span>
      <input
        type="number"
        value={interest}
        placeholder="Enter Cost"
        onChange={(e) => setInterest(e.target.value)}
      />

      <span className="title"> Processing fee (in %) </span>
      <input
        type="number"
        value={fee}
        placeholder="Enter Cost"
        onChange={(e) => setFee(e.target.value)}
      />

      <span className="title">Down payment </span>
      <div>
        <input
          type="range"
          min={0}
          max={cost}
          className="slider"
          value={downPayment}
          onChange={updateEmi}
        />

        <span
          className="title"
          style={{
            textDecoration: "underline",
            marginBottom: "10px",
            display: "block",
          }}
        >
          Total Down Payment - Rs:{(Number(downPayment) + (cost - downPayment) * (fee/100) .toFixed(0))}
        </span>

        <div className="labels">
          <label>0%</label>
          <b>{downPayment}</b>
          <label>100%</label>
        </div>
      </div>

      <span className="title">EMI </span>
      <div>
        <input
          type="range"
          min={calculateEMI(cost)}
          max={calculateEMI(0)}
          className="slider"
          value={emi}
          onChange={updateDownPayment}
        />

        <span
          className="title"
          style={{
            textDecoration: "underline",
            marginBottom: "10px",
            display: "block",
          }}
        >
          Total Loan amount - Rs:{(emi*tenure)}
        </span>

        <div className="labels">
          <label>{calculateEMI(cost)}</label>
          <b>{emi}</b>
          <label>{calculateEMI(0)}</label>
        </div>
      </div>

      <span className="title">Tenure </span>
      <div className="tenure__container">
        {TenureData.map((t) => {
          return (
            <button
              className={`tenure ${t === tenure ? "selected" : ""}`}
              onClick={() => setTenure(t)}
            >
              {t}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default App;
