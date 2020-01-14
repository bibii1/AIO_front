const EMAIL= "confirmation.aio@gmail.com";
const PASSWORD= "bb|T-NJ`Se5o3]SB";

const nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
service: 'gmail',
auth: {
        user: EMAIL,
        pass: PASSWORD
    }
});
Vue.config.productionTip = false

export default transporter;