const verificationUrl;
const verificationToken;
const challengeCode;

let response = {};

const hash = createHash("sha256");
hash.update(challengeCode);
hash.update(verificationToken);
hash.update(verificationUrl);

const response