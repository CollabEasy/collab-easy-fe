import { CountryWiseCount, DateWiseCount, EmailEnumGroupDetail } from "types/model/analytics";

export interface AnalyticsState {
    users: {
        isFetchingUserAnalytics: boolean,
        totalUsers: number;
        datewiseUsers: DateWiseCount[];
        countryWiseData: CountryWiseCount[];
    },
    collabs: {
        isFetchingCollabAnalytics: boolean,
        totalCollabs: number;
        datewiseCollabs: DateWiseCount[];
    },
    emails: {
        emailEnumDetails: EmailEnumGroupDetail[]
    }
 }