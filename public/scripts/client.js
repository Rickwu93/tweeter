/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from initial-tweets.json
$(document).ready(function () {

  //cross-site scripting protection
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };


	const createTweetElement = function (tweetObj) {
		// console.log(tweetObj.user.name)
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

	const renderTweets = function (tweets) {
		// loops through tweets
		// calls createTweetElement for each tweet
		// takes return value and appends it to the tweets container
    const container = $('.tweet-container')
    container.empty();
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

		if ($('#tweet-text').val() === '' || $('#tweet-text').val() === null) {
			alert('Tweet is empty!');
			return;
		} else if ($('#tweet-text').val().length > 140) {
			alert('Tweet length is exceeded!');
			return;
		}

		const data = $(this).serialize();
    $.post('/tweets', data)
        .then(() => {
          loadTweets();
        })
		// $.ajax('/tweets', {
		// 	method: 'POST',
		// 	data: data,
		// });
	});

	loadTweets();
});
