// const URL_SW = `${process.env.PUBLIC_URL}/sw.js`;

export function register() {
    if ('serviceWorker' in navigator) {
        //判断浏览器是否支持
        window.addEventListener('load', function () {
            // window在加载的时候来注册“sw.js”这个文件。这个文件就是serviceWorker
            navigator.serviceWorker.register('/src/sw.js', { scope: '/src/' })
                .then(registration => {
                    // 返回一个promise
                    console.log("成功！");
                    console.log(registration)
                })
                .catch(err => {
                    console.log("失败")
                    console.log(err)
                })
        })
    }
}