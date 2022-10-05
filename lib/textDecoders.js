import { decode as decodeUtf7, imapDecode as decodeUtf7Imap } from 'emailjs-utf7';
import { uint8ArrayToString } from './utils';

class UTF7TextDecoder {
  constructor() {
    this.collectInput = '';
    this.decodeString = decodeUtf7;
  }
  decode(input, options = {}) {
    let more = options.stream;
    // There are cases where this is called without input, to flush the collected input
    if (input) {
      this.collectInput += uint8ArrayToString(input);
    }
    if (more) {
      return "";
    }
    return this.decodeString(this.collectInput);
  }
}

class UTF7ImapTextDecoder extends UTF7TextDecoder {
  constructor() {
    super();
    this.decodeString = decodeUtf7Imap;
  }
}

/* exported MimeTextDecoder */
export function MimeTextDecoder(charset, options) {
  switch (charset.toLowerCase()) {
    case "utf-7":
      return new UTF7TextDecoder();
    case "utf-7-imap":
      return new UTF7ImapTextDecoder();
    case "cp932":
      // https://bugzilla.mozilla.org/show_bug.cgi?id=1511950
      return new TextDecoder("shift_jis", options);
    default:
      return new TextDecoder(charset, options);
  }
}
