function toLocalISOString(input: string | Date) {
  const date = new Date(input);
  const tzOffset = date.getTimezoneOffset() * 60 * 1000;
  const localTime = new Date(date.getTime() - tzOffset);
  return localTime.toISOString();
}
// Dùng gửi API, format thành string locale rồi gửi đúng string xuống
function toLocalTimeString(input: string | Date) {
  return new Date(input).toISOString().replace("Z", "");
}

function toLocalTimeZone(input: string | Date) {
  const date = new Date(input);
  // offset của máy (phút), ví dụ VN là -420 (tức UTC+7)
  const tzOffsetMinutes = date.getTimezoneOffset();
  // Trừ đi offset để ra giờ local
  const localTimestamp = date.getTime() - tzOffsetMinutes * 60 * 1000;
  const localDate = new Date(localTimestamp);

  // Định dạng lại ISO
  const isoString = localDate.toISOString();

  // Chèn offset dưới dạng ±HH:MM
  const sign = tzOffsetMinutes > 0 ? "-" : "+";
  const offsetHours = String(
    Math.floor(Math.abs(tzOffsetMinutes) / 60)
  ).padStart(2, "0");
  const offsetMinutes = String(Math.abs(tzOffsetMinutes) % 60).padStart(2, "0");

  return isoString.replace("Z", `${sign}${offsetHours}:${offsetMinutes}`);
}

// make time end date
function makeTimeEndDate(date: Date) {
  const endDate = new Date(date);
  endDate.setHours(23, 59, 59, 999);
  return endDate;
}

// make time start date
function makeTimeStartDate(date: Date) {
  const startDate = new Date(date);
  startDate.setHours(0, 0, 0, 0);
  return startDate;
}

function formatDateTime(dateString: string): string {
  if (!dateString) return "";
  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // tháng tính từ 0
  const year = date.getFullYear();

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${day}/${month}/${year} ${hours}:${minutes}`;
}

export const DateHelper = {
  toLocalISOString,
  toLocalTimeZone,
  makeTimeEndDate,
  makeTimeStartDate,
  toLocalTimeString,
  formatDateTime,
};
