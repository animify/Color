import React from 'react';
import { DarkColorSettings, LightColorSettings, ColorSettingsLimits } from '../types';
import { Flex, Input, Text, Slider } from 'silicon.ui';

interface Props {
    settings: DarkColorSettings | LightColorSettings;
    onChange: (settings: DarkColorSettings | LightColorSettings) => void;
}

const limits: ColorSettingsLimits = {
    spin: {
        min: -360,
        max: 360,
        step: 1,
    },
    saturate: {
        min: 0,
        max: 100,
        step: 1,
    },
    size: {
        min: 0,
        max: 100,
        step: 1,
    },
    darkness: {
        min: 0,
        max: 100,
        step: 1,
    },
    lightness: {
        min: 0,
        max: 100,
        step: 1,
    },
};

export default function ColorSettings({ onChange, settings }: Props) {
    const handleChange = (key: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.currentTarget.value === '') return;
        onChange({ ...settings, [key]: parseFloat(event.currentTarget.value) });
    };

    return (
        <Flex direction="column">
            {Object.entries(settings).map(([key, value]) => (
                <Flex key={key} direction="column" mt="2">
                    <Text textTransform="capitalize" size="small" weight="medium" mb="1">
                        {key}
                    </Text>

                    <Input
                        type="number"
                        value={value}
                        placeholder={key}
                        onChange={handleChange(key)}
                        {...limits[key]}
                    />
                    <Slider progress={value} onChange={handleChange(key)} {...limits[key]} />
                </Flex>
            ))}
        </Flex>
    );
}
