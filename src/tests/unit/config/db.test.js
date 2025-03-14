const mongoose = require("mongoose");
const connectDB = require("../../../config/db");

jest.mock("mongoose");

describe("Database Connection", () => {
  it("should connect to database successfully", async () => {
    mongoose.connect.mockResolvedValue(true);
    
    await connectDB();
    
    expect(mongoose.connect).toHaveBeenCalled();
  });

  it("should handle database connection errors", async () => {
    const consoleErrorSpy = jest.spyOn(console, "error");
    mongoose.connect.mockRejectedValue(new Error("Connection failed"));
    
    await connectDB();
    
    expect(consoleErrorSpy).toHaveBeenCalled();
    expect(consoleErrorSpy).toHaveBeenCalledWith("Error: Connection failed");
  });
}); 