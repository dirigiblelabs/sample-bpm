import { rs } from "sdk/http";
const process = require("bpm/process");
const tasks = require("bpm/tasks");
const user = require("security/user");

rs.service()
    .resource("")
    .post((ctx, request, response) => {
        let data = request.getJSON();
        process.start('time-entry-request', {
            "User": "" + user.getName(),
            "Project": "" + data.Project,
            "Start": "" + data.Start,
            "End": "" + data.End,
            "Hours": "" + data.Hours
        });
        response.setStatus(response.ACCEPTED);
    })
    .resource("continue/:executionId")
    .post((ctx, request, response) => {
        //let executionId = request.params.executionId;
        let executionId = ctx.pathParameters['executionId'];
        console.log("Exec Id: " + executionId);
        let tasksList = tasks.list();
        console.log(JSON.stringify(tasksList[0]));
        let data = request.getJSON();

        for (const task of tasksList) {
            console.log((task.data.executionId === executionId) + " " + task.data.executionId + " " + executionId + " " + task.data.id + " " + data.approved);
            if (task.data.executionId == executionId) {
                console.log("passed");
                tasks.complete(task.data.id, {
                    isRequestApproved: data.approved,
                    user: data.user
                });
                break;
            }
        }
        response.setStatus(response.ACCEPTED);
    })
    .execute()
