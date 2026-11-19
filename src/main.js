import './style.css';

import { getProducts } from './store.js';
import { renderCatalog, renderCategoryFilter, initCatalogControls, renderFeatured, initCategoryTiles, initNavigation, initMobileMenu, initDetailRouting } from './ui.js';

function init() {
  renderCategoryFilter();
  renderCatalog(getProducts());
  renderFeatured(getProducts());
  initCatalogControls();
  initCategoryTiles();
  initNavigation();
  initMobileMenu();
  initDetailRouting();
}

init();
