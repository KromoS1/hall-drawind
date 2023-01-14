import * as _chai from 'chai';
import {calcCountCircleGrid, CoordinateCalcType} from "../../src/store/calculate/calculateGrid";

_chai.should();

const createCoordinate = (x: number, y: number): CoordinateCalcType => {
    return {
        xStart: 0,
        yStart: 0,
        xEnd: x,
        yEnd: y,
    }
}

describe('calculate count place in area for draw', () => {

    it('should be calc 1 place', function () {

        const counts = calcCountCircleGrid(createCoordinate(25,25));

        counts.countX.should.be.eq(1);
        counts.countY.should.be.eq(1);
    });

    it('should be calc 2 place in x and 2 place in y', function () {

        const counts = calcCountCircleGrid(createCoordinate(55,55));

        counts.countX.should.be.eq(2);
        counts.countY.should.be.eq(2);
    });

    it('should be calc 2 place in x and 2 place in y for negative coordinate', function () {

        const counts = calcCountCircleGrid(createCoordinate(-50,-50));

        counts.countX.should.be.eq(2);
        counts.countY.should.be.eq(2);
    });

})