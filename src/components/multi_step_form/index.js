import React, { useState } from "react";

const steps = [
  { id: 1, label: "YOUR INFO" },
  { id: 2, label: "SELECT PLAN" },
  { id: 3, label: "ADD-ONS" },
  { id: 4, label: "PAYMENT DETAILS" },
  { id: 5, label: "SUMMARY" },
];

const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    plan: "",
    addons: [],
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length));
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Render method for Step 1: Personal Info
  const renderStep1 = () => (
    <div>
      <h2 className="text-2xl font-bold mb-4">Personal Info</h2>
      <p className="text-gray-600 mb-6">
        Please provide your name, email address, and phone number.
      </p>
      <form>
        <label className="block mb-4">
          <span className="block text-sm font-medium text-gray-700">Name</span>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. Stephen King"
            className="mt-1 block w-full p-2 border rounded"
          />
        </label>
        <label className="block mb-4">
          <span className="block text-sm font-medium text-gray-700">
            Email Address
          </span>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="e.g. stephenking@lorem.com"
            className="mt-1 block w-full p-2 border rounded"
          />
        </label>
        <label className="block mb-4">
          <span className="block text-sm font-medium text-gray-700">
            Phone Number
          </span>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="e.g. +57 313 111 1111"
            className="mt-1 block w-full p-2 border rounded"
          />
        </label>
      </form>
    </div>
  );

  // Render method for Step 2: Select Plan
  const renderStep2 = () => (
    <div>
      <h2 className="text-2xl font-bold mb-4">Select Plan</h2>
      <p className="text-gray-600 mb-6">Choose your preferred plan.</p>
      <label className="block mb-4">
        <span className="block text-sm font-medium text-gray-700">Plan</span>
        <select
          name="plan"
          value={formData.plan}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border rounded"
        >
          <option value="">Select a plan</option>
          <option value="basic">Basic</option>
          <option value="premium">Premium</option>
          <option value="pro">Pro</option>
        </select>
      </label>
    </div>
  );

  // Render method for Step 3: Add-Ons
  const renderStep3 = () => (
    <div>
      <h2 className="text-2xl font-bold mb-4">Add-Ons</h2>
      <p className="text-gray-600 mb-6">
        Select any additional features you’d like.
      </p>
      <label className="block mb-4">
        <input
          type="checkbox"
          name="addons"
          value="support"
          checked={formData.addons.includes("support")}
          onChange={(e) => {
            const { checked, value } = e.target;
            setFormData((prevData) => ({
              ...prevData,
              addons: checked
                ? [...prevData.addons, value]
                : prevData.addons.filter((addon) => addon !== value),
            }));
          }}
          className="mr-2"
        />
        <span className="text-gray-700">24/7 Support</span>
      </label>
      <label className="block mb-4">
        <input
          type="checkbox"
          name="addons"
          value="backup"
          checked={formData.addons.includes("backup")}
          onChange={(e) => {
            const { checked, value } = e.target;
            setFormData((prevData) => ({
              ...prevData,
              addons: checked
                ? [...prevData.addons, value]
                : prevData.addons.filter((addon) => addon !== value),
            }));
          }}
          className="mr-2"
        />
        <span className="text-gray-700">Daily Backup</span>
      </label>
    </div>
  );

  // Render method for Step 4: Payment Details
  const renderStep4 = () => (
    <div>
      <h2 className="text-2xl font-bold mb-4">Payment Details</h2>
      <p className="text-gray-600 mb-6">Provide your payment information.</p>
      <form>
        <label className="block mb-4">
          <span className="block text-sm font-medium text-gray-700">
            Card Number
          </span>
          <input
            type="text"
            name="cardNumber"
            value={formData.cardNumber}
            onChange={handleChange}
            placeholder="1234 5678 9012 3456"
            className="mt-1 block w-full p-2 border rounded"
          />
        </label>
        <label className="block mb-4">
          <span className="block text-sm font-medium text-gray-700">
            Expiry Date
          </span>
          <input
            type="text"
            name="expiry"
            value={formData.expiry}
            onChange={handleChange}
            placeholder="MM/YY"
            className="mt-1 block w-full p-2 border rounded"
          />
        </label>
        <label className="block mb-4">
          <span className="block text-sm font-medium text-gray-700">CVV</span>
          <input
            type="text"
            name="cvv"
            value={formData.cvv}
            onChange={handleChange}
            placeholder="123"
            className="mt-1 block w-full p-2 border rounded"
          />
        </label>
      </form>
    </div>
  );

  // Render method for Step 5: Summary
  const renderStep5 = () => (
    <div>
      <h2 className="text-2xl font-bold mb-4">Summary</h2>
      <p className="text-gray-600 mb-6">Review your details and submit.</p>
      <div className="text-gray-700">
        <p>
          <strong>Name:</strong> {formData.name}
        </p>
        <p>
          <strong>Email:</strong> {formData.email}
        </p>
        <p>
          <strong>Phone:</strong> {formData.phone}
        </p>
        <p>
          <strong>Plan:</strong> {formData.plan}
        </p>
        <p>
          <strong>Add-Ons:</strong> {formData.addons.join(", ")}
        </p>
      </div>
    </div>
  );

  return (
    <div className="flex bg-blue-50 min-h-screen items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl flex h-[500px]">
        {/* Sidebar */}
        <div className="flex w-1/3 bg-gray-100 text-black p-8 rounded-l-lg h-full">
      <ul className="space-y-4 w-full">
        {steps.map((step) => (
          <li
            key={step.id}
            className={`flex items-center space-x-3 ${
              currentStep === step.id ? "font-semibold" : "opacity-50"
            }`}
          >
            <div
              className={`w-8 h-8 flex items-center justify-center rounded-full ${
                currentStep === step.id
                  ? "bg-blue-700 text-white"
                  : "bg-blue-500"
              }`}
            >
              {step.id}
            </div>
            <span>{step.label}</span>
          </li>
        ))}
      </ul>
      {/* Vertical Line */}
    </div>

        {/* Form Section */}
        <div className="w-2/3 p-8">
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
          {currentStep === 4 && renderStep4()}
          {currentStep === 5 && renderStep5()}

          {/* Navigation Buttons */}
          <div className="mt-6 flex justify-between">
            {currentStep > 1 && (
              <button
                onClick={handleBack}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Back
              </button>
            )}
            {currentStep < steps.length ? (
              <button
                onClick={handleNext}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Next
              </button>
            ) : (
              <button className="px-4 py-2 bg-green-600 text-white rounded">
                Submit
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiStepForm;
