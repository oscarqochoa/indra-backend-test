export class ArrayHelper {

    /**
     * Merge associative array and make it a single string
     * 
     * @param data 
     * @param separator 
     * 
     * @returns 
     */
    static mergeStringArrayData(data: string[], separator: string): string {
        return data.reduce((accomulator: string, item: string, index: number, array) => {
            if (index === array.length - 1) separator = '';
            return accomulator + ' ' + item + ' ' + separator;
        }, '');
    }

    /**
     * Split text string and convert it to associative array
     *  
     * @param data 
     * @param separator 
     * @returns 
     */
    static splitMergedStringArray(data: string, separator: string): string[] {
        let response: string[] = [];
        const arrData = data.split(separator);

        arrData.forEach((item: string) => {
            response.push(item);
        });

        return response;
    }

    /**
     * Merge associative array and make it a single string massively
     * 
     * @param data 
     * @param arraySeparator 
     * @param valueSeparator 
     * 
     * @returns 
     */
    static bulkMergeStringArrayData(data: [string[]], arraySeparator: string, valueSeparator: string): string {
        return data.reduce((accomulator: string, item: string[], index: number, array) => {
            if (index === array.length - 1) arraySeparator = '';
            return accomulator + ' ' + ArrayHelper.mergeStringArrayData(item, valueSeparator) + ' ' + arraySeparator;
        }, '');
    }

    /**
     * Split text string and convert it to associative array massively
     * 
     * @param data 
     * @param arraySeparator 
     * @param valueSeparator 
     * 
     * @returns 
     */
    static bulkSplitMergedStringArray(data: string, arraySeparator: string, valueSeparator: string): [string[]] {
        let response: [string[]];
        const arrData = data.split(arraySeparator);

        arrData.forEach((item: string) => {
            response.push(ArrayHelper.splitMergedStringArray(item, valueSeparator));
        });

        return response;
    }

    static isArrayofObjects(arr: any[]): boolean {
        return arr.every(item => typeof item === 'object' && item !== null && !Array.isArray(item));
    }
}