
const express = require('express');
const bodyParser = require('body-parser');
const cron = require('node-cron');


const sender = require('./config/email-config'); // transporter
const { PORT } = require('./config/server-config');
const TicketController = require('./controller/ticket-controller');


const jobs = require('./util/job');

const setupAndStartServer = () => {
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.post('/api/v1/tickets',TicketController.create);

    app.listen(PORT, () => {
        console.log(`server started at PORT : ${PORT}`);

        
        jobs(); 

        // 🔥 CRON JOB (हर 2 minute)
        // cron.schedule('*/2 * * * *', async () => {
        //     console.log("Running cron job: Sending email evry 2 min...");



            // try {
            //     await sender.sendMail({
            //         from: "Airline Booking ✈️ <support@admin.com>",
            //         to: "24363@iiitu.ac.in", // testing ke liye same rakh
            //         subject: "Reminder ⏰",
            //         text: "This mail is sent every 2 minutes"
            //     });

            //     console.log("Email sent successfully ✅");
            // } catch (error) {
            //     console.log("Error sending email ❌", error);
            // }
        //});

    });
}

setupAndStartServer();