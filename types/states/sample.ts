import { UserSample } from "types/model";

export interface UserSampleState {
    isUploading: boolean;
    isUploaded: boolean;
    isFetchingSamples: boolean;
    samples: UserSample[];
}