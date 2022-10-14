# BPM Sample

1. Start Eclipse Dirigible.
1. Clone the sample in the Git perspective of Eclipse Dirigible.
1. Wait between 1 and 2 minutes for the sample to be completely activated.
1. Navigate to http://localhost:8080/services/v4/web/sample-bpm/submit/ to access the _**Submit Time Entry Request Form**_.
1. (Optional) Provide the mail environment variables.
1. (Optional) Restart the Eclipse Dirigible instance to apply the new environment variables.

## Process

<img width="1438" alt="Screenshot 2022-10-14 at 23 32 28" src="https://user-images.githubusercontent.com/4092083/195938498-32129208-f218-4365-9ce4-6f4238c44688.png">

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

> _**Note**: Find out more about [Connecting Eclipse Dirigible with SendGrid SMTP Relay
](https://www.dirigible.io/blogs/2022/09/12/sendgrid-smtp-relay-setup/)_
