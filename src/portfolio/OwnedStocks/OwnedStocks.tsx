import React, { useState } from "react";
import { OwnedElement } from "../OwnedElement/OwnedElement";
import { StockSearchBox } from "./../StockSearchBox/StockSearchBox";
import { OwnedStocksDropdown } from "../StocksDropdown/StocksDropdown";
import { connect } from "react-redux";
import { mapStateToProps } from "../../actions/actions";

type StockItem = {
  stockId: string;
  title: string;
  shares: number;
  color: string;
  ticker: string;
};

interface Redux {
  stocks: StockItem[];
}

const OwnedStocks: React.FC<Redux> = (props) => {
  const [results, setResults] = useState([] as any);

  return (
    <div>
      {props.stocks.map((el: StockItem) => (
        <OwnedElement title={el.title} />
      ))}
      <StockSearchBox modResults={(res) => setResults(res)} />
      <OwnedStocksDropdown stocks={results} />
    </div>
  );
};

export default connect(mapStateToProps)(OwnedStocks);