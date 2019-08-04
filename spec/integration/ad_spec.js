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
                description: "toothpaste"
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
        
        it("should return a status code 200 and all ads", (done) => {

            request.get(base, (err, res, body) => {
                expect(res.statusCode).toBe(200);
                expect(err).toBeNull();
                expect(body).toContain("Colgate");
                expect(body).toContain("toothpaste");
                done();
            });
        });
    });

    describe("GET /ads/new", () => {

        it("should render a new ad form", (done) => {
            request.get(`${base}new`, (err, res, body) => {
                expect(err).toBeNull();
                expect(body).toContain("New Ad");
                done();
            });
        });
    });

    describe("POST /ads/create", () => {
        const options = {
            url: `${base}create`,
            form: {
                title: "Hostess",
                description: "snacks"
            }
        };

        it("should create a new ad and redirect", (done) => {

            request.post(options,
                
                (err, res, body) => {
                    Ad.findOne({where: {title: "Hostess"}})
                    .then((ad) => {
                        expect(res.statusCode).toBe(303);
                        expect(ad.title).toBe("Hostess");
                        expect(ad.description).toBe("snacks");
                        done();
                    })
                    .catch((err) => {
                        console.log(err);
                        done();
                    });
                }
            );
        });
    });
})