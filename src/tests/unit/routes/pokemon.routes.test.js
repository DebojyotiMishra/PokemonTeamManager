const router = require("../../../routes/pokemon");

describe("Pokemon Routes", () => {
  it("should have GET /api/pokemon route", () => {
    const routes = router.stack
      .filter(layer => layer.route)
      .map(layer => ({
        path: layer.route.path,
        method: Object.keys(layer.route.methods)[0]
      }));

    expect(routes).toContainEqual({
      path: "/",
      method: "get"
    });
  });

  it("should have protected routes", () => {
    const protectedRoutes = router.stack
      .filter(layer => layer.route)
      .filter(layer => {
        return layer.route.stack.some(stack => 
          stack.name === "auth" || stack.name === "authenticate"
        );
      });

    expect(protectedRoutes.length).toBeGreaterThan(0);
  });
}); 