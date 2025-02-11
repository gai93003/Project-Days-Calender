// This is a placeholder file which shows how you can define functions which can be used from both a browser script and a node script. You can delete the contents of the file once you have understood how it works.

export function getEventDate(event, year) {
    const monthNames = {
        "January": 0, "February": 1, "March": 2, "April": 3, "May": 4, "June": 5,
        "July": 6, "August": 7, "September": 8, "October": 9, "November": 10, "December": 11
    };

    const dayNames = {
        "Sunday": 0, "Monday": 1, "Tuesday": 2, "Wednesday": 3,
        "Thursday": 4, "Friday": 5, "Saturday": 6
    };

    let month = monthNames[event.monthName];
    let targetDay = dayNames[event.dayName];
    let occurrence = event.occurence;

    if (occurrence === "last") {
        let date = new Date(year, month + 1, 0);
        while (date.getDay() !== targetDay) {
            date.setDate(date.getDate() - 1);
        }
        return date;
    }

    let date = new Date(year, month, 1);
    while (date.getDay() !== targetDay) {
        date.setDate(date.getDate() + 1);
    }

    let occurrenceMap = { "first": 0, "second": 7, "third": 14 };
    if (occurrence in occurrenceMap) {
        date.setDate(date.getDate() + occurrenceMap[occurrence]);
    }

    return date;
};