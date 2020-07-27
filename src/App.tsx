import React, { useState } from 'react';
import { Flex, Text } from 'silicon.ui';
import { ChromePicker } from 'react-color';
import { TinyColor } from '@ctrl/tinycolor';
import { DarkColorSettings, LightColorSettings } from './types';
import ColorSettings from './components/ColorSettings';

function generateColors(baseColor: TinyColor, settings: DarkColorSettings | LightColorSettings): TinyColor[] {
    const colors: TinyColor[] = Array(settings.size).fill(baseColor);

    return colors.map((color, index) => {
        const ratio = (index + 1) / settings.size;

        Object.entries(settings).forEach(([key, value]) => {
            switch (key) {
                case 'spin':
                    color = color.spin(value * ratio);
                    break;
                case 'saturate':
                    color = color.saturate(value * ratio);
                    break;
                case 'darkness':
                    color = color.shade(value * ratio);
                    break;
                case 'lightness':
                    color = color.tint(value * ratio);
                    break;
            }
        });

        return color;
    });
}

export default function App() {
    const [pickerVisible, setPickerVisible] = useState(false);
    const [baseColor, setBaseColor] = useState(() => new TinyColor('#ff5500'));
    const [darkSettings, setDarkSettings] = useState<DarkColorSettings>({
        spin: 0,
        darkness: 50,
        saturate: 10,
        size: 4,
    });
    const [lightSettings, setLightSettings] = useState<LightColorSettings>({
        spin: 0,
        lightness: 80,
        saturate: 10,
        size: 4,
    });

    const darkColors: TinyColor[] = generateColors(baseColor, darkSettings);
    const lightColors: TinyColor[] = generateColors(baseColor, lightSettings);

    const handleSettingsChange = (settings: DarkColorSettings | LightColorSettings) => {
        'darkness' in settings ? setDarkSettings(settings) : setLightSettings(settings);
    };

    const allColors = [...darkColors.reverse(), new TinyColor(baseColor), ...lightColors];

    return (
        <>
            <Flex
                height={24}
                width={48}
                style={{ backgroundColor: baseColor.toHexString() }}
                onClick={() => setPickerVisible(true)}
            />
            <Text>{baseColor.toHexString()}</Text>

            <Text>Dark Settings</Text>
            <ColorSettings settings={darkSettings} onChange={handleSettingsChange} />

            <Text>Light Settings</Text>
            <ColorSettings settings={lightSettings} onChange={handleSettingsChange} />

            <Text>Colors</Text>

            {allColors.map((color, index) => (
                <Flex key={`dark-${index}`} height={24} width={48} style={{ backgroundColor: color.toHexString() }} />
            ))}

            {pickerVisible && (
                <ChromePicker
                    color={baseColor.toHexString()}
                    onChange={(result) => setBaseColor(new TinyColor(result.hex))}
                />
            )}
        </>
    );
}
