import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { SelectVoteBoardDateProvider } from './components/providers/SelectVoteBoardDateProvider';
import { SelectPlayerBoardDateProvider } from './components/providers/SelectPlayerBoardDateProvider';
import { VotesProvider } from './components/providers/VotesProvider';
import { VoteFormProvider } from './components/providers/VoteFormProvider';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <VotesProvider>
    <VoteFormProvider>
    <SelectPlayerBoardDateProvider>
    <SelectVoteBoardDateProvider>
      <App />
    </SelectVoteBoardDateProvider>
    </SelectPlayerBoardDateProvider>
    </VoteFormProvider>
    </VotesProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
