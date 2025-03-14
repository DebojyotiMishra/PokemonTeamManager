const jwt = require("jsonwebtoken");
const auth = require("../../../middleware/auth");

describe("Auth Middleware", () => {
  let mockReq;
  let mockRes;
  let nextFunction;

  beforeEach(() => {
    mockReq = {
      header: jest.fn(),
    };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    nextFunction = jest.fn();
  });

  it("should add user to request object when valid token is provided", () => {
    const token = jwt.sign({ id: "123" }, process.env.JWT_SECRET || "test-secret");
    mockReq.header.mockReturnValue(`Bearer ${token}`);

    auth(mockReq, mockRes, nextFunction);

    expect(nextFunction).toHaveBeenCalled();
    expect(mockReq.user).toBeDefined();
    expect(mockReq.user.id).toBe("123");
  });

  it("should return 401 when no token is provided", () => {
    mockReq.header.mockReturnValue(null);

    auth(mockReq, mockRes, nextFunction);

    expect(mockRes.status).toHaveBeenCalledWith(401);
    expect(mockRes.json).toHaveBeenCalledWith({
      success: false,
      error: "No token, authorization denied",
    });
    expect(nextFunction).not.toHaveBeenCalled();
  });

  it("should return 401 when invalid token is provided", () => {
    mockReq.header.mockReturnValue("Bearer invalid-token");

    auth(mockReq, mockRes, nextFunction);

    expect(mockRes.status).toHaveBeenCalledWith(401);
    expect(mockRes.json).toHaveBeenCalledWith({
      success: false,
      error: "Token is not valid",
    });
    expect(nextFunction).not.toHaveBeenCalled();
  });
});
