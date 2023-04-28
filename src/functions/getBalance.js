const getBalance = async () => {
  return await fetch("/api/getbalance", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      return data.balance;
    });
};

export default getBalance;
