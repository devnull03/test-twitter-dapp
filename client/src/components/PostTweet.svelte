<script lang="ts">
    import { tweetStore } from "../store";

    $: transction = Promise.resolve();
    $: wordCount = 0;
    const defaultAvatar = "https://cdn.discordapp.com/attachments/954020168697270322/973024965362327653/defaultPFP.webp";

    const postTweet = async (e: Event) => {
        e.preventDefault();
        const form = new FormData(e.target as HTMLFormElement);
        const content = form.get("tweet-content") as string;

        (e.target as HTMLFormElement).reset();
        wordCount = 0;
        transction = tweetStore.createTweet(content);
        transction.then((res) => {
            const postedMessage = `Tweet posted! 🎉\n\nYou can view it on the blockchain at: \n\nhttps://rinkeby.etherscan.io/tx/${res}`;
            alert(postedMessage);
            console.log(postedMessage);
        });
        await tweetStore.refreshTweets();
    };
</script>

{#await transction}
    <p class="font-semibold text-2xl text-center">
        Waiting for tweet to be mined...
    </p>
{:then}
    <form
        class="flex flex-col border-b border-[#38444d] pb-4 mt-7 gap-5"
        on:submit={postTweet}
    >
        <div class="flex flex-row gap-7">
            <img src={defaultAvatar} class="w-12 h-12 rounded-full" alt="" />
            <textarea
                placeholder="What's happening?"
                name="tweet-content"
                class="w-full h-min bg-inherit text-xl rounded-lg outline-none break-words resize-none p-2"
                on:input={(e) => {
                    wordCount = e.currentTarget.value.length;
                    e.currentTarget.style.height = "";
                    if (e.currentTarget.value.length > 256) {
                        e.currentTarget.style.outline = "#bc1d1d solid 2px";
                    } else {
                        e.currentTarget.style.outline = "";
                    }
                    e.currentTarget.style.height =
                        e.currentTarget.scrollHeight + "px";
                }}
            />
        </div>
        <div class="flex justify-between">
            <p
                class={wordCount > 256
                    ? "text-[#bc1d1d] text-base font-semibold"
                    : "text-gray-500 text-sm font-light"}
            >
                Words: {wordCount} / 256
            </p>
            <button
                type="submit"
                class={`${
                    wordCount > 256
                        ? "bg-[#901616] hover:bg-[#a13131] cursor-not-allowed"
                        : "bg-[#38444d] hover:bg-[#2f3136]"
                }  text-white font-bold py-2 px-4 rounded-full`}
                disabled={wordCount > 256}
            >
                Tweet
            </button>
        </div>
    </form>
{/await}
