import './App.css';
import SneakerBoard from './SneakerBoard';
import tree from './image/tree.jpg';

function App() {
  return (<>
    <div className='Sneaker-App'>
  <SneakerBoard image = {tree}/>
    </div>
    </>
  );
}

export default App;
