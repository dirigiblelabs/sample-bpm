const process = require("bpm/process");
const mailClient = require("mail/client");
const config = require("core/configurations");

let execution = process.getExecutionContext();
let executionId = execution.getId();

let user = process.getVariable(executionId, "user");

console.log(`Time Entry Request Approved for User [${user}]`);

if (isMailConfigured()) {
    let from = config.get("APP_SAMPLE_BPM_FROM_EMAIL");
    let to = config.get("APP_SAMPLE_BPM_TO_EMAIL");
    let subject = "Time Entry Request - Approved";
    let content = `<h2>Status:</h2><h4>Time Entry Request for [${user}] - Approved</4>`;
    let subType = "html";

    mailClient.send(from, to, subject, content, subType);
} else {
    console.error("Missing mail configuration");
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
