import * as _chai from 'chai';
import {calcSidesTriangle, createArraysPointRegion, searchCenterCircle} from "../src/store/utils";
import {PlaceType} from "../src/store/reducers/sectorsReducer";
import {createCirclesForGrid} from "../src/store/calculate/calculateGrid";
import {CountCirclesDrawType} from "../src/components/main/content/layers/commonLayer/selectionArea/SelectionAreaGrid";

_chai.should();

const createPlaces = async (coordinate: {xStart: number, yStart: number}, countCircleGrid: CountCirclesDrawType): Promise<PlaceType[]> => {
    return createCirclesForGrid({xStart:100, yStart: 100}, {countX: 3, countY: 1});
}

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

describe('curve place' ,() => {

    let initPlaces: PlaceType[] = [];

    before(() => {
        createPlaces({xStart:100, yStart: 100}, {countX: 3, countY: 1}).then(res => {

            initPlaces = res;
        })
    })

    it('should be search center', function () {
        let res = searchCenterCircle(initPlaces,3);

        res.should.be.property('1').to.be.property('x').to.be.equal(135);
    });

    it('should be return sides right triangle place in start sector', function () {
        let triangle = calcSidesTriangle({x: 122.5, y: 10}, initPlaces[0],10);

        triangle.should.be.property('katetA').to.be.eq(12.31);
        triangle.should.be.property('katetB').to.be.eq(2.17);
    });
})

