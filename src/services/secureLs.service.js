import secureLs from 'secure-ls'

export default new secureLs({
    encodingType: 'aes',
    encryptionSecret: process.env.VUE_APP_SECRET_KEY ?? 's3cr3tPa$$w0rd@123',
    isCompression: true,
});