import React,{useState,useEffect, useRef} from "react";
import FlashCardList from "./FlashCardList";
import axios from "axios";
import './App.css';

function App() {

  const categoryElement = useRef();
  const amountRef = useRef();
  const [flashcards,setflashcards] = useState([]);
  const [categories,setCategories] = useState([]);
  
  useEffect(()=>
  {
    getdata();
  },[])

  const getdata = ()=>
  {
   
    axios
    .get('https://opentdb.com/api_category.php')
    .then(res=>{
      setCategories(res.data.trivia_categories);
      console.log(res.data);
    })
  }
  
  const decoder = (str)=>
  {
    const text = document.createElement('textarea');
    text.innerHTML=str;
    return text.value;
  }
const submitHandler = e =>
{
  e.preventDefault();
  axios
  .get('https://opentdb.com/api.php',
  {
    params:
    {
      amount:amountRef.current.value,
      category:categoryElement.current.value

    }
  }
   )
  .then(res=>{
   setflashcards( res.data.results.map((questionItem, index)=>{
      const answer = decoder(questionItem.correct_answer);
      const options = [...questionItem.incorrect_answers.map(ans=>decoder(ans)), questionItem.correct_answer];
      return{
        id:`${index}-${Date.now()}`,
        question: decoder(questionItem.question),
        answer: answer, 
        options: options.sort(()=>Math.random-0.5)
        
      }
    }))
    
  })

}
  return (<div className="App"> 
  
  <form className='header' onSubmit={submitHandler}>
    <div className='form-group'>
      <label htmlFor="category">Category</label>
      <select id="category" ref={categoryElement}>
      {categories.map(category =>{
          return <option value={category.id} key={category.id}>{category.name}</option>
        })}
      </select>
    </div>
    <div className='form-group'>
    <label htmlFor="amount">Number Of Questions</label>
    <input type="number" step="1" id="amount" min="1" defaultValue={10} ref={amountRef} />
    </div>
    <div className="form-group">
        <button className="btn">Generate</button>
    </div>
  </form>
   <FlashCardList flashcards={flashcards}/>
   </div>
  
  );
}



export default App;
