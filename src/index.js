const {PORT} = require('./config/server-config');


const express = require('express');
const bodyParser = require('body-parser');

const { sendBasicEmail } = require('./services/email-service');

const setupAndStartServer = () => {
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));

    app.listen(PORT,() => {
        console.log(`server started at PORT : ${PORT}`);

        sendBasicEmail(
        'support@admin.com', //from
        '24363@iiitu.ac.in', //to
        'This is a testing Email', //subj
        'Hey! , I hope u like the support' //text
        );
    });

    
}

setupAndStartServer();