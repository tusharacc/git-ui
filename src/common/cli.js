const { execFile } = require('child_process');

function callExecFile(cmd, ...options){
    return new Promise((resolve,reject) =>{
        const child = execFile(cmd, options, (error, stdout, stderr) => {
            if (error) {
              reject(error);
            }
            resolve(stdout);
          });
    })
}
