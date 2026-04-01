import API from "./axios";

export const getHoldings = () => API.get("/holdings");
export const getPositions = () => API.get("/positions");
export const getOrders = () => API.get("/orders");
export const placeOrder = (data) => API.post("/orders", data);