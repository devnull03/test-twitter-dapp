<script lang="ts">
    import {
        defaultEvmStores,
        web3,
        connected,
        selectedAccount,
    } from "svelte-web3";
    import { onMount } from "svelte";
    import { tweetStore } from "../store";

    onMount(async () => {
        await defaultEvmStores.setProvider();
        await tweetStore.init();
        await tweetStore.refreshTweets();

        // tweetStore.addTweet("Hello world!");

    });

    let walletAccount: string | null;
    selectedAccount.subscribe((account) => {
        walletAccount = account;
    });

    const toggleConnect = () => {
        if (walletAccount) {
            defaultEvmStores.disconnect();
        } else {
            defaultEvmStores.setProvider();
        }
    };
</script>


(Rinkeby testnet)
<div>
    <button
        on:click={toggleConnect}
        class="bg-[#38444d] font-bold rounded-full p-3 px-4"
    >
        {walletAccount ? "Disconnect MetaMask" : "Connect to MetaMask"}
    </button>
</div>
