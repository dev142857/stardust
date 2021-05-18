require("chai").should();
const {accounts, contract} = require('@openzeppelin/test-environment');
const {singletons} = require("@openzeppelin/test-helpers");

const Azimuth = contract.fromArtifact("AzimuthWrapper");
const Treasury = contract.fromArtifact("Treasury");

describe("Treasury", function () {
    const [registryFunder, creator, operator] = accounts;

    before(async function () {
        await singletons.ERC1820Registry(registryFunder);
        const azimuth = await Azimuth.new({from: creator});
        this.treasury = await Treasury.new(azimuth.address, {from: creator});
    });

    it("has no assets", async function () {
        (await this.treasury.getAssetCount()).should.be.bignumber.equal("0");
    });
});
