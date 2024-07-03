# BPM Sample

1. Start Eclipse Dirigible.
1. Clone the sample in the Git perspective of Eclipse Dirigible.
1. Wait between 1 and 2 minutes for the sample to be completely activated.
1. Navigate to [Submit Time Entry Request Form](http://localhost:8080/services/web/sample-bpm/gen/submit-time-entry-request/forms/submit-time-entry-request/index.html).
1. Submit a new request
1. Claim and approve the time entry request using [the inbox UI](http://localhost:8080/services/web/inbox/)
1. (Optional) Provide the mail environment variables.
1. (Optional) Restart the Eclipse Dirigible instance to apply the new environment variables.

## Process
<img width="1330" alt="image" src="https://github.com/dirigiblelabs/sample-bpm/assets/5058839/efbf5058-8179-4de6-bf9d-e1754bd0f10e">

## Mail Environment Variabels

```
DIRIGIBLE_MAIL_USERNAME=apikey
DIRIGIBLE_MAIL_PASSWORD=<YOUR_API_KEY_HERE>
DIRIGIBLE_MAIL_TRANSPORT_PROTOCOL=smtps
DIRIGIBLE_MAIL_SMTPS_HOST=smtp.sendgrid.net
DIRIGIBLE_MAIL_SMTPS_PORT=465
APP_SAMPLE_BPM_FROM_EMAIL=<SENDER_EMAIL>
APP_SAMPLE_BPM_TO_EMAIL=<RECEIVER_EMAIL>
```

> _**Note**: Find out more at [Connecting Eclipse Dirigible with SendGrid SMTP Relay
](https://www.dirigible.io/blogs/2022/09/12/sendgrid-smtp-relay-setup/)_
