import * as objectMapper from "object-mapper";

/**
 * Maps the keys of each object in the original data array to new key fields
 * based on the provided mapping configuration.
 *
 * @param {Array<Record<string, any>>} originalData - The array of objects to be transformed.
 * @param {Record<string, string>} mapConfig - The mapping configuration object where keys represent the original field names
 *                                             and values represent the new field names.
 * @returns {Array<Record<string, any>>} - A new array of objects with mapped key fields.
 */
export const mapObjectsKeys = (
  originalData: Array<Record<string, any>>,
  mapConfig: Record<string, string> | Array<Record<string, string>>
): Array<Record<string, any>> => {
  return originalData.map((item) => objectMapper(item, mapConfig));
};

export const mapObjectKeys = (
  originalData: Record<string, any>,
  mapConfig: Record<string, string> | Array<Record<string, string>>,
  listFieldsNull: string[] = []
): Array<Record<string, any>> => {
  if (!originalData) {
    return null;
  }

  // Perform the mapping
  const mappedData = objectMapper(originalData, mapConfig);

  // Check for missing keys and add them with null values
  const missingKeys = listFieldsNull.filter(
    (key) => !Object.keys(mappedData).includes(key)
  );
  // Add missing keys with null values
  missingKeys.forEach((key) => {
    mappedData[key] = null;
  });

  return mappedData;
};
