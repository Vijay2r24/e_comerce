import React from "react";
import { useRoutes } from "react-router-dom";
import MainLayout from "./main_layout";
import Dashboard from "./pages/admin/dashboard";
import Orders from "./components/Orders/order";
import Customers from "./pages/admin/customers";
import Reports from "./pages/admin/reports";
import Settings from "./not_found";
import NotFound from "./not_found";
import Products from "./components/stepper/Home";
import AllProducts from "./pages/admin/all_products";
import CategoryList from "./components/ProductCategories/CategoriesList";
import Categories from "./components/ProductCategories/Categories"
import Brands from "./components/Brands/createbrand"
import BrandList from "./components/Brands/BrandsList"
import MultieAll from "./components/stepper-multie/Home"
import ProductCreation from "./components/stepper-multie/Step3";
import Step1 from "./components/stepper-multie/Step1";
import Step2 from "./components/stepper-multie/Step2";
import Step3 from "./components/stepper-multie/Step3";
import Step4 from "./components/stepper-multie/Step4";
import Step5 from "./components/stepper-multie/Step5";
import CreateBrand from "./components/stepper-multie/Brandcreation";
import CreateCategory from "./components/stepper-multie/Categorycreation";
import CreateProduct from "./components/stepper-multie/Producttypecreation";
import ProductList from "./components/ProductTypeList/productlist";
import CreateColor from "./components/stepper-multie/Colorcreation";
import ColorList from "./components/Colores/colorList";
import CreateSize from "./components/stepper-multie/Sizecreation";
import SizeList from "./components/Size/SizeList";
import Login from "./components/Login/login";
import SignupPage from "./components/Login/SignupPage";


const AppRoutes = () => {
  return useRoutes([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/SignupPage",
      element: <SignupPage />,
    },
    {
      element: <MainLayout />,
      children: [
        {
          path: "/dashboard",
          element: <Dashboard />,
        },
        {
          path: "/categories/:categoryID",
          element: <Categories />,
        },
        // {
        //   path: "/Browse",
        //   element: <MultieAll/>,
        // },
        {
          path: "/Browse",
          element: <MultieAll />,
          children: [
            {
              path: "step1",
              element: <Step1 />,
              children: [
                {
                  path: "create",
                  element: <CreateBrand />,
                },
                {
                  path: "list",
                  element: <BrandList />,
                },
                {
                  path: "editCreateBrand/:BrandID",
                  element: <CreateBrand />,
                },
              ],
            },
            {
              path: "step2",
              element: <Step2 />,
              children: [
                {
                  path: "create",
                  element: <CreateCategory />,
                },
                {
                  path: "list",
                  element: <CategoryList />,
                },
                {
                  path: "editCategory/:categoryID",
                  element: <CreateCategory />,
                },
              ],
            },
            {
              path: "step3",
              element: <Step3 />,
              children: [
                {
                  path: "create",
                  element: <CreateProduct />,
                },
                {
                  path: "list",
                  element: <ProductList />,
                },
                {
                  path: "editProductType/:ProductTypeID",
                  element: <CreateProduct />,
                },
              ],
            },
            {
              path: "step4",
              element: <Step4 />,
              children: [
                {
                  path: "create",
                  element: <CreateColor />,
                },
                {
                  path: "list",
                  element: <ColorList />,
                },
                {
                  path: "editCreateColor/:ColourID",
                  element: <CreateColor />,
                },
              ],
            },
            {
              path: "step5",
              element: <Step5 />,
              children: [
                {
                  path: "create",
                  element: <CreateSize />,
                },
                {
                  path: "list",
                  element: <SizeList />,
                },
                {
                  path: "editCreateSize/:SizeID",
                  element: <CreateSize />,
                },
              ],
            },
          ],
        },

        {
          path: "/Browse/product",
          element: <ProductCreation />
        },
        {
          path: "/brands/:BrandID",
          element: <Brands />,
        },
        {
          path: "/brands/new",
          element: <Brands />,
        },
        {
          path: "/brandsList",
          element: <BrandList />,
        },

        {
          path: "/categories",
          element: <Categories />,
        },
        {
          path: "/orders",
          element: <Orders />,
        },
        {
          path: "/products/:ProductId",
          element: <Products />,
        },
        {
          path: "/editProductType/:ProductTypeID",
          element: <ProductCreation />,
        },
        {
          path: "/products",
          element: <Products />,
        },
        {
          path: "/categoryList",
          element: <CategoryList />,
        },
        {
          path: "/all-products",
          element: <AllProducts />,
        },
        {
          path: "/customers",
          element: <Customers />,
        },
        {
          path: "/reports",
          element: <Reports />,
        },
        {
          path: "/settings",
          element: <Settings />,
        },
      ],
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);
};

export default AppRoutes;
