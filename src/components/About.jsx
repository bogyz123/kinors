import { useState } from "react";
import translations from "../components/translations";

export default function About({ language }) {
    const [openedItemId, setOpenedItemId] = useState(null);

    const expandQuestion = (index) => {
        setOpenedItemId(openedItemId === index ? null : index);
    };

    return (
        <div className="h-screen w-full flex relative">
            <div className="bg-[rgb(42,34,90)] text-white font-kanit w-[90%] m-auto rounded-md text-md md:text-xl mt-2 p-4 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <h1 className="text-center">
                    {language === "sr" ? "Grcki Kino" : "Greek Keno"}
                </h1>

                {translations["aboutUs"].questions.map((question, index) => (
                    <div 
                        key={index} 
                        className="cursor-pointer mb-8 md:mb-10 relative" 
                        onClick={() => expandQuestion(index)}
                    >
                 
                        <div className="absolute right-0">
                           
                                <svg 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    fill="none" 
                                    viewBox="0 0 24 24" 
                                    strokeWidth="1.5" 
                                    stroke="currentColor" 
                                    className={`size-6 transform transition-transform duration-200 ${
                                        openedItemId === index ? "rotate-180" : "rotate-0"
                                    }`}
                                >
                                    <path 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round" 
                                        d="M4.5 5.25L12 12.75L19.5 5.25M4.5 11.25L12 18.75L19.5 11.25" 
                                    />
                                </svg>
                            
                        </div>

            
                        <h1 className="my-4 border-b border-purple-700">
                            {question.question[language]}
                        </h1>


                        <div
                            className={`transition-all ml-2 border-l-2 pl-2 p-4 rounded-md bg-[rgb(26,23,68)] duration-150 opacity-0 ${
                                openedItemId === index 
                                    ? "scale-y-100 opacity-100 visible" 
                                    : "scale-y-0 h-0 opacity-0 hidden"
                            }`}
                        >
                            {question.answer[language]}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
