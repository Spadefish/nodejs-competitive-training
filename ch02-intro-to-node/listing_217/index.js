const fs = require('fs')
const request = require('request')
const htmlparser = require('htmlparser')
const configFilename = './rss_feeds.txt'

function checkForRSSFile() {
    fs.exists(configFilename, (exists) => {
        if (!exists) {
            return next(new Error(`Missing RSS file: ${configFilename}`));
        }
        next(null, configFilename);
    })
}

function readRSSFile(configFilename) {
    fs.readFile(configFilename, (err, feedList)=> {
        if (err) {
            return next(err);
        }
        console.log('feedList======',feedList) // <Buffer 68 74 74 70  ... >
        console.log('feedList======',feedList.toString()) // http://blog.nodejs.org/feed/ https://rsshub.app/rsshub/rss/
        const feedListArr = feedList.toString().replace(/^\s+|\s+$/g, '').split('\n');
        console.log('feedListArr======',feedListArr) // [ 'http://blog.nodejs.org/feed/','https://rsshub.app/rsshub/rss/' ]
        const random = Math.floor(Math.random() * feedListArr.length);
        next(null, feedListArr[random]);
    });
}

function downloadRSSFeed(feedUrl) {
    console.log('feedUrl====',feedUrl)
    request({uri: feedUrl}, (err, res, body) => {
        if (err) {
            return next(err);
        }
        if (res.statusCode !== 200) {
            return next(new Error('Abnormal response status code'));
        }
        next(null, body);
    });
}

function parseRSSFeed(rss) {
    const handler = new htmlparser.RssHandler;
    const parser = new htmlparser.Parser(handler);
    parser.parseComplete(rss);
    if (!handler.dom.items.length) {
        return next(new Error('No RSS items found'));
    }
    const itemArr = handler.dom.items;
    console.log('itemArr====', itemArr);
    // const item = handler.dom.items.shift();
    // console.log('title====', item.title);
    // console.log('link====', item.link);
}

const task = [
    checkForRSSFile,
    readRSSFile,
    downloadRSSFeed,
    parseRSSFeed
]

function next(err, result) {
    if (err) {
        // console.log('error=====',err)
        throw  err;
    }
    const currentTask = task.shift();
    if (currentTask) {
        currentTask(result);
    }
}

next()
