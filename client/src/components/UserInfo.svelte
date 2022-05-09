<script lang="ts">
    import WalletConnectButton from "./WalletConnectButton.svelte";
    import { selectedAccount, connected } from "svelte-web3";
    const defaultAvatar = "https://cdn.discordapp.com/attachments/954020168697270322/973024965362327653/defaultPFP.webp";
</script>

<div
    id="user-info"
    class="flex flex-col h-fit gap-4 p-6 rounded-lg bg-[#1e2732] border border-gray-200 shadow-md dark:border-gray-700"
>
    {#if $connected}
        <div class="rounded-full p-0.5 border-2 h-24 w-24 overflow-hidden">
            <img
                src={defaultAvatar}
                alt="User pfp"
                class="rounded-full m-0 p-0"
            />
        </div>
        <div class="flex flex-row items-baseline">
            <p class="text-xl break-all">{$selectedAccount}</p>
        </div>
    {/if}
    <WalletConnectButton />
</div>
