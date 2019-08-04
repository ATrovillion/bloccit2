const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/ads/";

const sequelize = require("../../src/db/models/index").sequelize;
const Ad = require("../../src/db/models").Ad;

describe("routes : ads", () => {

    beforeEach((done) => {
        this.ad;
        sequelize.sync({force: true}).then((res) => {
            Ad.create({
                title: "Colgate",
                description: "White teeth"
            })
            .then((ad) => {
                this.ad = ad;
                done();
            })
            .catch((err) => {
                console.log(err);
                done();
            });
        });
    });
    
    describe("GET /ads", () => {
        
        it("should return status code 200 and all ads", (done) => {
            request.get(base, (err, res, body) => {
                expect(res.statusCode).toBe(200);
                expect(err).toBeNull();
                expect(body).toContain("Colgate");
                expect(body).toContain("White teeth");
                done();
            });
        });
    });
})