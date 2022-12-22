import * as _chai from 'chai';
import {createArraysPointRegion} from "../src/store/utils";

_chai.should();

describe('createArraysPointRegion', () => {

    it('should start.x & start.y < end.x & end.y', function () {

        const start = {x:1, y: 1};
        const end = {x: 5, y: 5};

        let res = createArraysPointRegion(start, end);

        res.should.have.property('pointsX').to.be.a('array').with.lengthOf(5);
        res.pointsX.should.to.be.contain(1).contain(2).contain(5);
        res.should.have.property('pointsY').to.be.a('array').with.lengthOf(5);
        res.pointsY.should.to.be.contain(1).contain(2).contain(5);
    });

    it('should start.x & start.y > end.x & end.y', function () {

        const start = {x:10, y: 10};
        const end = {x: 5, y: 5};

        let res = createArraysPointRegion(start, end);

        res.should.have.property('pointsX').to.be.a('array').with.lengthOf(6);
        res.pointsX.should.to.be.contain(5).contain(10).not.contain(2);
        res.should.have.property('pointsY').to.be.a('array').with.lengthOf(6);
        res.pointsY.should.to.be.contain(5).contain(10).not.contain(2);
    });

    it('should start.x > end.x, and start.y < end.y', function () {

        const start = {x:5, y: 1};
        const end = {x: 1, y: 5};

        let res = createArraysPointRegion(start, end);

        res.should.have.property('pointsX').to.be.a('array').with.lengthOf(5);
        res.pointsX.should.to.be.contain(1).contain(2).contain(5);
        res.should.have.property('pointsY').to.be.a('array').with.lengthOf(5);
        res.pointsY.should.to.be.contain(1).contain(2).contain(5);
    });

    it('should start.x < end.x, and start.y > end.y', function () {

        const start = {x:1, y: 1};
        const end = {x: 5, y: 10};

        let res = createArraysPointRegion(start, end);

        res.should.have.property('pointsX').to.be.a('array').with.lengthOf(5);
        res.pointsX.should.to.be.contain(1).contain(2).contain(5);
        res.should.have.property('pointsY').to.be.a('array').with.lengthOf(10);
        res.pointsY.should.to.be.contain(1).contain(5).contain(10);
    });

    it('should start.x - start.y > end.x - end.y', function () {

        const start = {x:1, y: 1};
        const end = {x: 5, y: 10};

        let res = createArraysPointRegion(start, end);

        res.should.have.property('pointsX').to.be.a('array').with.lengthOf(5);
        res.pointsX.should.to.be.contain(1).contain(2).contain(5);
        res.should.have.property('pointsY').to.be.a('array').with.lengthOf(10);
        res.pointsY.should.to.be.contain(1).contain(5).contain(10);
    });


    it('when start.x value negative ', function () {

        const start = {x:-5, y: -5};
        const end = {x: 5, y: 5};

        let res = createArraysPointRegion(start, end);

        res.should.have.property('pointsX').to.be.a('array').with.lengthOf(11);
        res.pointsX.should.to.be.contain(-5).contain(5)
        res.should.have.property('pointsY').to.be.a('array').with.lengthOf(11);
        res.pointsY.should.to.be.contain(-5).contain(5)
    });

})


