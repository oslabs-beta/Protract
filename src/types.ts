import { UniqueIdentifier } from "@dnd-kit/core"

export type Item = {
  value: UniqueIdentifier,
  id: string,
  code?: string,
  codeStart?: string,
  codeEnd?: string,
  canEnter?: boolean
  children: Array<Item>
}

// export type Comp = {
//   value: string,
//   id: string,
//   codeStart?: string,
//   codeEnd?: string,
//   code?: string,
//   canEnter?: boolean,
//   children: Item[]|Comp[]
// }
