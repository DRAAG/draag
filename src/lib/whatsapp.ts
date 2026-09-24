import { WHATSAPP_NUMBER } from "@/data/products";

/**
 * Percent-encodes a message for a wa.me deep link.
 *
 * `encodeURIComponent` leaves `'`, `(` and `)` unescaped; DRAAG.CO's canonical
 * link format escapes them, so we tighten those up for a byte-for-byte match.
 */
function encodeMessage(message: string): string {
  return encodeURIComponent(message)
    .replace(/'/g, "%27")
    .replace(/\(/g, "%28")
    .replace(/\)/g, "%29")
    .replace(/!/g, "%21");
}

/**
 * Builds the exact pre-filled enquiry message required by DRAAG.CO:
 * "Hi, I'm interested in [Product Name] ([Brand]), Size: [Size], Colour: [Colour]. Please share more details."
 */
export function buildOrderMessage({
  productName,
  brand,
  size,
  color,
}: {
  productName: string;
  brand: string;
  size: string;
  color: string;
}): string {
  return `Hi, I'm interested in ${productName} (${brand}), Size: ${size}, Colour: ${color}. Please share more details.`;
}

/** wa.me deep link with the message percent-encoded, exactly as specified. */
export function whatsappOrderUrl(args: {
  productName: string;
  brand: string;
  size: string;
  color: string;
}): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeMessage(
    buildOrderMessage(args),
  )}`;
}

/** Generic WhatsApp link for nav / footer / contact enquiries. */
export function whatsappChatUrl(
  message = "Hi DRAAG.CO, I'd like to know more about your latest drops.",
): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeMessage(message)}`;
}
