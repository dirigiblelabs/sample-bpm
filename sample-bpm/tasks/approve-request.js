const process = require("bpm/process");
const mailClient = require("mail/client");
const config = require("core/configurations");

const execution = process.getExecutionContext();
const executionId = execution.getId();

const requester = process.getVariable(executionId, "requester");


const from = config.get("APP_SAMPLE_BPM_FROM_EMAIL");
const to = config.get("APP_SAMPLE_BPM_TO_EMAIL");
const subject = "Time Entry Request - Approved";
const content = `<h2>Status:</h2><h4>Time Entry Request for [${requester}] - Approved</4>`;
const subType = "html";

if (isMailConfigured()) {
    mailClient.send(from, to, subject, content, subType);
} else {
    console.log(`Mail will not be send because the mail client is not configured. Mail:\n\tsubject: ${subject}\n\tcontent: ${content}`);
}


function isMailConfigured() {
    return config.get("DIRIGIBLE_MAIL_USERNAME") &&
        config.get("DIRIGIBLE_MAIL_PASSWORD") &&
        config.get("DIRIGIBLE_MAIL_TRANSPORT_PROTOCOL") &&
        (
            (config.get("DIRIGIBLE_MAIL_SMTPS_HOST") && config.get("DIRIGIBLE_MAIL_SMTPS_PORT") && config.get("DIRIGIBLE_MAIL_SMTPS_PORT"))
            ||
            (config.get("DIRIGIBLE_MAIL_SMTP_HOST") && config.get("DIRIGIBLE_MAIL_SMTP_PORT") && config.get("DIRIGIBLE_MAIL_SMTP_AUTH"))
        );
}
