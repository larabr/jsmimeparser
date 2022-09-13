import { expect } from "chai";
import { read_file } from "./utils";
import { parseMail } from "../lib/mailParser";

const toBase64 = uInt8Array => btoa(String.fromCharCode(...uInt8Array));

describe('mail parser', () => {
  it('correctly parses multipart message with both HTML and plain text data', async () => {
    const eml = await read_file("multipart-complex1");
    const { body, attachments } = parseMail(eml);

    expect(body.html).to.equal('<html><head>This part should be returned.</head></html>\n');
    expect(body.text).to.equal("This part shouldn't.\n\nNeither should this part!\n");

    expect(toBase64(attachments[0].content)).to.equal('VGhpcyBpc24ndCByZWFsbHkgYW4gYXBwbGljYXRpb24vb2N0ZXQtc3RyZWFtLiA7KQ==');
    expect(attachments[0].contentType).to.equal('application/octet-stream');
    expect(attachments[0].fileName).to.equal('');

    expect(attachments[1].contentType).to.equal('image/png');
    expect(toBase64(attachments[1].content)).to.equal('TmVpdGhlciBpcyB0aGlzIGFuIGltYWdlL3BuZy4=');
    expect(attachments[1].fileName).to.equal('');
  });

  it('correctly parses SHIFT-JIS body with png attachment', async () => {
    const expectedText = 'Portable Network Graphics（ポータブル・ネットワーク・グラフィックス、PNG）はコンピュータでビットマップ画像を扱うファイルフォーマットである。圧縮アルゴリズムとしてDeflateを採用している、圧縮による画質の劣化のない可逆圧縮の画像ファイルフォーマットである。\n';
    const expectedAttachmentContent = 'iVBORw0KGgoAAAANSUhEUgAAAIAAAABECAIAAADGJao+AAAAwklEQVR4Xu3UgQbDMBRA0bc03f//b7N0VuqJEmwoc+KqNEkDh9b+2HuJu1KNO4f+AQCAAAAQAAACAEAAAAgAAAEAIAAABACAAAAQAAACAEAAAAgAAAEAIAAAANReamRLlPWYfNH0klxcPs+cP3NxWF+vi3lb7pa2R+vx6tHOtuN1O+a5lY3HzgM5ya/GM5N7ZjfPq7/5yS8IgAAAEAAAAgBAAAAIAAABACAAAAQAgAAAEAAAAgBAAAAIAAABACAAAIw322gDIPvtlmUAAAAASUVORK5CYII=';

    const eml = await read_file("shift-jis-image");
    const { body, subject, attachments: [attachment] } = parseMail(eml);

    expect(body.text).to.equal(expectedText);
    expect(subject).to.equal('Shift-JIS and PNG test');
    expect(toBase64(attachment.content)).to.equal(expectedAttachmentContent);
    expect(attachment.size).to.equal(251);
    expect(attachment.contentType).to.equal('image/png');
    expect(attachment.fileName).to.equal('');
  });
});