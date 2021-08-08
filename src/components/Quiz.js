import { useEffect, useState } from "react";
import useSound from "use-sound";
import play from "../assets/$2,000 Let's Play - Who Wants to Be a Millionaire.m4a";
import correct from "../assets/Correct Answer Sound Effect _ NO COPYRIGHT 🎤🎶.m4a";
import wrong from "../assets/incorrect sound effect.m4a";
function Quiz({data,setStop,questionNumber,setQuestinNumber}) {
    
    const [question,setQuestion] =useState(null);
    const [selectAnswer,setSelectAnswer] =useState(null);
    const [classNameq,setClassName] =useState("answer");
    const [letsPlay] =useSound(play);
    const [correctAnswer] =useSound(correct);
    const [wrongAnswer] =useSound(wrong);

    useEffect(()=>{
        letsPlay();
    },[letsPlay])
    useEffect(()=>{
        setQuestion(data[questionNumber-1])
    },[data,questionNumber]);
    const delay =(duration,callback)=>{
        setTimeout(()=>{
            callback();
        },duration);
    }
    const handleClick= (a)=>{
        setSelectAnswer(a);
        setClassName("answer active");
        delay(3000,()=>{
            setClassName(a.correct ? "answer correct" : "answer wrong");
        });
        delay(5000,()=>{
            if(a.correct){
                correctAnswer();
                delay(1000,()=>{
                    setQuestinNumber((prev)=>prev + 1);
                    setSelectAnswer(null);
                })
            }
            else{
                wrongAnswer();
                delay(1000,()=>{
                    setStop(true);
                })
      
            }
        });
        
    };
    return (
        <div className="quiz">
            <div className="question">
                {question?.question}
            </div>
            <div className="answers">
                {question?.answers.map((a)=>(
                    <div className={selectAnswer === a ? classNameq:"answer"} onClick={()=>handleClick(a)}>{a.text}</div>
                ))}

            </div>
            
        </div>
    )
}

export default Quiz;
