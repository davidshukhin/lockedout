
"use client";

import { useState } from "react";
import Image from "next/image";

interface WalkthroughStep {
  src: string;
  alt: string;
  description: string;
}

// Update these steps with your image paths and instructions
const walkthroughSteps: WalkthroughStep[] = [
  {
    src: "/images/step1.png", // Place your image in public/images folder
    alt: "Step 1: Navigate to your Canvas settings",
    description:
      "Step 1: Log in to Canvas and navigate to your account settings where the access key is located.",
  },
  {
    src: "/images/step2.png",
    alt: "Step 2: Open API Settings",
    description:
      "Step 2: In the settings menu, click on the API section to view your access keys.",
  },
  {
    src: "/images/step3.png",
    alt: "Step 3: View Your Access Key",
    description:
      "Step 3: Your Canvas Access Key is shown here. Copy the key to use it in the application.",
  },
];

export default function CanvasWalkthrough() {
  const [currentStep, setCurrentStep] = useState(0);

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleNext = () => {
    if (currentStep < walkthroughSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4 bg-white/10 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">
        How to Find Your Canvas Access Key
      </h2>

      <div className="relative w-full h-80 mb-4">
        <Image
          src={walkthroughSteps[currentStep].src}
          alt={walkthroughSteps[currentStep].alt}
          fill
          className="object-contain rounded-md"
        />
      </div>

      <p className="text-center mb-4">{walkthroughSteps[currentStep].description}</p>

      <div className="flex justify-between">
        <button
          onClick={handlePrevious}
          disabled={currentStep === 0}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          disabled={currentStep === walkthroughSteps.length - 1}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
