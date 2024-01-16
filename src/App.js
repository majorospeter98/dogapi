
import Home from './components/Home';
import Favourites from './components/Favourites';
import {Link, Route,Routes} from 'react-router-dom';
function App() {
  return (
<>
<nav>
<div className='navbar'>
  
  <Link to="/dogapi">Home</Link>
  <Link to="/Favourites">Favourites</Link>
  </div>
  </nav>

<main>
<Routes>
<Route path="/dogapi" element={<Home/>}/>
  <Route path="/Favourites" element={<Favourites/>}/>
</Routes>
</main>

</>
  )
 
      
 
}

export default App;
