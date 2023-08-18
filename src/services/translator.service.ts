import * as AWS from "aws-sdk";
import { ArrayHelper } from "src/common/helpers/array.helper";
import { GeneralHelper } from "src/common/helpers/general.helper";
import { ObjectHelper } from "src/common/helpers/object.helper";
import { IAWSTranslatorParams } from "src/common/interfaces/aws-translator-params.interface";

export class TranslatorService {

    private _translator: AWS.Translate;
    private _sourceLanguage: string;
    private _targetLanguage: string;

    constructor(sourceLanguage: string = 'en', targetLanguaje: string = 'es') {
        this._translator = new AWS.Translate();

        this._sourceLanguage = sourceLanguage;
        this._targetLanguage = targetLanguaje;
    }

    async translateSingleObject(data: object): Promise<object> {
        const mergedDataToTranslate = ArrayHelper.mergeStringArrayData(
            ObjectHelper.convertToAssociateArray(data),
            '___'
        );

        const response = await this.translate(mergedDataToTranslate);

        const dataTransformedToArray = ArrayHelper.splitMergedStringArray(response, '___');

        return ObjectHelper.convertAssociativeArrayToObject(dataTransformedToArray);
    }

    async translateSingleObjectArray(data: object[]): Promise<object[]> {
        const mergedDataToTranslate = ArrayHelper.bulkMergeStringArrayData(
            ObjectHelper.bulkConverterToAssociatedArray(data), '_____', '___'
        );

        const response = await this.translate(mergedDataToTranslate);

        const dataTransformedToArray = ArrayHelper.bulkSplitMergedStringArray(response, '_____', '___');

        return ObjectHelper.bulkConverterToObject(dataTransformedToArray);
    }

    async translateMultilevelObjectKeys(obj: object) {
        const keysToTranslate: string[] = [];

        function collectKeysToTranslate(obj: any) {
            if (Array.isArray(obj)) {
                obj.forEach(item => {
                    if (typeof item === 'object') {
                        collectKeysToTranslate(item);
                    }
                });
            } else if (typeof obj === 'object') {
                for (const key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        keysToTranslate.push(key);
                        if (typeof obj[key] === 'object') {
                            collectKeysToTranslate(obj[key]);
                        }
                    }
                }
            }
        }

        collectKeysToTranslate(obj);

        const translatedKeys = await this.translateBatch(keysToTranslate);

        function translateKeysRecursively(obj: any): any {
            if (Array.isArray(obj)) {
                return obj.map(item => {
                    return typeof item === 'object' ? translateKeysRecursively(item) : item;
                });
            } else if (typeof obj === 'object') {
                const response = {};

                for (const key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        const value = obj[key];
                        const translatedKey = translatedKeys[key] || key;

                        const translatedValue = typeof value === 'object' ? translateKeysRecursively(value) : value;
                        response[GeneralHelper.processTextToBeObjectKey(translatedKey)] = translatedValue;
                    }
                }

                return response;
            }
        }

        return translateKeysRecursively(obj);
    }

    async translateBatch(keys: string[]): Promise<{ [key: string]: string }> {
        const translatedKeys: { [key: string]: string } = {};

        const batchPromises = keys.map(async key => {
            const translatedKey = await this.translate(key);
            translatedKeys[key] = translatedKey;
        });

        await Promise.all(batchPromises);

        return translatedKeys;
    }

    async translate(text: string): Promise<string> {
        const params: IAWSTranslatorParams = {
            Text: text,
            SourceLanguageCode: this._sourceLanguage,
            TargetLanguageCode: this._targetLanguage
        };

        const result = await this._translator.translateText(params).promise();

        return result.TranslatedText;
    }


}