import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import store from './store';
import './styles/index.scss';
import { register } from './swReg';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(

    <App />

);

register();