// import adapter from "@sveltejs/adapter-auto";
import preprocess from "svelte-preprocess";
import adapter from "@sveltejs/adapter-static";

/** @type {import('@sveltejs/kit').Config} */
const config = {
    kit: {
        // hydrate the <div id="svelte"> element in src/app.html
        adapter: adapter({
            // default options are shown
            pages: "build",
            assets: "build",
            fallback: "index.html",
        }),
        paths: {
            base: '/test-twitter-dapp',
        },
    },
    preprocess: [
        preprocess({
            postcss: true,
        }),
    ],
};

// Default config
// const config = {
// 	// Consult https://github.com/sveltejs/svelte-preprocess
// 	// for more information about preprocessors
// 	preprocess: preprocess(),

// 	kit: {
// 		adapter: adapter()
// 	}
// };

export default config;
