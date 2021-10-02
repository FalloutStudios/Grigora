module.exports = () => {
    var date = new Date();
    var date_d = String(date.getDate()).padStart(2, '0');
    var date_m = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    var date_y = date.getFullYear();
    var date_mm = 'AM';
    var date_h = date.getHours();
        if(date_h >= 12) { date_mm = 'PM' }
        if(date_h > 12){
            date_h = date_h - 12;
        }
    var date_mi = date.getMinutes()
    var date_dmy = date_d + '/' + date_m + '/' + date_y;

    return {
        date: date,
        date_d: date_d,
        date_m: date_m,
        date_y: date_y,

        time_mi: date_mi,
        time_h: date_h,
        time_clock: date_mm,

        fullDate: date_dmy
    };
}