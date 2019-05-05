import * as path from 'path';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as morgan from 'morgan';
import * as cors from 'cors';
import { Visa, DPS, MerchantSearch, VPA, B2BConnect } from 'visa-sdk';

import * as compute from './compute';

const log = require('debug')('app:server');

const CERTIFICATE_FILE = process.env.CERTIFICATE_FILE;
if (!CERTIFICATE_FILE) throw new Error('Missing process.env.CERTIFICATE_FILE');

const CERTIFICATE_PASSPHRASE = process.env.CERTIFICATE_PASSPHRASE;
if (!CERTIFICATE_PASSPHRASE) throw new Error('Missing process.env.CERTIFICATE_PASSPHRASE');

const VISA_USER_ID = process.env.VISA_USER_ID;
if (!VISA_USER_ID) throw new Error('Missing process.env.VISA_USER_ID');
const VISA_PASSWORD = process.env.VISA_PASSWORD;
if (!VISA_PASSWORD) throw new Error('Missing process.env.VISA_PASSWORD');

const credentials = {
    userId: VISA_USER_ID,
    password: VISA_PASSWORD,
    certificate_passphrase: CERTIFICATE_PASSPHRASE,
    certificate_file_path: path.resolve(__dirname, '../', CERTIFICATE_FILE)
};

const visa = new Visa(credentials)
const b2b = new B2BConnect(credentials);

const app = express();
const port = process.env.PORT || 3000;

app.use(morgan(':method :url :status - :response-time ms'));

app.use(cors());
// Enable json body parsing
app.use(bodyParser.json());

// Serve bundled Vue app
app.use(express.static(path.resolve(__dirname, '../../web/dist')));

app.get('/', (req, res) => {
    visa.helloWorld().then(({ body, response }) => {
        log(response.statusCode);
        log(body);
    })
    return res.send('Hello World!');
});

// const company: B2BConnect.CompanyAddBody = {
//     "bankId": 123456,
//     "companyId": 9999,
//     "transactionLimits": {
//         "customLimits": true,
//         "singleTransaction": 25,
//         "dailyVolume": 9990
//     },
//     "blockedCorridors": {
//         "blockedCountries": [
//             {
//                 "isoCountryCode": 4,
//                 "blockedDesc": "companyBlocked"
//             },
//             {
//                 "isoCountryCode": 192,
//                 "blockedDesc": "bankBlocked"
//             }
//         ]
//     },
//     "companyProfile": {
//         "defaultCurrencyIsoCode": 840,
//         "corporateLegalName": "VDPTEST",
//         "enterpriseId": "V-USA-EUR-91211-0146",
//         "doingBusinessAs": "VDP",
//         "industryCode": "22",
//         "businessRegistrationNumber": "1991991",
//         "bankAccountNumber": "119191991",
//         "bankRoutingNumber": "191919191",
//         "iban": "191919199191919",
//         "clabe": "101991919",
//         "chipsUid": "",
//         "swiftLEI": "",
//         "taxId": "19191991",
//         "address": {
//             "line1": "Research Blvd",
//             "unitNo": "214",
//             "city": "Austin",
//             "state": "Texas",
//             "zipCode": 78727,
//             "countryDisplayName": "",
//             "countryIsoCode": 840
//         },
//         "primaryContact": {
//             "name": "OPJones",
//             "jobTitle": "SW",
//             "email": "op@gmail.com",
//             "phone": "1991"
//         },
//         "authorizedSignatory": {
//             "fullName": "Lara Joseph",
//             "nationalityCountryCodeISO": 356,
//             "countryOfResidenceCodeISO": 840
//         },
//         "ownershipDetails": [
//             {
//                 "fullName": "Kiara Kate",
//                 "entityName": "",
//                 "address": "New York",
//                 "email": "lacey@gmail.com",
//                 "entityOwner": "",
//                 "nationalityCountryCode": "ALA",
//                 "countryOfResidence": "ALA",
//                 "nationalityCountryCodeISO": 248,
//                 "countryOfResidenceISO": 248,
//                 "ownerIndividuals": [
//                     {
//                         "fullName": "Sam Doe",
//                         "address": "Austin - TX",
//                         "countryOfResidenceISO": 8,
//                         "countryOfResidenceName": "ALBANIA",
//                         "nationalityCountryCodeISO": 8,
//                         "nationalityCountryName": "ALBANIA",
//                         "active": true
//                     }
//                 ],
//                 "individual": true,
//                 "active": true
//             }
//         ],
//         "remitReconcileProfile": {
//             "remitProfile": {
//                 "deliveryMethod": "email",
//                 "attachmentFormat": "PDF",
//                 "frequency": "Every day",
//                 "email": "absc@xyz.com"
//             },
//             "reconcileProfile": {
//                 "deliveryMethod": "email",
//                 "attachmentFormat": "PDF",
//                 "frequency": "Every day",
//                 "email": "absc@xyz.com"
//             }
//         }
//     }
// } as any;
app.post('/createCompany', (req, res) => {
    log(req.body);
    b2b.addCompany(req.body).then(({ body, response }) => {
        log(body);
        return res.send(body);
    })
});

// const payment: B2BConnect.PaymentParameters = {
//     "senderEnterpriseId": "7889",
//     "receiverEnterpriseId": "V-USA-EUR-20990373-100900001-000",
//     "receiverBic": 54530,
//     "senderBic": 445252,
//     "invoiceDetails": [
//         {
//             "invoiceNumber": "potato",
//             "poNumber": "125552",
//             "paymentAmount": 600,
//             "paymentCurrencyIsoCode": 840,
//             "notes": "For Coffee",
//             "partialPayment": false
//         }
//     ]
// };
app.post('/payment', (req, res) => {
    log(req.body);
    b2b.makePayment(req.body).then(({ body, response }) => {
        log(body);
        return res.send(body);
    });
});

app.post('/generateCreditLimit', (req, res) => {
    log(req.body);
    const limit = compute.getCompanyCreditLimit(req.body);
    log(limit);
    return res.send({ limit });
});

app.use('**', express.static(path.resolve(__dirname, '../../web/dist')));

app.listen(port, () => log(`Example app listening on port ${port}!`));


