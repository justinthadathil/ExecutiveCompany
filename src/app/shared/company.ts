export interface executiveGroupModel {
  id: number
  name: string
  version: number
}

export interface executiveModel {
  id: number
  lastName: string
  firstName: string
  initials: string
  systemInitials: string
  title: string
  postTitle: string
  salutation: string
  jobTitle: string
  officeId: number
  version: number
  executiveGroup: executiveGroupModel
}
