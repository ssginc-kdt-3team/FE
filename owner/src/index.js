import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

// scroll bar
import 'simplebar/src/simplebar.css';

// third-party
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

// project import
import App from './App';
import { store, persistor } from 'store';
import reportWebVitals from './reportWebVitals';

// ==============================|| MAIN - REACT DOM RENDER  ||============================== //

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <StrictMode>
    <ReduxProvider store={store}>
     <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter basename="/">
          <App />
        </BrowserRouter>
      </PersistGate>
    </ReduxProvider>
  </StrictMode>
);

reportWebVitals();

// import { StrictMode } from 'react';
// import { createRoot } from 'react-dom/client';
// import { BrowserRouter } from 'react-router-dom';

// // scroll bar
// import 'simplebar/src/simplebar.css';

// // third-party
// import { Provider as ReduxProvider } from 'react-redux';
// import { PersistGate } from 'redux-persist/integration/react';
// import { persistStore } from 'redux-persist'


// // apex-chart
// import 'assets/third-party/apex-chart.css';

// // project import
// import App from './App';
// import { store }  from 'store';
// import reportWebVitals from './reportWebVitals';


// // ==============================|| MAIN - REACT DOM RENDER  ||============================== //


// const container = document.getElementById('root');
// const root = createRoot(container);                   // createRoot(container!) if you use TypeScript
// // const persistor = persistStore(store);

// root.render(
//     <StrictMode>
//         <ReduxProvider store={store}>
//             {/* <PersistGate loading={null} persistor={persistor}> */}
//             <BrowserRouter basename="/">
//                 <App />
//             </BrowserRouter>
//             {/* </PersistGate> */}
//         </ReduxProvider>
//     </StrictMode>
// );

// reportWebVitals();
