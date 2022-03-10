export interface Email {
  id?: number;
  subject: string;
  email: string;
  template: string;
  priority: number;
  status: number;
  createDate: number;
}
