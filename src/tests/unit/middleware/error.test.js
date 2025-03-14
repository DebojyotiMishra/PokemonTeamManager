const errorHandler = require("../../../middleware/error");

describe("Error Handler Middleware", () => {
  let mockReq;
  let mockRes;
  let nextFunction;

  beforeEach(() => {
    mockReq = {};
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    nextFunction = jest.fn();
  });

  it("should handle validation errors", () => {
    const err = new Error("Validation failed");
    err.name = "ValidationError";

    errorHandler(err, mockReq, mockRes, nextFunction);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({
      success: false,
      error: "Validation failed"
    });
  });

  it("should handle 404 errors", () => {
    const err = new Error("Not found");
    err.statusCode = 404;

    errorHandler(err, mockReq, mockRes, nextFunction);

    expect(mockRes.status).toHaveBeenCalledWith(404);
  });
}); 