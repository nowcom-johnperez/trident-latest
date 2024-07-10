export const hasAccess = async (store: any, schema: string) => {
  try {
    return !!store.getters['management/schemaFor'](schema)
  } catch (error) {
    console.error(`You don't have access to`, schema, error);
    return false
  }
}