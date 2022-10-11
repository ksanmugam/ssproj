import UserViewModel from "@/ViewModels/UserViewModel";

export default class UserMapper {
    public static ApiToView(apiModel: any): UserViewModel {
        const viewModel = new UserViewModel();
        viewModel.id = apiModel.id;
        viewModel.fullName = apiModel.name;
        return viewModel;
    }
}