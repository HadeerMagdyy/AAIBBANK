import Report from './Frontend/Report';
import { BrowserRouter as Router,Route} from "react-router-dom";
function App() {
  return (
    <div>
    <Router>
     <Route path="/" exact component={Report}></Route>
    </Router>
    </div>
  );
}

export default App;
