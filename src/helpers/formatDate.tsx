import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

const formatDate = (date: Date | string): string => {
	dayjs.extend(utc);
	dayjs.extend(timezone);
	return dayjs.tz(date, "UTC").tz(dayjs.tz.guess()).format("DD/MM/YY HH:mm");
};

const formatOnlyDate = (date: Date | string): string => {
	dayjs.extend(utc);
	dayjs.extend(timezone);
	return dayjs.tz(date, "UTC").tz(dayjs.tz.guess()).format("DD/MMMM/YYYY");
};

export { formatDate, formatOnlyDate };
