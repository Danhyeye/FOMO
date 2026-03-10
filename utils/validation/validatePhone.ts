/**
 * Validates Vietnamese phone numbers
 * Supports formats:
 * - 0xxxxxxxxx (10 digits starting with 0)
 * - +84xxxxxxxxx (international format)
 * - 84xxxxxxxxx (without +)
 */
export function validatePhoneNumber(phone: string): boolean {
  if (!phone || typeof phone !== "string") {
    return false
  }

  // Remove all spaces, dashes, and dots
  const cleaned = phone.replace(/[\s\-\.]/g, "")

  // Check if it's empty after cleaning
  if (cleaned.length === 0) {
    return false
  }

  // Vietnamese phone number patterns:
  // 1. Starts with 0 followed by 9 digits (10 digits total)
  // 2. Starts with +84 followed by 9 digits
  // 3. Starts with 84 followed by 9 digits
  const vietnamesePhonePattern = /^(0|\+84|84)[1-9][0-9]{8}$/

  return vietnamesePhonePattern.test(cleaned)
}

/**
 * Formats phone number for display
 * Converts to format: 0xxx xxx xxx
 */
export function formatPhoneNumber(phone: string): string {
  if (!phone) return ""
  
  const cleaned = phone.replace(/[\s\-\.]/g, "")
  
  // Remove country code if present
  let normalized = cleaned
  if (cleaned.startsWith("+84")) {
    normalized = "0" + cleaned.slice(3)
  } else if (cleaned.startsWith("84") && cleaned.length === 11) {
    normalized = "0" + cleaned.slice(2)
  }
  
  // Format as 0xxx xxx xxx
  if (normalized.length === 10 && normalized.startsWith("0")) {
    return `${normalized.slice(0, 4)} ${normalized.slice(4, 7)} ${normalized.slice(7)}`
  }
  
  return phone
}
