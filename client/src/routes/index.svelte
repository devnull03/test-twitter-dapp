<script lang="ts">
    import { connected } from "svelte-web3";
    import PostTweet from "../components/PostTweet.svelte";
    import Navbar from "../components/Navbar.svelte";
    import Tweet from "../components/Tweet.svelte";
    import UserInfo from "../components/UserInfo.svelte";
    import { tweetStore } from "../store";
    
    $: customScroll = false;

    const showScroll = () => {
        customScroll = true;
    };
    const hideScroll = () => {
        customScroll = false;
    };
</script>

<svelte:head>
    <title>Home</title>
    <meta name="description" content="Homepage of the website" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
</svelte:head>

<main
    class="grid grid-flow-col h-screen max-h-screen justify-center text-[#f7f9f9] bg-[#15202B]"
    style="grid-template-columns: 1fr 600px 1fr;"
>
    <div />
    <div
        id="tweet-list-wrapper"
        class="flex flex-col min-w-[600px] max-w-[700px] border-x border-[#38444d] max-h-screen"
        on:mouseover={showScroll}
        on:focus={showScroll}
        on:mouseout={hideScroll}
        on:blur={hideScroll}
    >
        <Navbar />
        <div
            id="tweet-list"
            class={`${
                customScroll ? "" : "customScroll"
            } flex flex-col gap-5 px-5 overflow-y-scroll`}
        >
            <PostTweet  />
            {#await $connected}
                Loading tweets...
            {:then}
                {#each $tweetStore as tweet, index (index)}
                    <Tweet {...tweet} />
                {/each}
            {/await}
            <div class="h-10 w-full" />
        </div>
    </div>
    <div class="p-10">
        <UserInfo />
    </div>
</main>
