const {ipcRenderer} = require('electron')
const { callExecFile } = require('./common/cli')


function raiseEvent(channel,...args){
    ipcRenderer.send(channel,args)
}

let gitversion = document.getElementById('gitversion')

callExecFile('git','--version')
.then( (data)=> {
    gitversion.innerText = data;
    console.log("The output is", data)
})
.catch(err => console.log("The error log is",err))
