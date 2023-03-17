import Txt from "./components/Txt";
import Picture from "./components/Picture";
import { Provider } from "react-redux";
import store from "./store";
import 'antd/dist/reset.css';
import './App.scss'

function App() {
    return (
        <div className="Box">
            <Provider store={store}>
                <Txt />
                <Picture></Picture>
            </Provider>

        </div>
    );
}

export default App;
