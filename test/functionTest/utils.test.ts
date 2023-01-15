import * as _chai from 'chai';
import {
    cacheMiddleColumnPlace,
    calcSidesTriangle,
    changeCurveForPlace,
    changeSizeIntervalPlaces,
    checkMaxColumnOrRowInSector,
    checkNameFigureForNumber,
    checkSizeInterval,
    createArraysPointRegion,
    createEllipse,
    createRect,
    createText, onChangeInput,
    searchCenterCircle,
} from "../../src/store/utils";
import {PlaceType} from "../../src/store/reducers/sectorsReducer";
import {createCirclesForGrid} from "../../src/store/calculate/calculateGrid";
import {CountCirclesDrawType} from "../../src/components/main/content/layers/commonLayer/selectionArea/SelectionAreaGrid";
import {Figures} from "../../src/store/mainType";
import {SIZE_CIRCLE} from "../../src/components/figures/sectors/cacheCircle";
import {ChangeEvent} from "react";

_chai.should();

const createPlaces = async (coordinate: {xStart: number, yStart: number}, countCircleGrid: CountCirclesDrawType): Promise<PlaceType[]> => {
    return createCirclesForGrid(coordinate, countCircleGrid);
}

describe('should be creates figure', () => {

    const move = {x: 200, y: 200};
    const mouseDown = {x: 100, y: 100};

    it('should be creates figure', function () {

        const rect = createRect(move, mouseDown);

        rect.should.be.property('x').to.eq(100);
        rect.should.be.property('w').to.eq(100);
        rect.should.be.property('typeFigure').to.eq(Figures.RECT);
    });

    it('should be create ellipse', function () {

        const ellipse = createEllipse(move, mouseDown);

        ellipse.should.be.property('x').to.eq(100);
        ellipse.should.be.property('y').to.eq(100);
        ellipse.should.be.property('radiusX').to.eq(100);
        ellipse.should.be.property('radiusY').to.eq(100);
    });

    it('should be create text', function () {

        const text = createText(mouseDown);

        text.should.be.property('text').a('string');
        text.should.be.property('x').to.eq(100);
        text.should.be.property('y').to.eq(100);
    });
})

it('should return boolean value from object update for Figure', function () {

    const name = checkNameFigureForNumber('x');

    name.should.be.eq(true);
});

describe('check size interval for place in sector', async () => {

    it('should returns intervals for places 1r-1c', async function () {

        const places = await createPlaces({xStart:100, yStart: 100}, {countX: 1, countY: 1});

        const {horizontal, vertical} = checkSizeInterval(places);

        horizontal.should.be.eq(5);
        vertical.should.be.eq(5);
    });

    it('should returns intervals for places 2r-2c', async function () {

        const places = await createPlaces({xStart:100, yStart: 100}, {countX: 2, countY: 2});

        const {horizontal, vertical} = checkSizeInterval(places);

        horizontal.should.be.eq(5);
        vertical.should.be.eq(5);
    });
})

describe('check max column and row in sector', async () => {

    const places = await createPlaces({xStart:100, yStart: 100}, {countX: 3, countY: 1});

    it('should return 0 rows for empty sector', function () {

        const rows = checkMaxColumnOrRowInSector([], 'numRow');

        rows.should.be.eq(0);
    });

    it('should return 0 columns for empty sector', function () {

        const columns = checkMaxColumnOrRowInSector([], 'numCol');

        columns.should.be.eq(0);
    });

    it('should return numbers rows for sector', function () {

        const columns = checkMaxColumnOrRowInSector(places, 'numRow');

        columns.should.be.eq(1);
    });

    it('should return numbers columns for sector', function () {

        const columns = checkMaxColumnOrRowInSector(places, 'numCol');

        columns.should.be.eq(3);
    });
})

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

