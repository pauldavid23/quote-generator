const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterButton = document.getElementById('twitter');
const newQuoteButton = document.getElementById('new-quote');
const loader = document.getElementById('loader');

//Show loading 

function loading () {
	loader.hidden = false; 
	quoteContainer.hidden = true;
}

//Hide loading 
function hideloding () {
	if (!loader.hidden) {
		quoteContainer.hidden = false;
		loader.hidden = true;
	} else {

	}
}


//Get quote from API 

async function getQuote () {
	loading();
	const proxyAPI = 'https://cors-anywhere.herokuapp.com/';
	const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
	try {
		const response = await fetch(proxyAPI + apiUrl);
		const data = await response.json();
		//If author is blank, add unknown 
		if (data.quoteAuthor === '') {
			authorText.innerText = 'Unknown'; 

		} else {
			authorText.innerText = data.quoteAuthor;
		}
		quoteText.innerText = data.quoteText;

		//Reduce font-size for long quotes 

		if(data.quoteText.length >= 120) {
			quoteText.classList.add('long-quote');
		} else {
			quoteText.classList.remove('long-quote');
		}
		//Stop laoder show quote 
		hideloding(); 


	} catch (error) {
		getQuote();
	}
}
//Tweet quote
function tweetQuote () {
	const quote = quoteText.innerText; 
	const author = authorText.innerText; 
	const twitterUrl = `https://twitter.com/intent/tweet/?text=${quote} - ${author}`;
	window.open(twitterUrl, '_blank');
	console.log('clicked!');
}

//Event listener 
newQuoteButton.addEventListener('click', getQuote);
twitterButton.addEventListener('click', tweetQuote);


//Get the quote 
	getQuote();
	loading();  
