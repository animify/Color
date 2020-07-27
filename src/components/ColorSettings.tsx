import React from 'react';
import { DarkColorSettings, LightColorSettings } from '../types';
import { Flex, Input, Text } from 'silicon.ui';

interface Props {
    settings: DarkColorSettings | LightColorSettings;
    onChange: (settings: DarkColorSettings | LightColorSettings) => void;
}

export default function ColorSettings({ onChange, settings }: Props) {
    const handleChange = (key: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.currentTarget.value === '') {
            return;
        }

        onChange({ ...settings, [key]: parseFloat(event.currentTarget.value) });
    };

    return (
        <Flex direction="column">
            {Object.entries(settings).map(([key, value]) => (
                <Flex key={key} direction="column" mt="2">
                    <Text textTransform="capitalize" size="small" weight="medium" mb="1">
                        {key}
                    </Text>

                    <Input type="number" value={value} placeholder={key} onChange={handleChange(key)} />
                </Flex>
            ))}
        </Flex>
    );
}
