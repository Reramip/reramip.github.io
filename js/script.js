const colors=['#16a085', '#27ae60', '#2c3e50', '#f39c12', '#e74c3c', '#9b59b6', '#FB6964', '#342224', "#472E32", "#BDBB99", "#77B1A9", "#73A857"];
let quotes;

function getQuotes(){
  return $.ajax({
    headers: {Accept: "application/json"},
    url: "https://gist.githubusercontent.com/Reramip/4fea0b0d84c7535d47993d3272510b19/raw/12be371b628d8831379ab8e2e08c77f5d9bdecb9/quotes.json",
    success: function(quotesJSON){
      let quotesObj=JSON.parse(quotesJSON);
      quotes=quotesObj.quotes;
    }
  })
};

const getRandomIndexOfArray = (array) => Math.floor(Math.random()*array.length);

function changeQuote(){
  let newQuote=quotes[getRandomIndexOfArray(quotes)];
  let newColor=colors[getRandomIndexOfArray(colors)];

  // (selector).animate({styles},speed(optional),easing(optional),callback(optional))
  $("#text").animate({opacity: 0, color: newColor}, 500, function(){
    $(this).animate({opacity: 1}, 500);
    $(this).text(newQuote.quote);
  });
  $("#author").animate({opacity: 0}, 500, function(){
    $(this).animate({opacity: 1}, 500);
    $(this).text(`--${newQuote.author}`);
  });
  // jquery.color.js
  $("body").animate({backgroundColor: newColor, color: newColor}, 1000);
  $(".clickable").animate({backgroundColor: newColor}, 1000);
}

$(document).ready(function(){
  getQuotes().then(changeQuote);
  $("body").on("click", "#new-quote", changeQuote);
});
