import React from 'react';
import ReactDOM from 'react-dom';
import Currency from "./pages/Currency";

const App = () => {
  return (
      <React.StrictMode>
        <Currency/>
      </React.StrictMode>
  );
};
ReactDOM.render(<App/>, document.getElementById('root'));