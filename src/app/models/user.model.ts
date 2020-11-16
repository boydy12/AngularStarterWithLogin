import { DbItem } from './dbItem';

export class User implements DbItem {
  Id: number;
  SocialId: string;
  Email: string;
  DisplayName?: string;
  PhotoUrl?: string;
}
