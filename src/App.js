import { BrowserRouter } from "react-router-dom";
import "./App.css";
import AppRoutes from "./routes";
import { BrandsProvider } from '../src/components/Context/BrandsContext';
import { CategoriesProvider } from '../src/components/Context/CategoriesContext';
import { DataProvider } from '../src/components/Context/SizeContext';
import { ColorProvider } from '../src/components/Context/ColorContext';
import {ProductTypesProvider}from '../src/components/Context/AllProductTypesContext';

function App() {
  return (
    <BrowserRouter>
      <BrandsProvider>
        <CategoriesProvider>
          <DataProvider>
          <ColorProvider>
          <ProductTypesProvider>
              <AppRoutes />
              </ProductTypesProvider>
            </ColorProvider>
          </DataProvider>
        </CategoriesProvider>
      </BrandsProvider>
    </BrowserRouter>
  );
}

export default App;
