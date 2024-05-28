import {EIMZOClient as client} from './e-imzo-client'

const CAPIWS = window.CAPIWS

export default class EIMZO {
    _loadedKey = null
    get loadedKey() {
        return this._loadedKey
    }
    set loadedKey(value) {
        this._loadedKey = value
    }
    apiKeys = [
        'catalog.tmsiti.uz',
        '06DD3123ECC013ECEDEA1567BD15B7097EF693FB6BCBEFD57153722F724B0424C239AE75D611307C3769D48EC05B5193BBA399674D7DC1F79520CAAA21BE8260',
        '127.0.0.1',
        'A7BCFA5D490B351BE0754130DF03A068F855DB4333D43921125B9CF2670EF6A40370C646B90401955E1F7BC9CDBF59CE0B2C5467D820BE189C845D0B79CFC96F'
    ]
    async checkVersion() {
        return new Promise((resolve, reject) => {
            client.checkVersion(
                function (major, minor) {
                    resolve({ major, minor })
                },
                function (error, message) {
                    reject(error, message)
                }
            )
        })
    }

    async installApiKeys() {
        return new Promise((resolve, reject) => {
            client.installApiKeys(resolve, reject)
        })
    }

    async listAllUserKeys() {
        return new Promise((resolve, reject) => {
            client.listAllUserKeys(
                function (cert, index) {
                    return 'cert-' + cert.serialNumber + '-' + index
                },
                function (index, cert) {
                    return cert
                },
                function (items, firstId) {
                    resolve(items, firstId)
                },
                function (error, reason) {
                    reject(error, reason)
                }
            )
        })
    }

    async loadKey(cert) {
        return new Promise((resolve, reject) => {
            client.loadKey(
                cert,
                (id) => {
                    this._loadedKey = cert
                    resolve({ cert, id })
                },
                reject
            )
        })
    }

    async getCertificateChain(loadKeyId) {
        return new Promise((resolve, reject) => {
            CAPIWS.callFunction(
                {
                    plugin: 'x509',
                    name: 'get_certificate_chain',
                    arguments: [loadKeyId]
                },
                (event, data) => {
                    if (data.success) {
                        resolve(data.certificates)
                    } else {
                        // eslint-disable-next-line prefer-promise-reject-errors
                        reject('Failed')
                    }
                },
                reject
            )
        })
    }

    async getMainCertificate(loadKeyId) {
        const result = await this.getCertificateChain(loadKeyId)

        if (Array.isArray(result) && result.length > 0) {
            return result[0]
        }
        return null
    }

    async getCertInfo(cert) {
        return new Promise((resolve, reject) => {
            CAPIWS.callFunction(
                { name: 'get_certificate_info', arguments: [cert] },
                (event, data) => {
                    if (data.success) {
                        resolve(data.certificate_info)
                    } else {
                        // eslint-disable-next-line prefer-promise-reject-errors
                        reject('Failed')
                    }
                },
                reject
            )
        })
    }

    async signPkcs7(cert, content) {
        const loadKeyResult = await this.loadKey(cert)

        return new Promise((resolve, reject) => {
            CAPIWS.callFunction(
                {
                    name: 'create_pkcs7',
                    plugin: 'pkcs7',
                    arguments: [window.Base64.encode(content), loadKeyResult.id, 'no']
                },
                (event, data) => {
                    if (data.success) {
                        resolve(data)
                    } else {
                        // eslint-disable-next-line prefer-promise-reject-errors
                        reject('Failed')
                    }
                },
                reject
            )
        })
    }
    async createPkcs7(id, content, timestamper) {
        return new Promise((resolve, reject) => {
            client.createPkcs7(
                id,
                content,
                timestamper,
                (/* string */ pkcs7) => {
                    resolve(pkcs7)
                },
                reject
            )
        })
    }

    async getTimestampToken(signature) {
        return new Promise((resolve, reject) => {
            CAPIWS.callFunction(
                {
                    name: 'get_timestamp_token_request_for_signature',
                    arguments: [signature]
                },
                function (event, data) {
                    if (data.success) {
                        resolve(data.timestamp_request_64)
                    } else {
                        // eslint-disable-next-line prefer-promise-reject-errors
                        reject('Failed')
                    }
                },
                reject
            )
        })
    }

    addApiKey(domain, key) {
        if (!this.apiKeys.includes(domain)) {
            this.apiKeys.push(domain, key)
        }
    }

    async install() {
        await this.checkVersion()

        client.API_KEYS = this.apiKeys

        await this.installApiKeys()
    }
}
