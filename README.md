1.下载并安装node.js；
2.把这个项目下载下来解压；
3.在终端打开这个项目；
4.终端输入：node index.js；
5.把多个url粘贴进去（（在糖豆app上点击分享，分享到qq,单击分享过来的卡片后会自动用浏览器打开，拿到url）），每个url之间用空格隔开，回车；
6.有时候可能会报JSON解析出错，Ctrl+C结束，在浏览器把打开的广场刷新一次，重新粘贴url；

7.项目描述其中一个关键：下载时必须附带如下请求头才可正常获取我们想要的视频：
'Referer': 'https://www.tangdoucdn.com/''，
否则下载到的视频则是一个名为hello.mp4的默认视频文件。（从这抄的：https://github.com/CCBP/TangdouDownloader#readme）。