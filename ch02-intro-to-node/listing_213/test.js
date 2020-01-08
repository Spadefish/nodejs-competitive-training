const fs = require('fs')
fs.readdir('./done', (err, file)=> {
    if (err) throw err
    const fileArr = file.filter(item => !item.startsWith('.'))
    console.log('file=======',fileArr)
})

/*
file======= [ 'AAA.TXT', 'TEST11.TXT' ]
 */