describe('check array center places for sector', async () => {

    const places = await createPlaces({xStart:100, yStart: 100}, {countX: 3, countY: 2});

    it('should ', function () {

        const columns = cacheMiddleColumnPlace(places, 2);

        columns.should.be.property('1').property('numRow').to.eq(1);
        columns.should.be.property('2').property('numRow').to.eq(2);
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

describe('change curve for places count even', async () => {

    const places = await createPlaces({xStart:100, yStart: 100}, {countX: 4, countY: 1});
    const oldPlace = [...places];
    const curve = 5;

    it('should be change positive curve for places', async function () {

        const centerPlaces = searchCenterCircle(places, 4);

        for (let i = 0; i < places.length; i++) {

            const placeCache = oldPlace[i];
            const place = places[i];

            const triangle = calcSidesTriangle(centerPlaces[place.numRow], placeCache, curve);

            places[i] = changeCurveForPlace(placeCache, curve, [2,3], triangle, centerPlaces);
        }

        places[0].should.be.property('x').to.eq(110.14);
        places[0].should.be.property('y').to.eq(106.73);
        places[3].should.be.property('x').to.eq(184.86);
        places[3].should.be.property('y').to.eq(106.73);
    });

    it('should be change negative curve for places', async function () {

        const centerPlaces = searchCenterCircle(places, 4);

        for (let i = 0; i < places.length; i++) {

            const placeCache = oldPlace[i];
            const place = places[i];

            const triangle = calcSidesTriangle(centerPlaces[place.numRow], placeCache, curve);

            places[i] = changeCurveForPlace(placeCache, -curve, [2,3], triangle, centerPlaces);
        }

        places[0].should.be.property('x').to.eq(110.14);
        places[0].should.be.property('y').to.eq(110);
        places[3].should.be.property('x').to.eq(184.86);
        places[3].should.be.property('y').to.eq(110);
    });

})

describe('change curve for places count odd', async () => {

    const places = await createPlaces({xStart:100, yStart: 100}, {countX: 3, countY: 1});
    const oldPlace = [...places];
    let curve = 5;

    it('should be change positive curve for places', async function () {

        const centerPlaces = searchCenterCircle(places, 3);

        for (let i = 0; i < places.length; i++) {

            const placeCache = oldPlace[i];
            const place = places[i];

            const triangle = calcSidesTriangle(centerPlaces[place.numRow], placeCache, curve);

            places[i] = changeCurveForPlace(placeCache, curve, [2], triangle, centerPlaces);
        }

        places[0].should.be.property('x').to.eq(110.1);
        places[0].should.be.property('y').to.eq(107.82);
        places[2].should.be.property('x').to.eq(159.9);
        places[2].should.be.property('y').to.eq(107.82);
    });

    it('should be change negative curve for places', async function () {

        const centerPlaces = searchCenterCircle(places, 3);

        for (let i = 0; i < places.length; i++) {

            const placeCache = oldPlace[i];
            const place = places[i];

            const triangle = calcSidesTriangle(centerPlaces[place.numRow], placeCache, curve);

            places[i] = changeCurveForPlace(placeCache, -curve, [2], triangle, centerPlaces);
        }

        places[0].should.be.property('x').to.eq(110.1);
        places[0].should.be.property('y').to.eq(110);
        places[2].should.be.property('x').to.eq(159.9);
        places[2].should.be.property('y').to.eq(110);
    });
})

describe('change size interval between places', async () => {

    const places = await createPlaces({xStart:100, yStart: 100}, {countX: 3, countY: 1});

    it('should be changed', function () {

        const changedPlaces = changeSizeIntervalPlaces(places, 1, (SIZE_CIRCLE / 2), 'numCol', "x")

        changedPlaces[0].should.be.property('x').to.eq(places[0].x);
        changedPlaces[1].should.be.property('x').to.eq(111);
    });
})

describe('function change for inputs', () => {

    it('should return value input', function () {

        let valueResult = 0;
        let nameResult = '';

        const myEvent: ChangeEvent<HTMLInputElement> = {
            // @ts-ignore
            target: {
                value: '10',
                name: 'rotation',
            }
        }

        const callback = (value: number, name: string,) => {

            nameResult = name;
            valueResult = value;
        }

        onChangeInput(myEvent, callback);

        valueResult.should.be.eq(10);
    });
})
