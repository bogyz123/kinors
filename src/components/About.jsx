import { useState } from "react"
import translations from "../components/translations";

export default function About({language})
{
    const [openedItemId, setOpenedItemId] = useState(null);
    const expandQuestion = (index) => {
        if (openedItemId === index) {
            setOpenedItemId(null);
        }
        else {
            setOpenedItemId(index);
        }
    }
   
    return (
        <div className="bg-[rgb(42,34,90)] text-white font-kanit w-[90%] m-auto rounded-md text-md md:text-xl mt-2 p-4 ">
            <h1 className="text-center">{language === "sr" ? "Grcki Kino" : "Greek Keno"}</h1>
            {translations["aboutUs"].questions.map((question, index) => 
                <div key={index} className="cursor-pointer " onClick={() => expandQuestion(index)}>
                    <h1 className="my-4">{question.question[language]}</h1>
                    <div className={`transition-all ml-2 border-l-2 pl-2 p-4 rounded-md bg-[rgb(26,23,68)] duration-150  opacity-0 ${openedItemId === index ? "scale-y-100 opacity-100 visible" : "scale-y-0 h-0 opacity-0 hidden"}`}>
                        {question.answer[language]}
                    </div>
                </div>
            )}
        </div>
    )
}