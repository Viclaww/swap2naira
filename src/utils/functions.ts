export const getFirstField = (data: { [x: string]: unknown }): string => {
  if (data) {
    const keys = Object.keys(data);
    if (keys.length > 0) {
      return data[keys[0]] as string;
    }
  }
  return "";
};

export const saveCookie = (name: string, value: string, days: number) => {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = `; expires=${date.toUTCString()}`;
  }
  document.cookie = `${name}=${value || ""}${expires}; path=/`;
  localStorage.setItem(name, value);
};

export const getCookie = (name: string) => {
  const nameEQ = `${name}=`;
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};
export const validateNumberInput = (
  oldinput: number,
  input: string
): number => {
  const regex = /^[0-9]+$/;
  return regex.test(input) ? parseInt(input) : oldinput;
};

export const capitalizeText = (text: string): string => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

export function addCommasToMonetary(amount: string) {
  // Check if amount is null or undefined
  if (amount == null) return "";

  // Convert amount to string and split integer and decimal parts
  const parts = amount.toString().split(".");
  let integerPart = parts[0];
  const decimalPart = parts.length > 1 ? "." + parts[1] : "";

  // Add commas to the integer part
  integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // Return the formatted amount
  return integerPart + decimalPart;
}

export const outsideClick = (
  e: MouseEvent,
  element: HTMLElement | null,
  close: () => void
) => {
  const target = e.target as HTMLElement;
  if (element && !element.contains(target)) {
    close();
  }
};
