import { UserSample } from "types/model";

export interface UserSampleState {
    isUploading: boolean;
    isUploaded: boolean;
    isFetchingSamples: boolean;
    isDeleting: boolean;
    isDeleted: boolean;
    samples: UserSample[];
}