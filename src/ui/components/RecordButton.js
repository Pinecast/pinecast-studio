import React from 'react';

import SyrupyButton from './SyrupyButton';


export default class RecordButton extends SyrupyButton {
    render() {
        const {state: {clicking, hovering}} = this;
        const scale = hovering ? (clicking ? '0.9' : '1.05') : '1';
        return <button
            {...this.alwaysProps}
            style={{
                alignItems: 'center',
                background: '#BF2727',
                border: 0,
                borderRadius: 200,
                boxShadow: hovering ? '0 10px 20px rgba(0, 0, 0, 0.8)' : '0 0 5px rgba(0, 0, 0, 0.4)',
                display: 'flex',
                height: 200,
                justifyContent: 'center',
                margin: 'auto',
                outline: 'none',
                transform: `scale(${scale})`,
                transition: 'transform 0.2s cubic-bezier(0.87, -0.21, 0.19, 1.44), box-shadow 0.2s',
                width: 200,
            }}
            title='Start Recording'
        >
            <i
                style={{
                    background: '#fff',
                    borderRadius: 50,
                    display: 'block',
                    height: 50,
                    width: 50,
                }}
            />
        </button>;
    }
};
