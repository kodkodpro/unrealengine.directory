export type Version = `${number}.${number}`

// Generate a range of versions from a start and end version
// Example: "4.19 - 4.27" returns ["4.19", "4.20", "4.21", "4.22", "4.23", "4.24", "4.25", "4.26", "4.27"]
export const generateRange = (start: Version, end: Version) => {
  const [startMajor, startMinor] = start.split(".").map((version) => parseInt(version))
  const [endMajor, endMinor] = end.split(".").map((version) => parseInt(version))

  const versions: Version[] = []

  for (let major = startMajor; major <= endMajor; major++) {
    const startMinorVersion = major === startMajor ? startMinor : 0
    const endMinorVersion = major === endMajor ? endMinor : 99

    for (let minor = startMinorVersion; minor <= endMinorVersion; minor++) {
      versions.push(`${major}.${minor}` as Version)
    }
  }

  return versions
}

// Shrink a list of versions by removing duplicates, sorting them and create a short string representation
//
// Example:
//  ["4.19", "4.20", "4.21", "4.22", "4.23", "4.24", "4.25", "4.26", "4.27", "5.0", "5.1", "5.2"]
//  returns "4.19 - 4.27, 5.0 - 5.2"
export function shrinkVersions(versions: Version[]) {
  // Remove duplicates and sort the array
  const uniqueVersions = versions
    .filter((version, index) => versions.indexOf(version) === index)
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true })) as Version[]

  let result = ""
  let startRange = uniqueVersions[0]
  let endRange: Version | null = null

  for (let i = 1; i < uniqueVersions.length; i++) {
    const prevVersion = uniqueVersions[i - 1].split(".").map(Number)
    const currVersion = uniqueVersions[i].split(".").map(Number)

    if (
      (currVersion[0] === prevVersion[0] && currVersion[1] === prevVersion[1] + 1) ||
      (currVersion[0] === prevVersion[0] + 1 && currVersion[1] === 0 && prevVersion[1] === 1)
    ) {
      endRange = uniqueVersions[i]
    } else {
      result += startRange + (endRange ? " - " + endRange : "") + ", "
      startRange = uniqueVersions[i]
      endRange = null
    }
  }

  result += startRange + (endRange ? " - " + endRange : "")
  return result
}
