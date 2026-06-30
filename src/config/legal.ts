/** Legal entity data — placeholders until verified. Empty fields are not shown on site. */
export const legal = {
  legalEntityName: "",
  registrationNumber: "",
  vatNumber: "",
  dataControllerDetails: "",
} as const;

export function hasLegalEntityData(): boolean {
  return Boolean(
    legal.legalEntityName ||
      legal.registrationNumber ||
      legal.vatNumber ||
      legal.dataControllerDetails,
  );
}
