import { UniqueIdentifier } from "@dnd-kit/core"

export type Item = {
  value: UniqueIdentifier,
  id: string,
  code: string,
  canEnter?: boolean
}