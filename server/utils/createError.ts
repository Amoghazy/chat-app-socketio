class createError extends Error {
  constructor() {
    super();
  }
  createError(statusCode: number, message: string, statusText?: string) {
    return { statusCode, statusText, message };
  }
}

export default new createError();
