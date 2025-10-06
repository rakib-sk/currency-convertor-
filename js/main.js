const BASE_URL = "https://open.er-api.com/v6/latest/";

const dropdownSelect = document.querySelectorAll(".dropdown select");
const btn = document.getElementById("btn");
const formCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");
const fromFlag = document.getElementById("from-flag");
const toFlag = document.getElementById("to-flag");
for (let select of dropdownSelect) {
  for (let curr in countryList) {
    let opt = document.createElement("option");
    opt.innerText = curr;
    opt.value = curr;
    if (select.name === "from" && curr === "USD") opt.selected = true;
    if (select.name === "to" && curr === "BDT") opt.selected = true;
    select.append(opt);
  }
  select.addEventListener("change", () => {
    if (select.name === "from") {
      fromFlag.src = `https://flagsapi.com/${countryList[formCurr.value]}/flat/64.png`;
    } else {
      toFlag.src = `https://flagsapi.com/${countryList[toCurr.value]}/flat/64.png`;
    }
  });
}
btn.addEventListener("click", async () => {
  let amount = parseFloat(document.querySelector(".amount input").value);
  if (isNaN(amount) || amount < 1) {
    amount = 1;
    document.querySelector(".amount input").value = "1";
  }
  try {
    const URL = `${BASE_URL}${formCurr.value}`;
    const response = await fetch(URL);
    const data = await response.json();

    if (data.result !== "success") {
      msg.innerText = "Currency API error!";
      return;
    }

    const rate = data.rates[toCurr.value];
    const finalAmount = (amount * rate).toFixed(2);
    msg.innerText = `${amount} ${formCurr.value} = ${finalAmount} ${toCurr.value}`;
  } catch (err) {
    msg.innerText = "Error fetching exchange rate!";
    console.error(err);
  }
});