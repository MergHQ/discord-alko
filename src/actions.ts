import * as Bacon from 'baconjs'

export type Action = {
  action: string;
  data: {};
}

const actionBus = new Bacon.Bus<Action>()

export const dispatch = <T>(action: string, data: T): void =>
  actionBus.push({
    action,
    data
  })

export const actionStream = <T>(actionName: string): Bacon.EventStream<T> =>
  actionBus
    .filter(({ action }) => action === actionName)
    .map(({ data }) => data as T)
