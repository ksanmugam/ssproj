import ReactionViewModel from "@/ViewModels/ReactionViewModel";

export default class ReactionMapper {
    public static ApiToViewList(apiModels: any): ReactionViewModel[] {
        if (apiModels) {
            return apiModels.map((apiModel: any) => this.ApiToView(apiModel));
        }
        else {
            return [];
        }
    }

    public static ApiToView(apiModel: any) : ReactionViewModel {
        const viewModel = new ReactionViewModel();
        viewModel.id = apiModel.id;
        viewModel.name = apiModel.name;
        viewModel.type = apiModel.type;
        return viewModel;
    }
}