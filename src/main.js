import './style.css';

import { getProducts } from './store.js';
import { renderCatalog } from './ui.js';

function init() {
  const products = getProducts();
  renderCatalog(products);
}

init();
