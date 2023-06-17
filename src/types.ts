import { UniqueIdentifier } from "@dnd-kit/core"

export type Item = {
  value: UniqueIdentifier,
  id: string,
  code: string,
  canEnter?: boolean
  children?: Array<Item>
}

export type Comp = {
  value: string,
  id: string,
  codeStart?: string,
  codeEnd?: string,
  code?: string,
  children: Array<Item>
}