type IOptions = { page?: number; limit?: number; sortBy?: string; sortOrder?: "asc" | "desc" };

type IOptionsReturnType = { page: number; limit: number; skip: number; sortBy: string; sortOrder: "asc" | "desc" };

const calculatePagination = (options: IOptions): IOptionsReturnType => {
  const page: number = Number(options?.page) || 1;
  const limit: number = Number(options?.limit) || 10;
  const skip: number = (Number(page) - 1) * limit;
  const sortBy: string = options?.sortBy || "createdAt";
  const sortOrder: "asc" | "desc" = options?.sortOrder || "desc";

  return {
    page,
    limit,
    skip,
    sortBy,
    sortOrder,
  };
};

export const paginationHelper = {
  calculatePagination,
};
