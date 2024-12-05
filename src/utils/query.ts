export function getQuery(id: string, filter: any) {
  return { id, ...filter };
}
