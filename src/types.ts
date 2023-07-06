import { UniqueIdentifier } from "@dnd-kit/core"

export type Item = {
  value: UniqueIdentifier,
  id: string,
  children: Array<Item>,
  code?: string,
  codeStart?: string,
  codeEnd?: string,
  canEnter?: boolean
}

export type Project = {
  title: string;
  root: Array<Item>;
  users: Array<String>;
}