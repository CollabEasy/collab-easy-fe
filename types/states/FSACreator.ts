
export type FSACreator = (
  ...args: any
) => { type: string; payload?: any; meta?: any; error?: any }
export type FSACreatorPayload<T extends FSACreator> = ReturnType<T>['payload']