export type Headers = { [key: string]: string[] };

interface Attachment {
  content: Uint8Array;
  headers: Headers;
  size: number;
  fileName?: string;
  contentType?: string;
  contentDisposition?: string;
  contentId?: string;
}

type EmailAddress = { name: string, email: string };

export interface ParsedMessage {
  attachments: Attachment[];
  headers: Headers;
  body: {
    html: string; // 'text/html' body parts, joined together separated by <br>\n
    text: string; // 'text/plain' body parts, joined together separated by \n
  },
  date?: Date;
  subject?: string,
  from?: EmailAddress,
  to?: EmailAddress[],
  cc?: EmailAddress[],
  bcc?: EmailAddress[],
  'reply-to'?: EmailAddress
}

export function parseMail(message: string): ParsedMessage;
