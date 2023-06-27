import ReactDOM from 'react-dom/client';
import { store } from './store';
import { Provider } from 'react-redux';
import { App } from './components/App';

const root = ReactDOM.createRoot(document.querySelector('#root')!);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
