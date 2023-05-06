export default async () => {
    const { data, error } = await useFetch(`/api/fruitslist`);
  
    if (error.value) {
      throw createError({
        statusCode: error.value.statusCode,
        statusMessage: error.value.statusMessage,
      });
    }
  
    return { data };
  };