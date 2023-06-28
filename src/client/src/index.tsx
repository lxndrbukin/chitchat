import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { store } from './store';
import { Provider } from 'react-redux';
import { App } from './components/App';

const root = ReactDOM.createRoot(document.querySelector('#root')!);

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
