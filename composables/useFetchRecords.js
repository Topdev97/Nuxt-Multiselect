export default async () => {
    const { data, error } = await useFetch(`/api/recordslist`);
  
    if (error.value) {
      throw createError({
        statusCode: error.value.statusCode,
        statusMessage: error.value.statusMessage,
      });
    }
  
    return { data };
  };