/**
 * Generate email dot-variation aliases for any provider
 * 
 * Rules:
 * - Insert at most one '.' per gap between original characters
 * - No adjacent '.' (no john..doe)
 * - No leading/trailing '.'
 * - Max dots configurable (default 2)
 */

export function generateVariants(
  baseLocal: string,
  domain: string,
  maxDots: number = 2,
  maxVariants: number = 20
): string[] {
  const n = baseLocal.length;
  
  if (n < 2) {
    return [`${baseLocal}@${domain}`];
  }

  const variants: string[] = [];
  const combinations = Math.pow(2, n - 1); // 2^(n-1) combinations

  for (let i = 0; i < combinations; i++) {
    // Early exit if we've reached the limit
    if (variants.length >= maxVariants) {
      break;
    }
    
    let dotCount = 0;
    let result = baseLocal[0];

    // Check each gap (n-1 gaps for n characters)
    for (let j = 0; j < n - 1; j++) {
      // Check if bit j is set (should insert dot after position j)
      const shouldInsertDot = (i >> j) & 1;
      
      if (shouldInsertDot) {
        dotCount++;
        result += '.';
      }
      
      result += baseLocal[j + 1];
    }

    // Only include if dot count is within limit
    if (dotCount <= maxDots) {
      variants.push(`${result}@${domain}`);
    }
  }

  return variants;
}

/**
 * Extract local part from full email
 * Input: "john.doe@gmail.com" → Output: "johndoe"
 */
export function extractLocalPart(email: string): string {
  const [local] = email.split('@');
  // Remove any dots that user may have included
  return local.replace(/\./g, '');
}

/**
 * Validate email address (any provider)
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i;
  return emailRegex.test(email);
}

/**
 * Extract domain from email address
 */
export function extractDomain(email: string): string {
  const [, domain] = email.split('@');
  return domain;
}

/**
 * Shuffle array (Fisher-Yates)
 */
export function shuffle<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
