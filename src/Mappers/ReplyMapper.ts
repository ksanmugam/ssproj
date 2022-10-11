import ReplyViewModel from "@/ViewModels/ReplyViewModel";
import CommentsMapper from "./CommentsMapper";
import UserMapper from "./UserMapper";
import AttachmentMapper from "./AttachmentMapper";
import AttachmentViewModel from "@/ViewModels/AttachmentViewModel";

export default class ReplyMapper {
    public static ApiToViewList(apiModels: any): ReplyViewModel[] {
        if (apiModels) {
            return apiModels.map((apiModel: any) => this.ApiToView(apiModel));
        }
        else {
            return [];
        }
    }

    public static ApiToView(apiModel: any): ReplyViewModel {
        const viewModel = new ReplyViewModel();
        viewModel.id = apiModel.id;
        //viewModel.createdTime = CommentsMapper.GetFormattedTimeAMPM(new Date(apiModel.created_time)) + " " + CommentsMapper.GetFormattedDate(new Date(apiModel.created_time));
        viewModel.likeCount = apiModel.like_count!;
        viewModel.user = UserMapper.ApiToView(apiModel.from);
        viewModel.message = apiModel.message;
        viewModel.attachment = apiModel.attachment! ? AttachmentMapper.ApiToView(apiModel.attachment) : new AttachmentViewModel;
        return viewModel;
    }
}