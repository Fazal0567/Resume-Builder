import { Check } from "lucide-react";

const ProgressIndicator = ({ currentStep, totalSteps }) => {
    const steps = [
        'Personal Info',
        'Summary',
        'Skills',
        'Education',
         'Projects',
        'Experience',
        'Certificates',
        'Languages',
        'Interests'
    ];

    return (
        <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Resume Builder Progress</h2>
                <span className="text-sm">
                    Step {currentStep} of {totalSteps}
                </span>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                ></div>
            </div>

            {/* Step Indicators */}
            <div className="flex flex-wrap gap-2">
                {steps.map((stepName, index) => {
                    const stepNumber = index + 1;
                    const isCompleted = stepNumber < currentStep;
                    const isCurrent = stepNumber === currentStep;
                    
                    return (
                        <div
                            key={stepNumber}
                            className={`flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                                isCompleted
                                    ? 'bg-green-100 text-green-800'
                                    : isCurrent
                                    ? 'bg-blue-100 text-blue-800'
                                    : 'bg-gray-100 text-gray-600'
                            }`}
                        >
                            {isCompleted && <Check className="w-3 h-3 mr-1" />}
                            <span className="mr-1">{stepNumber}.</span>
                            {stepName}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ProgressIndicator