const {ipcRenderer} = require('electron')


function raiseEvent(channel,...args){
    ipcRenderer.send(channel,args)
}
