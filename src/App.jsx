import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [generatingAnswer, setGeneratingAnswer] = useState(false);


  async function generateAnswer() {
    setAnswer("Loading your answer... \n It might take upto 10 seconds");
    const response = await axios({
      url : "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyAtPwAMOcEBE4SD2cZwfWmYOBTh2WcZPq8",
      method : "post",
      data : {contents:[{parts:[{text:question}]},],},
    });

    setAnswer(
      response["data"]["candidates"][0]["content"]["parts"][0]["text"]
    );
  }

  return (
    <>
      <h1>Ai-India</h1>
      <textarea
            required
            className="border rounded w-11/12 my-2 min-h-fit p-3"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask anything"
          ></textarea>
      <button onClick= {generateAnswer}>Generate Answer</button>

      <pre>{answer}</pre>
    </>
  )
}

export default App
