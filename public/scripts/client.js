/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from initial-tweets.json
$(document).ready(function () {
	//cross-site scripting protection
	const escape = function (str) {
		let div = document.createElement('div');
		div.appendChild(document.createTextNode(str));
		return div.innerHTML;
	};
	//body of the tweet object
	const createTweetElement = function (tweetObj) {
		// console.log(tweetObj.user.name)
		console.log(tweetObj.created_at);
		let $tweet = $(`
  <article class="tweet">
				<header class="tweet-header">
					
						<img class="avatar" src=${tweetObj.user.avatars} width="50" height="50" />
						<p>${tweetObj.user.name}</p>
					
					<h3 class="user-handle">${tweetObj.user.handle}</h3>
				</header>
				<section class="tweet-text">${escape(tweetObj.content.text)}</section>
				<hr />
				<footer class="tweet-footer">
					<p>${timeago.format(tweetObj.created_at)} </p>
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
	//renders the tweet data
	const renderTweets = function (tweets) {
		// loops through tweets
		// calls createTweetElement for each tweet
		// takes return value and appends it to the tweets container
		const container = $('.tweet-container');
		container.empty(); //empty jquery string
		for (const tweetData of tweets) {
			const $tweet = createTweetElement(tweetData);
			container.prepend($tweet);
		}
	};

	const loadTweets = () => {
		$.ajax('http://localhost:8080/tweets', { method: 'GET' }).then(function (
			data
		) {
			renderTweets(data);
		});
	};

	$('#tweet-form').submit(function (event) {
		event.preventDefault();

		//returns error message to user if tweeter fields are empty or exceeds 140 characters
		if ($('#tweet-text').val() === '' || $('#tweet-text').val() === null) {
			return $('.error-message')
				.text('Please enter a valid tweet.')
				.slideDown();
		} else if ($('#tweet-text').val().length > 140) {
			return $('.error-message')
				.text('Your tweet exceeds the character limit of 140 characters.')
				.slideDown();
		} else {
			$('.error-message').slideUp();
			const data = $(this).serialize();
			$.post('/tweets', data).then(() => {
				loadTweets();
				$('#tweet-text').val('');
				$('#tweet-text').parent().find('.counter').text(140);
				$('#tweet-text').parent().find('.counter').css({ color: '#545149' }); //resets 0 back to black to 140
			});
		}
	});
	loadTweets();
});
