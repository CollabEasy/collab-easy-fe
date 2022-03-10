export interface ScratchpadState {
   isFetchingScratchpad: boolean;
   isUpdatingScratchpad: boolean;
   scratchpad: {
      content: string;
   };
}