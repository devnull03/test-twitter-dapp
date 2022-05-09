import { writable } from "svelte/store";
import { web3, selectedAccount } from "svelte-web3";
import type types from "web3";
import type { Contract } from "web3-eth-contract";
import TweetFactory from "./artifacts/contracts/TweetFactory.sol/TweetFactory.json";

export interface TweetInterface {
    author: string;
    content: string;
    timestamp: Date;
}
const tweetFactoryContractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;

let web3_: types;
let selectedAccount_: string;

web3.subscribe((w) => {
    web3_ = w;
});
selectedAccount.subscribe((account) => {
    selectedAccount_ = account as string;
});

const createStore = () => {
    const { subscribe, set, update } = writable<TweetInterface[]>([]);
    let TweetFactoryContract: Contract;

    const init = async () => {
        TweetFactoryContract = new web3_.eth.Contract(
            // @ts-ignore
            TweetFactory.abi,
            tweetFactoryContractAddress
        );
        // console.log(TweetFactoryContract, tweetFactoryContractAddress);
    };

    const refreshTweets = async () => {
        const _tweets: TweetInterface[] = await TweetFactoryContract.methods
            .getAllTweets()
            .call({ from: selectedAccount_ })
            .then(
                (
                    tweets: {
                        author: string;
                        content: string;
                        timestamp: string;
                    }[]
                ) => {
                    // console.log("raw tweets: ", tweets);
                    return tweets
                        .map(
                            (tweet: any): TweetInterface => ({
                                author: tweet.author,
                                content: tweet.content,
                                timestamp: new Date(
                                    Number(tweet.timestamp) * 1000
                                ),
                            })
                        )
                        .reverse();
                }
            );
        // console.log(_tweets);
        set(_tweets);
    };

    const createTweet = async (content: string) => {
        const _tweet = await TweetFactoryContract.methods
            .createTweet(content)
            .send({ from: selectedAccount_ })
            .then((recipt: any) => recipt.tranctionHash);

        refreshTweets();
        return _tweet;
    };

    return {
        init,
        subscribe,
        createTweet,
        refreshTweets,
    };
};

export const tweetStore = createStore();
