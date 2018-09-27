declare module 'multihashes' {
    function encode(message: Buffer, type: string): Buffer
    function decode(message: Buffer): {
        code: number,
        name: string,
        length: number,
        digest: Buffer,
    }
    function toB58String(value: Buffer): string
    function fromB58String(value: string): Buffer
}
