import { Provider } from "react-redux";
import GithubExplorer from '../GithubExplorer';
import store from '../../store';

const App = () => {
  return (
    <div className="App">
      <Provider store={store}>
        <GithubExplorer />
      </Provider>
    </div>
  );
}

export default App;
