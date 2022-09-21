/**
 * WebException 非捕获错误
 *
 * @author luoage@msn.cn
 */
module.exports = class extends Error {
  constructor(msg, code, status = 200) {
    super(msg);
    this.status = status;
    this.code = code;
  }

  getCode() {
    return this.code;
  }
}
