import path from "node:path";

/**
 * Generate the log file name based on the current date.
 * Logs are stored in the './logs' directory with a naming convention like 'access_YYYY-MM-DD.log'.
 * @returns {string} The full path to the log file.
 */
export const generateLogFileName = (): string => {
    const currentDate = new Date().toISOString().slice(0, 10);
    return `access_${currentDate}.log`;
};
