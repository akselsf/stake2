import { useCallback } from "react";

const DepositPopup = (props) => {
  let amount = 0;

  const deposit = async (amount) => {
    await fetch("/api/deposit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: amount,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        props.setBalance(data.balance);
        props.close();
      });
  };
  return (
    <div
      className="mx-auto bg-white fixed inset-x-0 top-1/4 w-64 z-50 h-64 "
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        border: "1px solid black",
        borderRadius: "20px",
      }}
    >
      <p style={{ textAlign: "center", fontSize: "20px", color: "black" }}>
        Deposit
      </p>
      <input
        onChange={(e) => (amount = e.target.value)}
        style={{
          width: "150px",
          border: ".5px solid black",
          height: "30px",
          marginLeft: "auto",
          marginRight: "auto",
          padding: "8px",
          color: "black",
          textAlign: "center",
          borderRadius: "9px",
        }}
        type="text"
      ></input>
      <button
        onClick={() => deposit(amount)}
        style={{
          color: "black",
          border: ".5px solid",
          width: "100px",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        Confirm
      </button>
    </div>
  );
};

export default DepositPopup;
