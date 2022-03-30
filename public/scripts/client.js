/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from initial-tweets.json
$(document).ready(function() {
  

const data = [
	{
		user: {
			name: 'Newton',
			avatars: 'https://i.imgur.com/73hZDYK.png',
			handle: '@SirIsaac',
		},
		content: {
			text: 'If I have seen further it is by standing on the shoulders of giants',
		},
		created_at: 1461116232227,
	},
	{
		user: {
			name: 'Descartes',
			avatars: 'https://i.imgur.com/nlhLi3I.png',
			handle: '@rd',
		},
		content: {
			text: 'Je pense , donc je suis',
		},
		created_at: 1461113959088,
	},
];

const createTweetElement = function (tweetObj) {
  // console.log(tweetObj.user.name)
	let $tweet = $(`
  <article class="tweet">
				<header class="tweet-header">
					
						<img class="avatar" src=${tweetObj.user.avatars} width="50" height="50" />
						<p>${tweetObj.user.name}</p>
					
					<h3 class="user-handle">${tweetObj.user.handle}</h3>
				</header>
				<section class="tweet-text">${tweetObj.content.text}</section>
				<hr />
				<footer class="tweet-footer">
					<p>10 days ago</p>
					<span class="icons">
						<i class="fa-solid fa-flag"></i>
						<i class="fa-solid fa-retweet"></i>
						<i class="fa-solid fa-heart"></i>
					</span>
				</footer>
      <article>
      `);
	return $tweet;
};

const renderTweets = function (tweets) {
	// loops through tweets
	// calls createTweetElement for each tweet
	// takes return value and appends it to the tweets container
	for (let tweetData of tweets) {
		const $tweet = createTweetElement(tweetData);
		$('.tweet-container').append($tweet);
	}
};

$("#tweet-form").submit(function(event) {  
  event.preventDefault(); 
const data = $(this).serialize()
   $.ajax('/tweets', {
     method: 'POST',
    data: data
  })
})



renderTweets(data);
})

