import ExchangeRate from "./ExchangeRate";
import { useState } from "react";


import axios from "axios";
function CurrencyConverter() {
  const currencies = ["BTC", "ETH", "USD", "XRP", "LTC", "ADA"];
  const [chosenPrimaryCurrency, setChosenPrimaryCurrency] = useState("BTC");
  const [chosenSecondaryCurrency, setChosenSecondaryCurrency] = useState("BTC");
  const [amount, setAmount] = useState(1);
  const [exchangeRate, setExchangeRate] = useState(0);
  const [result, setResult] = useState(0);
  const convert = () => {
    const options = {
      method: "GET",
      url: "https://alpha-vantage.p.rapidapi.com/query",
      params: {
        from_currency: chosenPrimaryCurrency,
        function: "CURRENCY_EXCHANGE_RATE",
        to_currency: chosenSecondaryCurrency,
      },
      headers: {
        "X-RapidAPI-Key": "dd62c51c00msh8365891e0b230d8p1c2b70jsna3dd52f29a8a ",
        "X-RapidAPI-Host": "alpha-vantage.p.rapidapi.com",
      },
    };
    axios
      .request(options)
      .then((response) => {
        setExchangeRate(
          response.data["Realtime Currency Exchange Rate"]["5. Exchange Rate"]
        )
        setResult(
          response.data["Realtime Currency Exchange Rate"]["5. Exchange Rate"] *
            amount
        )
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div className="currency-converter">
      <h2>CurrencyConverter</h2>
      <div className="input-box">
        <table>
          <tbody>
            <tr>
              <td>Primary Currency</td>
              <td>
                <input
                  type="number"
                  name="currency-amount-1"
                  value={amount}
                  onChange={(e) => {
                    setAmount(e.target.value);
                    console.log(typeof e.target.value);
                  }}
                />
              </td>
              <td>
                <select
                  value={chosenPrimaryCurrency}
                  name="currency-option-1"
                  className="currency-option"
                  onChange={(e) => {
                    setChosenPrimaryCurrency(e.target.value);
                    console.log("changed");
                  }}
                >
                  {currencies.map((currency, _index) => (
                    <option key={_index}>{currency}</option>
                  ))}
                </select>
              </td>
            </tr>
            <tr>
              <td>Secondary Currency</td>
              <td>
                <input
                  type="number"
                  name="currency-amount-2"
                  value={result}
                  disable={true}
                />
              </td>
              <td>
                <select
                  value={chosenSecondaryCurrency}
                  name="currency-option-2"
                  className="currency-option"
                  onChange={(e) => {
                    setChosenSecondaryCurrency(e.target.value);
                    console.log("changed");
                  }}
                >
                  {currencies.map((currency, _index) => (
                    <option key={_index}>{currency}</option>
                  ))}
                </select>
              </td>
            </tr>
          </tbody>
        </table>
        <button id="convert-button" onClick={convert}>
          convert
        </button>
      </div>
      <ExchangeRate 
      exchangeRate={exchangeRate}
      chosenPrimaryCurrency={chosenPrimaryCurrency}
      chosenSecondaryCurrency={chosenSecondaryCurrency} />
    </div>

  );
}

export default CurrencyConverter;
