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

export interface ParsedMessage {
  attachments: Attachment[];
  headers: Headers;
  body: {
    html: string; // 'text/html' body parts, joined together separated by <br>\n
    text: string; // 'text/plain' body parts, joined together separated by \n
  },
  date?: Date;
  subject?: string,
  from?: string,
  to?: string,
  cc?: string,
  bcc?: string,
  'reply-to'?: string
}

export function parseMail(message: string): ParsedMessage;
