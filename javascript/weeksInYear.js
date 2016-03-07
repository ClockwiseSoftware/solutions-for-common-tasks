function getWeekNumber(d) {
    // Copy date so don't modify original
    d = new Date(+d);
    d.setHours(0,0,0,0);
    // Set to nearest Thursday: current date + 4 - current day number
    // Make Sunday's day number 7
    d.setDate(d.getDate() + 4 - (d.getDay()||7));
    // Get first day of year
    var yearStart = new Date(d.getFullYear(),0,1);
    // Calculate full weeks to nearest Thursday
    var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7)
    // Return array of year and week number
    return [d.getFullYear(), weekNo];
}

function weeksInYear(year) {
  var d = new Date(year, 11, 31);
  var week = getWeekNumber(d)[1];
  return week == 1? getWeekNumber(d.setDate(24))[1] : week;
}

alert(weeksInYear(2015)); // 53

// for sorting by week number, using orderBy filter in angularJS use something like this 

<div class="test" ng-controller="Ctrl">
  <div ng-repeat="item in items | orderBy:['-year','-week']">{{item.week}},{{item.year}}</div>
<div>
