import AttachmentViewModel from "@/ViewModels/AttachmentViewModel";

export default class AttachmentMapper {
    public static ApiToView(apiModel: any): AttachmentViewModel {
        const viewModel = new AttachmentViewModel();
        viewModel.id = apiModel.target!.id;
        viewModel.imageUrl = apiModel.media!.image!.src;
        viewModel.type = apiModel.type;
        return viewModel;
    }
}