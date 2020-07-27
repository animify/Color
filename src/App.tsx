import React, { useState } from 'react';
import { Flex, Text } from 'silicon.ui';
import { ChromePicker } from 'react-color';
import { TinyColor } from '@ctrl/tinycolor';

export default function App() {
    const [pickerVisible, setPickerVisible] = useState(false);
    const [baseColor, setBaseColor] = useState('#ff5500');
    const [darkSettings, setDarkSettings] = useState({
        spin: 0,
        darkness: 10,
        saturate: 10,
        size: 4,
    });
    const [lightSettings, setLightSettings] = useState({
        spin: 0,
        lightness: 10,
        saturate: 10,
        size: 4,
    });

    const darkColors: TinyColor[] = Array(darkSettings.size)
        .fill(baseColor)
        .reduce((arr, color) => {
            let newColor = new TinyColor(arr[arr.length - 1] || color);

            Object.entries(darkSettings).forEach(([key, value]) => {
                switch (key) {
                    case 'spin':
                        newColor = newColor.spin(value);
                        break;
                    case 'darkness':
                        newColor = newColor.darken(value);
                        break;
                    case 'saturate':
                        newColor = newColor.saturate(value);
                        break;
                }
            });

            arr.push(newColor);
            return arr;
        }, []);

    const lightColors: TinyColor[] = Array(lightSettings.size)
        .fill(baseColor)
        .reduce((arr, color) => {
            let newColor = new TinyColor(arr[arr.length - 1] || color);

            Object.entries(lightSettings).forEach(([key, value]) => {
                switch (key) {
                    case 'spin':
                        newColor = newColor.spin(value);
                        break;
                    case 'lightness':
                        newColor = newColor.lighten(value);
                        break;
                    case 'saturate':
                        newColor = newColor.saturate(value);
                        break;
                }
            });

            arr.push(newColor);
            return arr;
        }, []);

    const allColors = [...darkColors.reverse(), new TinyColor(baseColor), ...lightColors];

    return (
        <>
            <Flex
                height={24}
                width={48}
                style={{ backgroundColor: baseColor }}
                onClick={() => setPickerVisible(true)}
            />
            <Text>{baseColor}</Text>
            <Text>Colors</Text>

            {allColors.map((color, index) => (
                <Flex key={`dark-${index}`} height={24} width={48} style={{ backgroundColor: color.toHexString() }} />
            ))}

            {pickerVisible && <ChromePicker color={baseColor} onChange={(result) => setBaseColor(result.hex)} />}
        </>
    );
}
