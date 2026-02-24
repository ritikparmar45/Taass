import { format, isToday, isYesterday, isThisYear } from "date-fns";

export function formatChatMessageTime(date: number) {
    const d = new Date(date);
    if (isToday(d)) {
        return format(d, "h:mm a");
    }
    if (isThisYear(d)) {
        return format(d, "MMM d, h:mm a");
    }
    return format(d, "MMM d, yyyy, h:mm a");
}
