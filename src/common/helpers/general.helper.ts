export class GeneralHelper {

    static processTextToBeObjectKey(text: string): string {
        const accentsMap: { [accented: string]: string } = {
            'á': 'a', 'é': 'e', 'í': 'i', 'ó': 'o', 'ú': 'u',
            'Á': 'A', 'É': 'E', 'Í': 'I', 'Ó': 'O', 'Ú': 'U',
            'ñ': 'n', 'Ñ': 'N'
        };

        const key: string = text
            .trim()
            .replaceAll(' ', '_')
            .replace(/[áéíóúÁÉÍÓÚñÑ]/g, accented => accentsMap[accented] || accented);

        return key;
    }

    /**
    * Validate if exists a property in object and if this is not empty
    *
    * @param object
    * @param key
    */
    static existsAndNotEmpty(object: any, key: any): boolean {
        return object.hasOwnProperty(key) && object.key !== "";
    }

}