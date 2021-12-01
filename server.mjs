import express from 'express'
import clipboardy from 'clipboardy'
import {spawn, exec} from 'child_process'
import bodyParser from 'body-parser'
const app = express()
const port = process.env.PORT || 3000;


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const sleep = (ms) => {
    return new Promise((resolve) => {
        setTimeout(resolve,ms);
    });
}


app.get('/start', async (request, response) => {
    /*        exec("obs", (error, stdout, stderr) => {
                if (error) {
                    console.log(`error: ${error.message}`);
                    return;
                }
                if (stderr) {
                    console.log(`stderr: ${stderr}`);
                    return;
                }
                response.json({message:stdout}) 
            }); */
            const obs = exec('obs --startrecording');
            const dolphin = spawn('/home/dreiko/Videos/repos/dolphin/strikers-build/Binaries/dolphin-emu');
            await sleep(5000)
            exec(`xdotool search -all --onlyvisible --pid ${dolphin.pid} --name "dolphin" windowactivate mousemove 790 250 sleep 1 click 1 sleep .5 key Return Down Down Return sleep .5 key Tab Tab Tab Right sleep .25 key Tab Tab Tab Tab Tab Return sleep 2.5 search --all --onlyvisible --name Netplay windowactivate sleep .25 key Tab Tab Tab Tab Return Shift+Tab Shift+Tab Shift+Tab Shift+Tab Shift+Tab Shift+Tab Shift+Tab Shift+Tab Return sleep 1 key Up Shift+Tab Return`, (err,stdout, stderr) => {
                if (err) {
                    console.log(`error: ${err.message}`);
                    response.json({code:"There was an error"})
                    return;
                }
                if (stderr) {
                    console.log(`stderr: ${stderr}`);
                }
                clipboardy.read()
                .then((text)=> {
                    response.json({code:text})
                });
            });
        });

app.get('/begin-game', (request,response) => {
    exec('xdotool search --all --onlyvisible --name Netplay windowactivate sleep .25 key Tab Return', (err,stdout,stderr) => {
        if (err) {
            console.log(`error: ${err.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        response.json({message:"Game started"})
    })

})
  app.listen(port);
