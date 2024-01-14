
import Home from './components/Home';
import Favourites from './components/Favourites';
import {Link, Route,Routes} from 'react-router-dom';
function App() {
  return (
<>
<div className='navbar'>
  <Link to="/">Home</Link>
  <Link to="/Favourites">Favourites</Link>
</div>
<Routes>
<Route path="/" element={<Home/>}/>
  <Route path="/Favourites" element={<Favourites/>}/>
</Routes>

</>
  )
 
      
 
}

export default App;
