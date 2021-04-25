const {ipcRenderer, dialog} = require('electron')
const { callExecFile } = require('./common/cli')

let pane1 = document.getElementById('pane-1')
let pane2 = document.getElementById('pane-2')
let pane3 = document.getElementById('pane-3')

const textarea = `
<form>
<div class="form-group">
    <label>@description</label>
    <textarea class="form-control jumbotron" rows="3" disabled>@content</textarea>
  </div></form>
`

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

function openFolderForSelection(){
    console.log("I have been clicked")
    raiseEvent('open-folder')
}

ipcRenderer.on('folder-selected',(event,args) =>{
    console.log("The file selected is",args.filePaths[0])
    callExecFile('git','branch','-av')
    .then( (data)=> {
        console.log("The output is", data)
        const branch = textarea.replace('@description','BRANCHES').replace('@content',data)
        pane1.insertAdjacentHTML('beforeend',branch)
    })
    .catch(err => console.log("The error log is",err))
    callExecFile('git','log','--oneline')
    .then( (data)=> {
        console.log("The output is", data)
        const log = textarea.replace('@description','COMMITS').replace('@content',data)
        pane1.insertAdjacentHTML('beforeend',log)
    })
    .catch(err => console.log("The error log is",err))
    
})


