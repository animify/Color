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

interface ColorSettingsLimit {
    step: number;
    min: number;
    max: number;
}

export interface ColorSettingsLimits {
    spin: ColorSettingsLimit;
    saturate: ColorSettingsLimit;
    size: ColorSettingsLimit;
    darkness: ColorSettingsLimit;
    lightness: ColorSettingsLimit;
}
