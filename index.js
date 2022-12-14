const fs = require('fs');
const http = require('http');
const readline = require('readline');
const { requestVideoURL, requestVideoDatas } = require("./https/requests")

//promise.all()用,装
let _urls = [];

//获取vid
const getVID = (url) => {
    const parsedUrl = new URL(url);

    // 使用 URLSearchParams 类解析 URL 中的查询字符串
    const params = new URLSearchParams(parsedUrl.search);

    // 获取 vid 参数的值
    return params.get('vid');
}



//获取最终视频链接和视频名字
const getVidelURL = async(vid) => {
    let videoURLDATA = {};

    let datas = await requestVideoURL(vid);
    // console.log("视频链接的datas", datas);
    let res = JSON.parse(datas);

    if (res) {
        videoURLDATA.videoURL = res.data.video_url;
        videoURLDATA.videoNAME = res.data.title;
    }

    return videoURLDATA;

}

//获取视频，并写入本地
const getVIDEO = async(url, videoNAME) => {

    let datas = await requestVideoDatas(url);
    console.log("视频的数据", datas);
    let finalDATA = Buffer.concat(datas);
    let filename = videoNAME + ".mp4";

    fs.writeFile(filename, finalDATA, (err) => {
        if (err) throw err;
    })

};


// 创建可读流
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

// 读取用户输入的url
rl.question('请粘贴要下载的url,用空格隔开：', async(urls) => {

    let urlArray = urls.split(" ");

    for (let i = 0; i < urlArray.length; i++) {
        let vid = getVID(urlArray[i]);
        let videoURLDATA = await getVidelURL(vid);
        _urls.push(videoURLDATA);
    }

    console.log("__urls", _urls);

    for (let i = 0; i < _urls.length; i++) {
        getVIDEO(_urls[i].videoURL, _urls[i].videoNAME);
    }


});