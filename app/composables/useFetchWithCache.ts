import { StorageSerializers } from "@vueuse/core";
import { useStorage } from "@vueuse/core";

export default async <T>(url: string) => {
    //Estaba usando useSessionStorage, que no funciona en el lado del servidor 
    const cached = useSessionStorage<T>
        (url, null, {
            //Se inicializa null como default para especificar el serializer a utilizar, que en este caso es object
            serializer: StorageSerializers.object,
        });

    if (!cached.value) {
        const { data, error } = await useFetch<T>(url);
        if (error.value) {
            throw createError({
                ...error.value,
                statusMessage: 'Error al obtener los datos'
            });
        }
        cached.value = data.value as T;
    } else {
        
    }
    return cached;
}