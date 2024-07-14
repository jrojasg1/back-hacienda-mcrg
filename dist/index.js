"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
//config the .env file
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 8000;
app.get('/', (req, res) => {
    res.send("welcme");
});
app.get('/hello', (req, res) => {
    res.send("Hi julito Rojas!");
});
app.listen(port, () => {
    console.log(`running server at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map