<script lang="ts">
    export let author: string;
    export let content: string;
    export let timestamp: Date;

    const getTimeFromNow = (timestamp: Date) => {
        const now = new Date();
        const diff = now.getTime() - timestamp.getTime();
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor(diff / (1000 * 60));
        const seconds = Math.floor(diff / 1000);
        if (days > 0) {
            return `${days} days ago`;
        } else if (hours > 0) {
            return `${hours} hours ago`;
        } else if (minutes > 0) {
            return `${minutes} minutes ago`;
        } else {
            return `${seconds} seconds ago`;
        }
    };
    const defaultAvatar = "https://cdn.discordapp.com/attachments/954020168697270322/973024965362327653/defaultPFP.webp";
</script>

<!-- <a href=""> -->
<div class="flex flex-row p-4 gap-4 cursor-pointer">
    <img src={defaultAvatar} class="w-12 h-12 rounded-full" alt="" />
    <div class="flex flex-col overflow-ellipsis break-words max-w-full">
        <div class="flex flex-row gap-2 text-base break-words">
            <a
                class="overflow-hidden whitespace-nowrap text-ellipsis hover:text-gray-400 max-w-[170px] transition duration-150 ease-in-out"
                href={`https://rinkeby.etherscan.io/address/${author}`}
                target="_blank"
                data-bs-toggle="tooltip"
                title={author}
            >
                {author}
        </a>
            <div
                class="text-[#8b98a5]"
                data-bs-toggle="tooltip"
                title={timestamp.toLocaleString()}
            >
                • {getTimeFromNow(timestamp)}
            </div>
        </div>
        <p class="">{content}</p>
    </div>
</div>
<!-- </a> -->