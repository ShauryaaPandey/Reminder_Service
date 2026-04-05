const sender = require ('../config/email-config');
// const {}

const TicketRepository = require('../repository/ticket-repo');

const repo = new TicketRepository();

const sendBasicEmail = async (mailFrom,mailTo,mailSubject,mailBody)=> {
        try{
            const response = await sender.sendMail({
            from : mailFrom,
            to : mailTo,
            subject : mailSubject,
            text : mailBody
        });
        console.log(response);
        } catch (error) {
            console.log(error);
        }
}
//                  fetch emails pending before this
const fetchPendingEmails = async (timeStamp) => {
       try {
            const response = await repo.get({status : "PENDING"});
            return response;
       } catch (error) {
            console.log(error);
       }     
}

const createNotification = async(data) => {
    try {
        const response = await repo.create(data);
        return response;
    } catch (error) {
        console.log(error);
    }
}

const updateTicket = async (ticketId,status) => {
    try {
            const response = await repo.update(ticketId,status);
            return response;
       } catch (error) {
            console.log(error);
       }
}

module.exports = {
    sendBasicEmail,
    fetchPendingEmails,
    createNotification,
    updateTicket
}