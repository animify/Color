import { Color } from 'react-color';

interface ColorSettings {
    spin: number;
    saturate: number;
    size: number;
}

export interface DarkColorSettings extends ColorSettings {
    darkness: number;
}

export interface LightColorSettings extends ColorSettings {
    lightness: number;
}
