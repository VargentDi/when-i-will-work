const express = require('express');

const request = require('supertest');
const app = require("../../server/index")

describe('POST Create User Wallet', () => {
    it('should create wallet for the user', () => {
        // code for testing the api
        request(app)
            .get("/v1/shifts")
            .expect(200)
            .then((response) => {
                expect(response.body.length).toBe(8);
            });
    });
});