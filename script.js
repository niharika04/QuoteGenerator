var quoteContainer = document.getElementById('quote-container');
var quoteText = document.getElementById('quote');
var authorText = document.getElementById('author');
var twitterBtn = document.getElementById('twitter');
var newQuoteBtn = document.getElementById('new-quote');

var apiQuotes = [];

// show New Quote

function newQuote() {
    // Pick a random Quote from API Quotes array
    var quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // Check if the author field is blank and replace it with Unknown
    if (!quote.author) {
        authorText.textContent = 'Unknown';
    }else {
        authorText.textContent = quote.author;
    }
    // Check the quote length to determine the styling
    if (quoteText.length > 120) {
        quoteText.classList.add('long-quote');
    }else {
        quoteText.classList.remove('long-quote');
    }
    quoteText.textContent = quote.text;
}

// Get Quotes From API
async function getQuotes() {
    var apiUrl  = 'https://type.fit/api/quotes';
    try {
        var response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        //  Catch Error Here
    }
}


// to tweet a quote

function tweetQuote () {
    var twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);
// On Load
getQuotes();