// src/steps/StepIndicator.js
import React from 'react';

function StepIndicator({ step, label, activeStep, icon }) {
    const isActive = activeStep === step;
    const isCompleted = activeStep > step;

    return (
        <div className={`flex items-center ${activeStep === step ? 'text-teal-600' : 'text-gray-500'} relative`}>
            <div className={`rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 ${activeStep >= step ? 'border-teal-600' : 'border-gray-300'} ${activeStep === step ? 'bg-teal-600 text-white' : ''}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-bookmark" style={{ marginLeft: '13px' }}>
                    {icon}
                </svg>
            </div>
            <div className={`absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase ${activeStep === step ? 'text-teal-600' : 'text-gray-500'}`}>{label}</div>
        </div>
    );
}

export default StepIndicator;
