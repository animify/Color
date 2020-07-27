import React, { useState } from 'react';
import { Flex, Text, Container } from 'silicon.ui';
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
    const [hoveringColor, setHoveringColor] = useState<TinyColor | undefined>(undefined);
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
            <Container pt={120} pb={64}>
                <Flex mt="3" mb="12" height={64}>
                    <Flex justify="center" height={64}>
                        <Flex
                            height={64}
                            width={64}
                            borderRadius={6}
                            style={{ backgroundColor: (hoveringColor || baseColor).toHexString() }}
                            onClick={() => setPickerVisible(true)}
                        />

                        <Flex ml="4" direction="column" justify="center">
                            <Text size="h6" weight="semibold">
                                {hoveringColor ? 'Current Color' : 'Base Color'}
                            </Text>
                            <Text size="small">{(hoveringColor || baseColor).toHexString()}</Text>
                        </Flex>
                    </Flex>
                </Flex>

                <Flex mt="3" mb="12">
                    {allColors.map((color, index) => (
                        <Flex
                            key={`dark-${index}`}
                            height={128}
                            width={`${100 / allColors.length}%`}
                            onMouseMove={() => setHoveringColor(color)}
                            onMouseLeave={() => setHoveringColor(undefined)}
                            css={() => ({
                                position: 'relative',
                                backgroundColor: color.toHexString(),
                                transform: color.equals(hoveringColor) ? 'scale(1.1)' : 'scale(1)',
                                zIndex: color.equals(hoveringColor) ? 10 : 1,
                                borderRadius: color.equals(hoveringColor) ? 6 : undefined,
                                transition: 'transform 70ms ease',
                                ':first-of-type': { borderRadius: '6px 0 0 6px' },
                                ':last-of-type': { borderRadius: '0 6px 6px 0' },
                            })}
                        />
                    ))}
                </Flex>

                <Flex mt="3" mb="12" justify="space-between">
                    <Flex direction="column" width="50%">
                        <Text size="h6" weight="semibold">
                            Dark Settings
                        </Text>
                        <ColorSettings settings={darkSettings} onChange={handleSettingsChange} />
                    </Flex>

                    <Flex direction="column" width="50%" ml="6">
                        <Text size="h6" weight="semibold">
                            Light Settings
                        </Text>
                        <ColorSettings settings={lightSettings} onChange={handleSettingsChange} />
                    </Flex>
                </Flex>

                {pickerVisible && (
                    <ChromePicker
                        color={baseColor.toHexString()}
                        onChange={(result) => setBaseColor(new TinyColor(result.hex))}
                    />
                )}
            </Container>
        </>
    );
}
