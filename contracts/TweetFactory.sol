//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract TweetFactory {
    struct Tweet {
        address author;
        string content;
        uint256 timestamp;
    }

    event TweetCreated(address indexed author, string content);

    Tweet[] private tweets;

    function createTweet(string memory content) public {
        Tweet memory tweet = Tweet(msg.sender, content, block.timestamp);
        tweets.push(tweet);
        emit TweetCreated(tweet.author, tweet.content);
        console.log("Tweet created:", tweet.content, "by", tweet.author);
    }

    function getAllTweets() public view returns (Tweet[] memory) {
        return tweets;
    }
}
