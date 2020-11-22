import React, { useState } from "react";
import { StocksDropdown } from "./StocksDropdown/StocksDropdown";
import { InitialPortfolioWelcome } from "./InitialPortfolioWelcome/InitialPortfolioWelcome";
import { InitialPortfolioBackground } from "./InitialPortfolioBackground/InitialPortfolioBackground";
import { InitialPortfolioSubHeader } from "./InitialPortfolioSubHeader/InitialPortfolioSubHeader";
import { InitialPortfolioSubContainer } from "./InitialPortfolioSubContainer/InitialPortfolioSubContainer";
import { StockSearchBox } from "./StockSearchBox/StockSearchBox";

const InitialPortfolio: React.FC = () => {
  const [showSubContainer, setShowSubContainer] = useState(true);
  const [results, setResults] = useState([] as any);

  function parsingSearchResults(argument: boolean) {
    if (argument === true) setShowSubContainer(false);
    else setShowSubContainer(true);
  }

  return (
    <div id="initial_portfolio">
      <InitialPortfolioWelcome />
      <InitialPortfolioBackground />
      <InitialPortfolioSubHeader />
      <StockSearchBox
        modResults={(res) => setResults(res)}
        parsingSearchResults={parsingSearchResults}
      />
      <StocksDropdown stocks={results} />
      <InitialPortfolioSubContainer showSubContainer={showSubContainer} />
    </div>
  );
};

export default InitialPortfolio;
