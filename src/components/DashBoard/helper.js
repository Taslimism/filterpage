import moment from 'moment'

export function filterByLastWeek(launches) {
    const todayDate = new Date()
    const startDayOfPrevWeek = moment(todayDate).subtract(1, 'week').startOf('week').format('LLLL');
    const lastDayOfPrevWeek = moment(todayDate).subtract(1, 'week').endOf('week').format('LLLL');
    const startDay = new Date(startDayOfPrevWeek);
    const endDay = new Date(lastDayOfPrevWeek);
    const start = `${startDay.getFullYear()},${startDay.getMonth() + 1},${startDay.getDate()}`;
    const end = `${endDay.getFullYear()},${endDay.getMonth() + 1},${endDay.getDate()}`;

    return [start, end];
}

export function filterByLastMonth(launches) {
    const todayDate = new Date()
    const startDayOfPrevMonth = moment(todayDate).subtract(1, 'month').startOf('month').format('LLLL')
    const lastDayOfPrevMonth = moment(todayDate).subtract(1, 'month').endOf('month').format('LLLL')

    const startDay = new Date(startDayOfPrevMonth);
    const endDay = new Date(lastDayOfPrevMonth);
    const start = `${startDay.getFullYear()},${startDay.getMonth() + 1},${startDay.getDate()}`;
    const end = `${endDay.getFullYear()},${endDay.getMonth() + 1},${endDay.getDate()}`;

    return [start, end];
}

export function filterByLastYear(launches) {
    const todayDate = new Date();
    const startDayOfPrevYear = moment(todayDate).subtract(1, 'year').startOf('month').format('LLLL')
    const lastDayOfPrevYear = moment(todayDate).subtract(1, 'year').endOf('year').format('LLLL')

    const startDay = new Date(startDayOfPrevYear);
    const endDay = new Date(lastDayOfPrevYear);
    const start = `${startDay.getFullYear()},${startDay.getMonth() + 1},${startDay.getDate()}`;
    const end = `${endDay.getFullYear()},${endDay.getMonth() + 1},${endDay.getDate()}`;

    return [start, end];
}
