import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Start from './Start';
import Box from './Box';
function App() {
    return <Router>
        <Routes>
         <Route path='/' Component={Start}/>   
         <Route path='/start' Component={Box}/>   
        </Routes>
    </Router>
}

export default App
