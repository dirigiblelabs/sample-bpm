import { Controller, Post, response } from "sdk/http"
import { user } from "sdk/security";
import { process, tasks } from "sdk/bpm"

@Controller
class TimeEntryService {

    @Post("/submitRequest")
    public submitRequest(data: any) {

        process.start('time-entry-request', {
            "requester": user.getName(),
            "project": data.project,
            "startDate": data.startDate,
            "endDate": data.endDate,
            "hours": data.hours
        });

        response.setStatus(response.ACCEPTED);
    }

    @Post("/approveRequest")
    public approveRequest(data: any) {
        const taskId = data.taskId;
        const reason = data.reason;
        this.completeTask(taskId, true, reason);
    }

    @Post("/rejectRequest")
    public rejectRequest(data: any) {
        const taskId = data.taskId;
        const reason = data.reason;
        this.completeTask(taskId, false, reason);
    }

    private completeTask(taskId: string, approved: boolean, reason: string) {
        const variables = {
            approver: user.getName(),
            reason: reason,
            requestApproved: approved
        };
        tasks.complete(taskId, variables);
    }
}
