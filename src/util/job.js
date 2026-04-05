const cron = require('node-cron');
const emailService = require('../services/email-service');
const sender = require ('../config/email-config');

const setupJobs = () => {
    cron.schedule('*/2 * * * *', async () => {
        try {
            const response = await emailService.fetchPendingEmails();

            response.forEach((email) => {
                sender.sendMail({
                    from: "ReminderService",
                    to: email.recepientEmail,
                    subject: email.subject,
                    text: email.content
                    //ab ye niche callback bhi h
                },async (err,data) => {
                    if(err){
                        console.log(err);
                    } else {
                        console.log(data);
                        await emailService.updateTicket(
                            email.id,{status : "SUCCESS"}
                        );
                    }
                });
            });

            console.log(response);
        } catch (error) {
            console.log("Error in cron job:", error);
        }
    });
};

module.exports = setupJobs;