export const isAlphabetical = (word: string): boolean => {
  const alphabeticalRegex = /^[a-zA-Z]+$/;
  return alphabeticalRegex.test(word);
};

export const getAge = (date: string): number => {
  const birthDate = new Date(date);
  const currentDate = new Date();

  let age = currentDate.getFullYear() - birthDate.getFullYear();

  if (
    currentDate.getMonth() < birthDate.getMonth() ||
    (currentDate.getMonth() === birthDate.getMonth() &&
      currentDate.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
};

export const isValidPassword = (password: string): boolean => {
  return /^[A-Za-z0-9!@#$%^&*()_+\-=\[\]{}|;:'",.<>\/?`]+$/.test(password);
};

export const isAllowedFileExtension = (fileName: string): boolean => {
  const allowedExtensions = [".png", ".jpg", ".jpeg"];
  const fileExtension = fileName
    .toLowerCase()
    .slice(((fileName.lastIndexOf(".") - 1) >>> 0) + 2);

  return allowedExtensions.includes(fileExtension);
};

export const isFileValidType = (file: File | null): boolean => {
  if (!file) {
    return true;
  }

  const fileName = file.name;
  const allowedExtensions = ["jpg", "jpeg", "png"];
  const extension = fileName.split(".").pop()?.toLowerCase() || "";

  return allowedExtensions.includes(extension);
};

export const isValidEmailFormat = (email: string): boolean =>
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

export function calculateDuration(
  start: string,
  finish: string
): string | null {
  const startTime = new Date(start.replace(" ", "T"));
  const finishTime = new Date(finish.replace(" ", "T"));

  if (isNaN(startTime.getTime()) || isNaN(finishTime.getTime())) {
    return null;
  }

  const duration = finishTime.getTime() - startTime.getTime();

  const hours = Math.floor(duration / (1000 * 60 * 60));
  const minutes = Math.floor((duration / (1000 * 60)) % 60);

  return `${hours}h ${minutes}m`;
}

export const calculateTotalDays = (
  checkInDate: string,
  checkOutDate: string
): number => {
  const oneDay: number = 24 * 60 * 60 * 1000;
  const startDate: Date = new Date(checkInDate);
  const endDate: Date = new Date(checkOutDate);
  const totalDays: number = Math.round(
    Math.abs((startDate.getTime() - endDate.getTime()) / oneDay)
  );
  return totalDays;
};
