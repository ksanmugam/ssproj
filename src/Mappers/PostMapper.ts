import PostViewModel from "@/ViewModels/PostViewModel";

export default class PostMapper {
    public static ApiToView(apiModel: any) : PostViewModel {
        const viewModel = new PostViewModel();
        viewModel.id = apiModel.id;
        viewModel.description = apiModel.description;
        viewModel.title = apiModel.title;
        viewModel.viewCount = apiModel.live_views
        return viewModel;
    }
}