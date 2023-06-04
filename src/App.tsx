// Import the necessary modules from 'react-router-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Import your components
import SignUp from './components/SignUp';
import Login from './components/Login';
import NotFound from './components/NotFound';
import Pricing from './components/Pricing';
import API from './components/API';
import KingsleyChat from './components/KingsleyChat';
import TenancyPage from './components/TenancyPage';
import HomePage from './components/HomePage';
import Payment from './components/Payment';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={KingsleyChat} />
        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={Login} />
        <Route path="/pricing" component={Pricing} />
        <Route path="/api" component={API} />
        <Route path="/chat" component={KingsleyChat} />
        <Route path="/tenancy" component={TenancyPage} />
        <Route path="/payment" component={Payment} />
        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;