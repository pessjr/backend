export class ResponsePaginationDto<T> {
  data: T[];
  total: number;
  currentPage: number;
  totalPages: number;

  constructor(partial: Partial<ResponsePaginationDto<T>>) {
    Object.assign(this, partial);
  }
}
