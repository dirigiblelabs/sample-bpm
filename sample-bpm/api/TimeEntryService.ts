import { Controller, Post, response } from "sdk/http"
import { user } from "sdk/security";
import { process } from "sdk/bpm"

@Controller
class TimeEntryService {

    @Post("/")
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
}
