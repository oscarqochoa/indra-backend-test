export class ObjectHelper {

    /**
     * Convert an object to an associative array type
     * 
     * @param object: object 
     * @returns 
     * 
     */
    static convertToAssociateArray(object: object): string[] {

        let response: string[] = [];

        for (const key in object) {
            if (object.hasOwnProperty(key)) {
                response.push(`${key} => ${object[key]}`);
            }
        }

        return response;
    }

    /**
     * Convert an object to an associative array type massively
     * 
     * @param data: object[]
     * @returns 
     */
    static bulkConverterToAssociatedArray(data: object[]): [string[]] {
        let response: [string[]];

        data.forEach((item: object) => {
            response.push(ObjectHelper.convertToAssociateArray(item));
        });

        return response;
    }


    /**
     * Convert an associative array to an object
     * 
     * @param array: string[] 
     * @returns
     */
    static convertAssociativeArrayToObject(array: string[]): object {
        let response: object = {};

        const accentsMap: { [accented: string]: string } = {
            'á': 'a', 'é': 'e', 'í': 'i', 'ó': 'o', 'ú': 'u',
            'Á': 'A', 'É': 'E', 'Í': 'I', 'Ó': 'O', 'Ú': 'U',
            'ñ': 'n', 'Ñ': 'N'
        };

        array.forEach((item: string) => {
            let arrItem = item.split('=>');

            const key: string = arrItem[0]
                .trim()
                .replaceAll(' ', '_')
                .replace(/[áéíóúÁÉÍÓÚñÑ]/g, accented => accentsMap[accented] || accented);

            const value: string = arrItem[1].trim();

            response[key] = value;
        });

        return response;
    }

    /**
     * Convert an associative array to an object massively
     * 
     * @param array: [string[]]
     * @returns
     */
    static bulkConverterToObject(array: [string[]]): object[] {
        let response: object[];

        array.forEach((item: string[]) => {
            response.push(ObjectHelper.convertAssociativeArrayToObject(item));
        });

        return response;
    }
}