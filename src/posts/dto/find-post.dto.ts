export class FindPostDto {
  writer?: string;
  content?: string;
  page?: number = 1;
  pageSize?: number = 10;
}
