import { typo3Constants } from "./typo3";

export interface ElementMapping {
    ctype: string;
    path: string;
    component?: any;
}

export const componentMappings: ElementMapping[] = [
    ...typo3Constants,
];

export const postDetailTypes = [
];

export const checkNotFound = (elementsData: any[]): boolean => {
    return false;
};


export const resolveDynamicMetadata = (elementsData: any[], base: any): any => {
    return base;
};

