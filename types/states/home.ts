import { LoginModalDetails } from "types/model";

export interface HomeState {
  homeDetails: any;
  isLoading: boolean,
  loginModalDetails: LoginModalDetails;
  artistListDetails: any;
  routeToMyWondor: boolean;
  currentPathname: string;
}
