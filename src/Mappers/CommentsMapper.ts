import AttachmentViewModel from "@/ViewModels/AttachmentViewModel";
import CommentsViewModel from "@/ViewModels/CommentsViewModel";
import AttachmentMapper from "./AttachmentMapper";
import ReactionMapper from "./ReactionMapper";
import ReplyMapper from "./ReplyMapper";
import UserMapper from "./UserMapper";

export default class CommentsMapper {
    public static ApiToViewList(apiModels: any): CommentsViewModel[] {
        if (apiModels) {
            return apiModels.map((apiModel: any) => this.ApiToView(apiModel));
        }
        else {
            return [];
        }
    }

    public static ApiToView(apiModel: any) : CommentsViewModel {
        const viewModel = new CommentsViewModel();
        viewModel.id = apiModel.id;
        //viewModel.createdTime = this.GetFormattedTimeAMPM(new Date(apiModel.created_time)) + " " + this.GetFormattedDate(new Date(apiModel.created_time));
        viewModel.user = UserMapper.ApiToView(apiModel.from);
        viewModel.message = apiModel.message;
        viewModel.likeCount = apiModel.like_count!;
        viewModel.attachment = apiModel.attachment! ? AttachmentMapper.ApiToView(apiModel.attachment) : new AttachmentViewModel;
        return viewModel;
    }

    /**
     * Helper function to get formatted date in DD/MM/YYYY
     * @param value date
     * @returns date formatted string
     */
    public static GetFormattedDate(value: Date) {
        const dd = value.getDate();
        const mm = value.getMonth() + 1;
        const yyyy = value.getFullYear();

        let dayStr = '';
        let monthStr = '';
        if (dd < 10) {
            dayStr = '0' + dd;
        } else {
            dayStr = '' + dd;
        }
        if (mm < 10) {
            monthStr = '0' + mm;
        } else {
            monthStr = '' + mm;
        }
        return dayStr + '/' + monthStr + '/' + yyyy;
    }

    /**
     * Helper function to get formatted time
     * @param value date
     * @returns time formatted string
     */
    public static GetFormattedTime(value: Date) {
        const hh = value.getHours();
        const mm = value.getMinutes();

        let hourStr = '';
        let minuteStr = '';
        if (hh < 10) {
            hourStr = '0' + hh;
        } else
            hourStr = '' + hh;
        if (mm < 10) {
            minuteStr = '0' + mm;
        } else {
            minuteStr = '' + mm;
        }
        return hourStr + ':' + minuteStr;
    }

    /**
     * Helper function to get formatted time in AM PM
     * @param value date
     * @returns time formatted string
     */
    public static GetFormattedTimeAMPM(value: Date) {
        let hours : number = value.getHours();
        const minutes : number = value.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        let minutesstring = minutes < 10 ? '0'+minutes : minutes;
        var strTime = hours + ':' + minutesstring + ' ' + ampm;
        return strTime;
      }
}