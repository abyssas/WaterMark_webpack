import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import store from './store';
// import { register } from './swReg';


const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(

    <App />
    // <div className="text-blue-500">TailwindCSS setup</div>

);

// register();