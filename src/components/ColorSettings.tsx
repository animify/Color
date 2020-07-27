import React from 'react';
import { DarkColorSettings, LightColorSettings } from '../types';
import { Flex, Input } from 'silicon.ui';

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
        <Flex>
            {Object.entries(settings).map(([key, value]) => (
                <Input key={key} type="number" value={value} placeholder={key} onChange={handleChange(key)} />
            ))}
        </Flex>
    );
}
