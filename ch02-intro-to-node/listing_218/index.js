const fs = require('fs')
const tasks = []
const wordCounts = {}
const filesDir = './text'
let completedTasks = 0

function checkIfComplete() {
    completedTasks++
    if (completedTasks === tasks.length) {
        for (let index in wordCounts) {
            if (wordCounts.hasOwnProperty(index)) {
                console.log(`${index}: ${wordCounts[index]}`)
            } else {
                console.log('no this object key')
            }
        }
    }
}
function addWordCount(word) {
    wordCounts[word] = (wordCounts[word])? wordCounts[word] + 1 : 1
}
function countWordsInText(text) {
    const words = text
        .toString()
        .toLowerCase()
        .split(/\W+/)
        .sort()
    words
        .filter(word => word.startsWith('tom'))
        .forEach(word => addWordCount(word))
}

// fs.readdir 返回目录中的文件名的数组
fs.readdir(filesDir, (err, files) => {
    if (err) throw err
    console.log('files=====',files)  // files===== [ 'pg5670.txt' ]
    files.forEach(file => {
        const task = (file => {
            return () => {
                fs.readFile(file, (err, text) => {
                    if (err) {
                        throw err
                    }
                    countWordsInText(text)
                    checkIfComplete()
                })
            }
        })(`${filesDir}/${file}`)
        tasks.push(task)
    })
    tasks.forEach(task => task())
})
