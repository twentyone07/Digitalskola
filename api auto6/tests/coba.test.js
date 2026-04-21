import fetch from "node-fetch";
import { expect } from "chai";
import Ajv from "ajv";
import { schema_createuser, schema_updateuser } from "./schema/reqresSchema.js";
const ajv = new Ajv();

describe("API Tests Suite", function () {
    const baseURL = "https://reqres.in";

    // 🔹 READ
    it("READ - Get list user", async function () {
        const response = await fetch(`${baseURL}/api/users?page=2`, {
            headers: {
                "x-api-key": "reqres_b3920b45d4b243418ec24d3681c107ef"
            },
            method: "GET",
        });

        expect(response.status, 'ada yg salah').to.equal(200);
    });

    // 🔹 CREATE
    it("CREATE - Create User Baru", async function () {
        const newPost = {
            name: "morpheus",
            job: "leader"
        };

        const response = await fetch(`${baseURL}/api/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": "reqres_b3920b45d4b243418ec24d3681c107ef"
            },
            body: JSON.stringify(newPost),
        });

        // validasi HTTP Status Code
        expect(response.status).to.equal(201);

        // validasi JSON Schema
        const data = await response.json();
        const validate = ajv.compile(schema_createuser);
        const valid = validate(data);

        expect(valid, 'validasi json schema ada yang salah').to.be.true;
    });

    it("UPDATE - Update User Baru", async function () {
        const updateData = {
            name: "morpheus",
            job: "leader"
        };

        const response = await fetch(`${baseURL}/api/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": "reqres_b3920b45d4b243418ec24d3681c107ef"
            },
            body: JSON.stringify(updateData),
        });

        // validasi HTTP Status Code
        expect(response.status).to.equal(201);

        // validasi JSON Schema
        const data = await response.json();
        const validate = ajv.compile(schema_updateuser);
        const valid = validate(data);

        expect(valid, 'validasi json schema ada yang salah').to.be.true;
    });

    it("DELETE - Delete User", async function () {
        const response = await fetch(`${baseURL}/api/users/2`, {
            headers: {
                "x-api-key": "reqres_b3920b45d4b243418ec24d3681c107ef"
            },
            method: "DELETE",
        });

        expect(response.status).to.equal(204);

    });
});