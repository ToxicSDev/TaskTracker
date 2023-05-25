const uuidPattern = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
const validationRegex = /^[A-Za-z0-9]{8}-[A-Za-z0-9]{4}-4[A-Za-z0-9]{3}-[A-Za-z0-9]{4}-[A-Za-z0-9]{12}$/;

function generateUUIDv4() {
    return uuidPattern.replace(/[xy]/g, function(char) {
        var rand = (Math.random() * 16) | 0;
        return (char === 'x' ? rand : (rand & 0x3) | 0x8).toString(16);
    });
}

function validateUUIDv4(id) {
    return validationRegex.test(id);
}

export { generateUUIDv4, validateUUIDv4 };