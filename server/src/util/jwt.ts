import * as jwt from "jsonwebtoken";

const privateKey = `-----BEGIN RSA PRIVATE KEY-----
MIICXAIBAAKBgQDBwkeSQy+T0V+FbWyjnzyOMd71TZ2PzoYFK6T7E4ADpqx1flhj
pRGwn16ga4l6ndqFnpmAJxsdjeGJC7qrUt5L8fh6c2WODNYJpst/40t1kXxtcqUp
g2xzwWZfysWTpzN/oH7eUQ7vWR0KOgjpteBdW5PQoPDjXSOwum3rS9nVyQIDAQAB
AoGAPvbUbUpZ/q4uXVymzjEj6413R73WMvJJCQsazOCUXBtgtbm+HXt52SyhAn6P
qYH8jilw9n0+yYbewLtICP6f7/qgwqr7rLL95RSFxGOFXSgnHst73LrHegRr4NYC
9z8RoRlWb38VjDjYWGfGW1tPC1lt6O4qcDcm8/N6JDMVFdUCQQD1POhTZ0Ir+WWX
Sl/a3la+Oa/5nh855vRZ3EPGq10MWrhpZDMXe4edixRZB+p62Gf5G7ECIlbFquZQ
z19kUxSvAkEAykMJuECnOdegoTTVDsm99UNm4c1Ty/QBG0hqGjLKxM/PE7i0ONR6
+QYluA2RnrM0z5ysZzhArODWsTx2nQtLBwJBAIcgY2cpW1W9mtOtAHopzqQMR0GE
dfJCptsouhOq8p9PEZPIyTokL8qICtMvwGyl90xUjMj/QM6z5yoZyZcPDDMCQBdW
iOaTvzfzY3t2ZycfrCWCs3pWgNbFvuLxBh0jwzXWbKRv6YutKMtXJD8KgcT4FJ3o
DBSU7xGDmAI3YdBZHz0CQDLMwQ6lPt3DDzLq4221MdGPCS7EMMqEPcvc9Lj41jEV
E/7aKAVEfIOqqnaQvhQvxoqfZDjjxepkMkiGzkOUa94=
-----END RSA PRIVATE KEY-----`;

const publicKey = `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDBwkeSQy+T0V+FbWyjnzyOMd71
TZ2PzoYFK6T7E4ADpqx1flhjpRGwn16ga4l6ndqFnpmAJxsdjeGJC7qrUt5L8fh6
c2WODNYJpst/40t1kXxtcqUpg2xzwWZfysWTpzN/oH7eUQ7vWR0KOgjpteBdW5PQ
oPDjXSOwum3rS9nVyQIDAQAB
-----END PUBLIC KEY-----`;

const jwtSignOptions: jwt.SignOptions = {
  algorithm: "RS256",
  expiresIn: "1h",
};

export const createToken = (payload) => jwt.sign(payload, privateKey, jwtSignOptions);
export const decodeToken = (token: string) => token && jwt.verify(token, publicKey);
