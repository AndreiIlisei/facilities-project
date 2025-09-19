export function isValidTime(hhmm: string) {
  const m = /^(\d{2}):(\d{2})$/.exec(hhmm)
  if (!m) return false
  const h = Number(m[1])
  const min = Number(m[2])
  return h >= 0 && h <= 23 && min >= 0 && min <= 59
}

export function isValidImageUrl(url: string): boolean {
  if (!url) return true // optional field

  try {
    const parsedUrl = new URL(url)

    // Must be http or https
    if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
      return false
    }

    const hostname = parsedUrl.hostname

    // Basic hostname checks
    if (!hostname || hostname.length < 4 || hostname.length > 253) {
      return false
    }

    // Check for invalid characters (spaces, consecutive dots, etc.)
    if (/\s|\.\./.test(hostname)) {
      // Reject spaces or consecutive dots
      return false
    }

    // Must start and end with alphanumeric (not dot or hyphen)
    if (/^[.-]|[.-]$/.test(hostname)) {
      return false
    }

    // Split by dots and validate each part
    const parts = hostname.split('.')
    if (parts.length < 2) {
      // Must have at least domain.tld
      return false
    }

    // Validate each part of the domain
    for (const part of parts) {
      if (!part || part.length < 1 || part.length > 63) {
        return false
      }
      // Each part must be alphanumeric (with hyphens allowed in middle)
      if (!/^[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?$/.test(part)) {
        return false
      }
    }

    // TLD (last part) should be at least 2 chars and only letters
    const tld = parts[parts.length - 1]
    if (tld.length < 2 || !/^[a-zA-Z]+$/.test(tld)) {
      return false
    }

    return true
  } catch {
    return false
  }
}
