export class HttpStatusCode {
  private code_: number;
  private label_: string;

  code() {
    return this.code_;
  }

  label() {
    return this.label_;
  }

  constructor(pCode: number, pLabel: string) {
    this.code_ = pCode;
    this.label_ = pLabel;
  }
}
export const HttpStatusCodes = {
  OK: new HttpStatusCode(200, "OK"),
  Created: new HttpStatusCode(201, "Created"),

  BadRequest: new HttpStatusCode(401, "BadRequest"),
  InternalServerError: new HttpStatusCode(500, "InternalServerError")
}
