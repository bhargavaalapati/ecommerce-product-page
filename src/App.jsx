import { MdShoppingBag } from 'react-icons/md';
import ProductList from './components/ProductList';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>E-commerce Store <MdShoppingBag /></h1>
      </header>
      <main>
        <ProductList />
      </main>
    </div>
  );
}

export default App;