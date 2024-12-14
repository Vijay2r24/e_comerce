import React, { useState, useEffect, useContext } from 'react';
import { BrandsContext } from '../Context/BrandsContext'
import { ProductTypesContext } from '../Context/AllProductTypesContext'
import { CategoriesContext } from '../Context/CategoriesContext'
import { Combobox } from '@headlessui/react';
import { MdArrowDropDown } from 'react-icons/md';
const Step1 = ({ updateFormData, productData }) => {
  const [stepOneData, setStepOneData] = useState({
    ProductTypeID: '',
    ProductName: '',
    ProductDescription: '',
    ProductDiscount: '',
    Gender: '',
    CategoryID: '',
    categoryName: '',
    BrandID: '',
    BrandName: '',
    MRP: '',
    CreatedBy: "Admin",
    TenantID: 1,
  });
  const inputClassName = "w-full border border-gray-300 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 shadow-sm hover:shadow-md";
  const [errors, setErrors] = useState({});
  const { brands, fetchAndStoreBrands } = useContext(BrandsContext);
  const { categories, fetchAndStoreCategories } = useContext(CategoriesContext)
  const { productTypes, fetchAndStoreProductTypes } = useContext(ProductTypesContext);
  console.log("categories", stepOneData)
  const [editMode, setEditMode] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const handleChange = (e, type, selectedOption) => {
    const handlers = {
      input: () => {
        const { name, value } = e.target;
        return { ...stepOneData, [name]: value };
      },
      combobox: () => ({
        ...stepOneData,
        [e.name]: selectedOption, // Update the field with the selected option
      }),
      brand: () => ({
        ...stepOneData,
        BrandID: selectedOption.BrandID,
        BrandName: selectedOption.BrandName,
      }),
      category: () => ({
        ...stepOneData,
        CategoryID: selectedOption.CategoryID,
        CategoryName: selectedOption.CategoryName,
      }),
    };

    // Execute the appropriate handler or return the unchanged state
    const updatedData = handlers[type] ? handlers[type]() : stepOneData;

    // Update state
    setStepOneData(updatedData);

    // Immediately update the form data
    updateFormData({ stepOneData: updatedData });
  };
  useEffect(() => {
    console.log("stepOneData", stepOneData);
  }, [stepOneData]);
  useEffect(() => {
    if (productData) {
      setEditMode(Boolean(productData?.productId)); // Set editMode based on categoryData
    }
  }, [productData]);
  useEffect(() => {
    if (editMode) {
      setStepOneData({
        ProductTypeID: productData.productType.productTypeId || '',
        ProductName: productData.productName || '',
        ProductDiscount: productData.productDiscount ? productData.productDiscount.replace('%', '') : '',
        ProductDescription: productData.productDescription || '',
        Gender: productData.gender || '',
        CategoryID: productData.category.categoryId || '',
        CategoryName: productData.category.categoryName || '',
        BrandID: productData.brand.brandId || '',
        BrandName: productData.brand.brandName || '',
        MRP: productData.MRP || '',
        CreatedBy: "Admin",  // assuming this remains constant
        UpdatedBy: "admin",
        TenantID: 1,  // assuming this remains constant
      });
      console.log("catagaryname", stepOneData.ProductDiscount)
    }
  }, [editMode, productData]);
  const handleChange2 = (selectedBrand) => {
    setStepOneData((prevData) => ({
      ...prevData,
      BrandID: selectedBrand.BrandID,  // Store the BrandID
      BrandName: selectedBrand.BrandName,
      // Store the BrandName
    }));
  };
  const handleChange1 = (selectedCategory) => {
    setStepOneData((prevData) => ({
      ...prevData,
      categoryID: selectedCategory.categoryID,  // Store the CategoryID
      categoryName: selectedCategory.categoryName, // Store the CategoryName
    }));
  };
  const genders = ['Male', 'Female', 'Unisex']; // Options for the combobox
  return (

    <div className="flex flex-col space-y-6 p-6 max-w-6xl mx-auto bg-white rounded-lg border border-gray-300">
      {/* Header */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">

        {/* Product Type */}
        <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        Product Type
      </label>
      <Combobox
        value={stepOneData.ProductTypeID || ""}
        onChange={(selectedOption) => handleChange({ name: 'ProductTypeID' }, 'combobox', selectedOption)}
      >
        <div className="relative">
          {/* Input Field */}
          <div className="relative w-full">
            <Combobox.Input
            className= {`${inputClassName} pr-10`}
              placeholder="Select a Product Type"
              displayValue={(productTypeID) => {
                const selectedType = productTypes.find(
                  (type) => type.ProductTypeID === productTypeID
                );
                return selectedType ? selectedType.ProductTypeName : '';
              }}
            />
            {/* Dropdown Icon */}
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-3">
              <MdArrowDropDown className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </Combobox.Button>
          </div>
          {/* Options List */}
          <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white border border-gray-300 py-1 shadow-lg focus:outline-none">
            {productTypes.map((type) => (
              <Combobox.Option
                key={type.ProductTypeID}
                value={type.ProductTypeID}
                className={({ active }) =>
                  `cursor-pointer select-none px-4 py-2 ${
                    active ? 'bg-indigo-500 text-white' : 'text-gray-700'
                  }`
                }
              >
                {type.ProductTypeName}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        </div>
      </Combobox>
      {errors.ProductTypeID && (
        <p className="text-red-500 text-sm mt-1">{errors.ProductTypeID}</p>
      )}
    </div>
        {/* Product Name */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Product Name</label>
          <input
            type="text"
            name="ProductName"
            value={stepOneData.ProductName}
            onChange={(e) => handleChange(e, 'input')}
            placeholder="Ex: Smartphone"
            className={inputClassName}
          />
          {errors.productName && <p className="text-red-500 text-sm mt-1">{errors.productName}</p>}
        </div>
        {/* MRP */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">MRP</label>
          <input
            type="number"
            name="MRP"
            value={stepOneData.MRP}
            onChange={(e) => handleChange(e, 'input')}
            placeholder="Ex: 100"
            className={inputClassName}
          />
          {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Discount %</label>
          <input
            name="ProductDiscount"
            value={stepOneData.ProductDiscount}
            onChange={(e) => handleChange(e, 'input')}
            placeholder="Ex: 100"
            className={inputClassName}
          />
          {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
        </div>
        {/* Gender */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Gender</label>
          <Combobox
            value={stepOneData.Gender}
            onChange={(value) =>
              handleChange({ name: 'Gender' }, 'combobox', value) // Pass the selected value
            }
          >
            <div className="relative">
              {/* Input Field */}
              <div className="relative w-full">
                <Combobox.Input
                  className={`${inputClassName} pr-10`}
                  placeholder="Ex: Unisex"
                  displayValue={(gender) => gender || ''}
                />
                {/* Dropdown Icon */}
                <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <MdArrowDropDown className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </Combobox.Button>
              </div>
              {/* Options List */}
              <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white border border-gray-300 py-1 shadow-lg focus:outline-none">
                {['Male', 'Female', 'Unisex'].map((gender) => (
                  <Combobox.Option
                    key={gender}
                    value={gender}
                    className={({ active }) =>
                      `cursor-pointer select-none px-4 py-2 ${active ? 'bg-blue-500 text-white' : 'text-gray-700'
                      }`
                    }
                  >
                    {gender}
                  </Combobox.Option>
                ))}
              </Combobox.Options>
            </div>
          </Combobox>
          {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
        </div>
        {/* Category ID */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
          <div className="relative">
            <Combobox
              value={stepOneData.CategoryName} // Use categoryName to display in the input
              onChange={(selectedCategoryID) => {
                const selectedCategory = categories.find(
                  (category) => category.CategoryID === selectedCategoryID
                );

                if (selectedCategory) {
                  handleChange(null, 'category', {
                    CategoryID: selectedCategory.CategoryID,
                    CategoryName: selectedCategory.CategoryName,
                  });
                }
              }}
            >
              <div>
                {/* Input Field */}
                <Combobox.Input
                  name="CategoryName"
                  placeholder="Select Category"
                  className={`${inputClassName} pr-10`} // Add padding for dropdown icon
                  onChange={(e) => {
                    handleChange(e, 'input'); // Handle manual input typing
                  }}
                  displayValue={(selectedCategory) => selectedCategory || ''} // Display selected Category Name
                />
                {/* Dropdown Icon */}
                <Combobox.Button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600">
                  <MdArrowDropDown />
                </Combobox.Button>
              </div>

              {/* Dropdown Options */}
              <Combobox.Options className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-48 overflow-y-auto">
                {categories.map((category) => (
                  <Combobox.Option key={category.CategoryID} value={category.CategoryID}>
                    {({ active }) => (
                      <div
                        className={`p-2 cursor-pointer ${active ? 'bg-blue-500 text-white' : 'text-gray-700'
                          }`}
                      >
                        {category.CategoryName} {/* Show only Category Name */}
                      </div>
                    )}
                  </Combobox.Option>
                ))}
              </Combobox.Options>
            </Combobox>
          </div>


          {/* Error Message */}
          {errors.categoryID && <p className="text-red-500 text-sm mt-1">{errors.categoryID}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Brand</label>
          <Combobox
            value={stepOneData.BrandName} // Use BrandName for displaying in the input
            onChange={(selectedBrandID) => {
              const selectedBrand = brands.find((brand) => brand.BrandID === selectedBrandID);
              if (selectedBrand) {
                handleChange(null, 'brand', selectedBrand); // Use combined handleChange function
              }
            }}
          >
            <div className="relative">
              <div className="flex justify-between items-center">
                <Combobox.Input
                  className={`${inputClassName} pr-10`} // Add padding-right to make space for the icon
                  placeholder="Select Brand"
                  onChange={(e) => handleChange(e, 'input')} // Handle user typing
                  displayValue={(brandName) => brandName || ''} // Display only the brand name
                />
                {/* Dropdown icon */}
                <Combobox.Button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 cursor-pointer">
                  <MdArrowDropDown />
                </Combobox.Button>
              </div>
              <Combobox.Options className="absolute mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-20 max-h-48 overflow-y-auto">
                {brands.map((brand) => (
                  <Combobox.Option key={brand.BrandID} value={brand.BrandID}>
                    {({ active }) => (
                      <div className={`p-2 ${active ? 'bg-blue-500 text-white' : ''}`}>
                        {brand.BrandName}
                      </div>
                    )}
                  </Combobox.Option>
                ))}
              </Combobox.Options>
            </div>
          </Combobox>
          {errors.brandID && (
            <p className="text-red-500 text-sm mt-1">{errors.brandID}</p>
          )}
        </div>
      </div>
    </div>



  );
};

export default Step1;
