export function getQuery(userId: string, filter: any) {
  return { userId, ...filter };
}
