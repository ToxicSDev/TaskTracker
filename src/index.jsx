import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import localforage from "localforage";
import configStore from "./redux";
import App from './App.jsx';
import './index.css';

const localStore = localforage.createInstance({
  name: "tasktracker",
});

function onReset() {
  localStore.clear();
  window.location.reload();
}

const storePromise = localStore
  .getItem("appState")
  .then(
    (value) => value || undefined,
    (err) => {
      console.error(err);
      return undefined;
    }
  )
  .then(
    (value) => configStore(value),
    (err) => {
      console.error(err);
      return configStore();
    }
  )
  .then((store) => {
    store.subscribe(() => localStore.setItem("appState", store.getState()));
    return store;
  })
  .catch((err) => {
    console.log(err);
  });

storePromise.then((store) => {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
      <App onReset={onReset} />
    </Provider>,
  );
});
