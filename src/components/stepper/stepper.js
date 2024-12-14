import React, { useState } from 'react';

function Home() {
    const [step, setStep] = useState(1); // Step state to track the current step

    const handleNext = () => {
        setStep((prevStep) => Math.min(prevStep + 1, 4)); // Increase step but max to 4
    };

    const handlePrevious = () => {
        setStep((prevStep) => Math.max(prevStep - 1, 1)); // Decrease step but min to 1
    };

    return (
        <div className="p-5">
            <div className="mx-4 p-4">
                <div className="flex items-center">
                    {/* Steps indicator */}
                    <StepIndicator step={1} label="Personal" activeStep={step} />
                    <div className="flex-auto border-t-2 transition duration-500 ease-in-out border-teal-600"></div>
                    <StepIndicator step={2} label="Account" activeStep={step} />
                    <div className="flex-auto border-t-2 transition duration-500 ease-in-out border-gray-300"></div>
                    <StepIndicator step={3} label="Message" activeStep={step} />
                    <div className="flex-auto border-t-2 transition duration-500 ease-in-out border-gray-300"></div>
                    <StepIndicator step={4} label="Confirm" activeStep={step} />
                </div>
            </div>
            
            {/* Form Content */}
            <div className="mt-8 p-4">
                {step === 1 && (
                    <StepContent>
                        <InputField label="Full Name" placeholder="First Name" />
                        <InputField label="" placeholder="Last Name" />
                    </StepContent>
                )}
                {step === 2 && (
                    <StepContent>
                        <InputField label="Username" placeholder="Just a hint.." />
                        <InputField label="Your Email" placeholder="john@doe.com" />
                    </StepContent>
                )}
                {step === 3 && (
                    <StepContent>
                        <InputField label="Message" placeholder="Enter your message" />
                    </StepContent>
                )}
                {step === 4 && (
                    <StepContent>
                        <p className="text-gray-600">Confirm your details and submit.</p>
                    </StepContent>
                )}
                
                {/* Navigation Buttons */}
                <div className="flex p-2 mt-4">
                    <button 
                        onClick={handlePrevious} 
                        disabled={step === 1}
                        className="text-base hover:scale-110 focus:outline-none flex justify-center px-4 py-2 rounded font-bold cursor-pointer bg-gray-100 text-gray-700 border border-gray-600 transition duration-200 ease-in-out"
                    >
                        Previous
                    </button>
                    <div className="flex-auto flex flex-row-reverse">
                        {step < 4 ? (
                            <button 
                                onClick={handleNext} 
                                className="text-base ml-2 hover:scale-110 focus:outline-none flex justify-center px-4 py-2 rounded font-bold cursor-pointer bg-teal-600 text-teal-100 border border-teal-600 transition duration-200 ease-in-out"
                            >
                                Next
                            </button>
                        ) : (
                            <button 
                                className="text-base ml-2 hover:scale-110 focus:outline-none flex justify-center px-4 py-2 rounded font-bold cursor-pointer bg-green-600 text-white border border-green-600 transition duration-200 ease-in-out"
                            >
                                vijj
                            </button>
                        )}
                        <button 
                            className="text-base hover:scale-110 focus:outline-none flex justify-center px-4 py-2 rounded font-bold cursor-pointer bg-teal-100 text-teal-700 border border-teal-600 transition duration-200 ease-in-out"
                        >
                            Skip
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Step indicator component for each step
function StepIndicator({ step, label, activeStep }) {
    return (
        <div className={`flex items-center ${activeStep === step ? 'text-teal-600' : 'text-gray-500'} relative`}>
            <div className={`rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 ${activeStep >= step ? 'border-teal-600' : 'border-gray-300'} ${activeStep === step ? 'bg-teal-600 text-white' : ''}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-bookmark">
                    {/* Your icon path here */}
                </svg>
            </div>
            <div className={`absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase ${activeStep === step ? 'text-teal-600' : 'text-gray-500'}`}>{label}</div>
        </div>
    );
}

// Input field component
function InputField({ label, placeholder }) {
    return (
        <div className="w-full flex-1 mx-2">
            {label && <div className="font-bold text-gray-600 text-xs leading-8 uppercase h-6 mx-2 mt-3">{label}</div>}
            <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
                <input placeholder={placeholder} className="p-1 px-2 appearance-none outline-none w-full text-gray-800" />
            </div>
        </div>
    );
}

// Wrapper for step content
function StepContent({ children }) {
    return <div className="flex flex-col md:flex-row">{children}</div>;
}

export default Home;
