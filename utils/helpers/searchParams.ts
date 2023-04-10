export const getIdsFromQuery = (searchParams: URLSearchParams, key: string) => {
  return searchParams.get(key)?.split(",").map((id) => parseInt(id)) || []
}
