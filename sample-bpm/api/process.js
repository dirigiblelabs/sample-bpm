const rs = require("http/v4/rs");
const process = require("bpm/v4/process");
const tasks = require("bpm/v4/tasks");
const user = require("security/v4/user");

rs.service()
    .post("", (ctx, request, response) => {
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
        let executionId = request.params.executionId;
        let tasksList = tasks.list();
        let data = request.getJSON();
        for (const task of tasksList) {
            if (task.executionId.toString() === executionId.toString()) {
                tasks.completeTask(task.id, {
                    isRequestApproved: data.approved,
                    user: data.user
                });
                break;
            }
        }
        response.setStatus(response.ACCEPTED);
    })
    .execute()