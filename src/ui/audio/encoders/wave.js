import {Buffer} from 'external:buffer';

import waveHeader from 'external:waveheader';


const BYTES_PER_SAMPLE = 2;

export default function encode(sampleCount, streams, sampleRate, outputStream) {
    const channelCount = streams.length;
    if (channelCount !== 1) {
        throw new Error('not implemented: encoding multi-channel WAV files');
    }

    outputStream.write(
        waveHeader(
            sampleCount * channelCount * BYTES_PER_SAMPLE,
            {
                bitDepth: BYTES_PER_SAMPLE * 8,
                channels: channelCount,
                sampleRate,
            }
        )
    );

    if (streams.length !== 1) {
        throw new Error('not implemented: encoding multi-channel WAV data');
    } else if (streams.length === 1) {
        const [stream] = streams;
        stream.on('data', chunk => {
            const pcmChunk = new Float32Array(chunk.buffer);
            const wavChunk = new Int16Array(pcmChunk.length);
            const chunkSize = pcmChunk.length;
            for (let i = 0; i < chunkSize; i++) {
                const val = Math.max(-1.0, Math.min(1.0, pcmChunk[i]));
                wavChunk[i] = val < 0 ? val * 32768 : val * 32767;
            }
            outputStream.write(Buffer.from(wavChunk.buffer));
        });
        return new Promise((resolve, reject) => {
            stream.once('end', () => {
                outputStream.end(() => resolve());
            });
            stream.once('error', e => reject(e));
        });
    }

};
