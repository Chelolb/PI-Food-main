import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/home/Home';
import LandingPage from './components/landingPage/LandingPage';
import AddRecipe from './components/addRecipe/AddRecipe';
import Detail from './components/detail/Detail';


function App() {
  return (
    <BrowserRouter>
    <div className='App'>    
      <Switch>
        <Route exact path ='/' component={LandingPage}/>
        <Route exact path ='/home' component={Home}/>    
        <Route path ='/home/:id' component={Detail}/>
        <Route path ='/recipe' exact component={AddRecipe}/>
      </Switch>    
    </div>
    </BrowserRouter>
  );
}

export default App;
