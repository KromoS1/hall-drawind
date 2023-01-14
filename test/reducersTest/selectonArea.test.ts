import * as _chai from 'chai';
import selectionAreaReducer, {
    resetParamSelection,
    SelectionAreaReducerType, setIsDrawGrid,
    setIsSelection
} from "../../src/store/reducers/selectionAreaReducer";
import {store} from "../../src/store/store";

_chai.should();


describe('selection area reduser',() => {

    const initState: SelectionAreaReducerType =  {
        isSelection: false,
        isDrawGrid: false,
    }

    it('should set is selection param', function () {

        const endState = selectionAreaReducer(initState,setIsSelection({isSelection: true}));

        endState.isSelection.should.be.eq(true);
    });

    it('should set is isDrawGrid param', function () {

        const endState = selectionAreaReducer(initState,setIsDrawGrid({isDrawGrid: true}));

        endState.isDrawGrid.should.be.eq(true);
    });

    it('should reset all params', function () {

        const endState = selectionAreaReducer(initState,resetParamSelection());

        endState.isSelection.should.be.eq(false);
        endState.isDrawGrid.should.be.eq(false);
    });
})