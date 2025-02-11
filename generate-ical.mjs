// This is a placeholder file which shows how you can access functions and data defined in other files. You can delete the contents of the file once you have understood how it works.
// It can be run with `node`.

// import { getGreeting } from "./common.mjs";
// import daysData from "./days.json" with { type: "json" };

console.log(`{getGreeting()} - there are ${daysData.length} known days`);

import fs from "fs";
import daysData from "./days.json" with { type: "json" };
import { getEventDate } from "./common.mjs";

const formatDateToICS = (date) => {
    return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
};

const generateICS = (year) => {
    let icsContent = `BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//My Calendar//EN\n`;

    daysData.forEach(event => {
        const eventDate = getEventDate(event, year);
        icsContent += `BEGIN:VEVENT\n`;
        icsContent += `DTSTAMP:${formatDateToICS(new Date())}\n`;
        icsContent += `DTSTART;VALUE=DATE:${eventDate.toISOString().split("T")[0].replace(/-/g, "")}\n`;
        icsContent += `SUMMARY:${event.name}\n`;
        icsContent += `END:VEVENT\n`;
    });

    icsContent += `END:VCALENDAR`;

    return icsContent;
};

// Set year dynamically or use current year
const currentYear = new Date().getFullYear();
const icsData = generateICS(currentYear);

// Write to file
fs.writeFileSync("generated-days.ics", icsData);
console.log("✅ ICS file generated successfully.");
