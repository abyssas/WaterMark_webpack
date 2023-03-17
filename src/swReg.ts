const URL_SW = `${process.env.PUBLIC_URL}/sw.js`;

export function register() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('loac', () => {
            navigator.serviceWorker.register(URL_SW).then((result) => {
                console.log("service worker register result", result)
            })
        })
    }
}