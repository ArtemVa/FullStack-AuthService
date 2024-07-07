import React, {createContext} from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import Store from './store/store';


interface State{
  store: Store;
}

const store = new Store();
export const Context = createContext<State>({
  store
})

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Failed to find the root element');
}
const root = createRoot(rootElement);

root.render(
  <Context.Provider value={{ store }}>
    <App />
  </Context.Provider>
);