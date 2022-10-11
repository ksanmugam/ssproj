import AttachmentViewModel from "./AttachmentViewModel";
import ReactionViewModel from "./ReactionViewModel";
import ReplyViewModel from "./ReplyViewModel";
import UserViewModel from "./UserViewModel";

export default class CommentsViewModel {
    public id: string | undefined;
    public user: UserViewModel | undefined;
    public replies: ReplyViewModel[] | undefined;
    //public createdTime: string | undefined;
    public reaction: ReactionViewModel | undefined;
    public message: string | undefined;
    public likeCount: number | undefined;
    public attachment: AttachmentViewModel | undefined;

    constructor() {
        this.id = '00000000-0000-0000-0000-000000000000';
        this.user = new UserViewModel();
        this.replies = [];
        //this.createdTime = '';
        this.reaction = new ReactionViewModel();
        this.message = '';
        this.likeCount = 0;
        this.attachment = new AttachmentViewModel();
    }
}