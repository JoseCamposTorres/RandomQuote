import logo from './logo.svg';
import { useState, useEffect } from 'react';
// import './App.css';
import './App.scss';

import COLORS_ARRAY from './colorsArray';

let quoteDBURL = "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"



function App() {
  const [quote, setQuote] = useState("The two most important days in your life are the day you are born and the day you find out why");

  const [author, setAuthor] = useState("Mark Twain");


  const [randomNumber, setRandomNumber] = useState(0);

  const [quotesArray, setQuotesArray] = useState(null);

  const [accentColor, setAccentColor] = useState('#282c34');

  const fetchQuotes = async (url) => {
    const response = await fetch(url);
    const parsedJSON = await response.json()
    setQuotesArray(parsedJSON.quotes);
  }

  useEffect(() => {
    fetchQuotes(quoteDBURL)
  }, [quoteDBURL])

  const getRandomQuote = () => {
    let randomInteger = Math.floor(quotesArray.length * Math.random())
    setRandomNumber(randomInteger);
    setAccentColor(COLORS_ARRAY[randomInteger]);
    setQuote(quotesArray[randomInteger].quote);
    setAuthor(quotesArray[randomInteger].author);
  }

  return (
    <div className="App">
      <div className="App-header" style={{ backgroundColor: accentColor }}>
        <div id='quote-box' style={{ color: accentColor }}>

          <p id='text'>
            <i class="fa fa-quote-left"> </i> {quote}"
          </p>
          <p id='author'>
            - {author}
          </p>
          
          <div className='buttons'>
            <a target='_blank' id='tweet-quote' style={{ backgroundColor: accentColor }} href={encodeURI(`https://twitter.com/intent/tweet?text=${quote} - ${author}`)} > <i class="fab fa-twitter"></i></a>
            <button id='new-quote' style={{ backgroundColor: accentColor }} onClick={() => getRandomQuote()}>New Quote</button>
          </div>
        
       

        </div>
      </div>
    </div>
  );
}

export default App;
