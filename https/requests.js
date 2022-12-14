const http = require('http');

//获取视频链接和视频名称的请求
const requestVideoURL = (vid) => {
    return new Promise((resolve, reject) => {
        // 使用http模块向指定vid发起请求获取视频链接
        let options = {
            hostname: 'api-h5.tangdou.com',
            port: 80,
            path: `/sample/share/main?vid=${vid}`,
            method: 'GET',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Accept-Encoding': 'gzip, deflate, br',
                'Accept-Language': 'zh,zh-CN;q=0.9',
                'Connection': 'keep-alive',
                'Host': 'api-h5.tangdou.com',
                'Referer': 'https://www.tangdoucdn.com/',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36'
            }
        };

        const req = http.request(options, (res) => {
            let body = "";
            res.setEncoding("utf8");
            res.on("data", (chunk) => {
                body += chunk;
            });
            res.on("end", () => {
                resolve(body);
            });
        });

        req.on("error", (err) => {
            reject(err);
        });
        req.end();
    });

};


//获取视频数据流的请求
const requestVideoDatas = (url) => {
    return new Promise((resolve, reject) => {
        let _hostname = url.substring(8, 31).trim();
        let _path = url.replace("https://" + _hostname, "").trim();

        let options = {
            hostname: _hostname,
            port: 80,
            path: _path,
            method: 'GET',
            headers: {
                'Referer': 'https://www.tangdoucdn.com/',
                'Accept': '*/*', //返回任意类型
                'Range': 'bytes=0-', //范围：全部
            }
        };

        //用来装数据流
        let _buffer = [];
        const req = http.request(options, (res) => {
            res.on("data", (chunk) => {
                _buffer.push(chunk);
                console.log("下载中....", chunk);
            });

            res.on("end", () => {
                resolve(_buffer);
            });
        });

        req.on("error", (err) => {
            reject(err);
        });

        req.end();
    })
}

module.exports = {
    requestVideoURL,
    requestVideoDatas
}
