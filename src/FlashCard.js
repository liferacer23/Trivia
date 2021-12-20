import React, {useState, useEffect, useRef } from 'react'

export default function FlashCard({flashcard}) {
    const [flip,setflip]=useState(false);
    const [height, setHeight]=useState('0');
    const frontElement = useRef();
    const backElement = useRef();

 const setMaxHeight = ()=>
 {
     const frontHeight = frontElement.current.getBoundingClientRect().height;
     const backHeight = backElement.current.getBoundingClientRect().height;
     setHeight(Math.max(frontHeight,backHeight,100));
 }

 useEffect(setMaxHeight, [flashcard.question, flashcard.answer, flashcard.options])
 useEffect(() => {
    window.addEventListener('resize',setMaxHeight)

    return () => {
        window.removeEventListener('resize',setMaxHeight)
    }
}, [])
 const Flipper =()=>
    {
        setflip(!flip);
    }
    return (
        <div onClick={Flipper} className= {`card ${flip ? 'flip':''}`} style={{height:height}}>
        
        <div className="front" ref={frontElement}>
            {flashcard.question}
            <div className="flashcard-options">
            {flashcard.options.map(option=>{
                return <div className="flashcard-option" key={option}>{option}</div>
            })}
            </div>
        </div>
        <div className="back" ref={backElement}>{flashcard.answer}</div>
        

        </div>
    )
}
