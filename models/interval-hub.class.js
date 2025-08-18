export class IntervalHub{
    // #region ATTRIBUTES
    static ALLINTERVALS= [];
    // #endregion

    // #region METHODS
    static startInterval(func, timer){
        const newInterval = setInterval(func, timer);
        IntervalHub.ALLINTERVALS.push(newInterval);
    }

    static stopAllIntervals(){
        IntervalHub.ALLINTERVALS.forEach(clearInterval);
        IntervalHub.ALLINTERVALS = [];
    }
    // #endregion
}