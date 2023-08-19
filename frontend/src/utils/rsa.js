let prime = new Set(); // a set will be the collection of prime numbers, where we can select random primes p and q
let public_key;
let private_key;
let n;

// We will run the function only once to fill the set of prime numbers
function primefiller() {
    // Method used to fill the primes set is the sieve of Eratosthenes (a method to collect prime numbers)
    let sieve = Array(250).fill(true);
    sieve[0] = false;
    sieve[1] = false;

    for (let i = 2; i < 250; i++) {
        for (let j = i * 2; j < 250; j += i) {
            sieve[j] = false;
        }
    }

    // Filling the prime numbers
    for (let i = 0; i < sieve.length; i++) {
        if (sieve[i]) {
            prime.add(i);
        }
    }
}

// Picking a random prime number and erasing that prime number from the list because p != q
function pickrandomprime() {
    let k = Math.floor(Math.random() * prime.size);
    let iterator = prime.values();
    let it = iterator.next().value;

    for (let i = 0; i < k; i++) {
        it = iterator.next().value;
    }

    prime.delete(it);
    return it;
}

function setkeys() {
    let prime1 = pickrandomprime(); // First prime number
    let prime2 = pickrandomprime(); // Second prime number
    n = prime1 * prime2;
    let fi = (prime1 - 1) * (prime2 - 1);
    let e = 2;

    while (true) {
        if (gcd(e, fi) === 1) {
            break;
        }
        e++;
    }

    // d = (k * Φ(n) + 1) / e for some integer k
    public_key = e;
    let d = 2;

    while (true) {
        if ((d * e) % fi === 1) {
            break;
        }
        d++;
    }

    private_key = d;
}

// Euclidean algorithm to find the greatest common divisor (gcd)
function gcd(a, b) {
    if (b === 0) {
        return a;
    }
    return gcd(b, a % b);
}

// To encrypt the given number
function encrypt(message) {
    let e = public_key;
    let encrypted_text = 1;

    while (e--) {
        encrypted_text *= message;
        encrypted_text %= n;
    }

    return encrypted_text;
}

// To decrypt the given number
function decrypt(encrypted_text) {
    let d = private_key;
    let decrypted = 1;

    while (d--) {
        decrypted *= encrypted_text;
        decrypted %= n;
    }

    return decrypted;
}

// First converting each character to its ASCII value and then encoding it, then decoding the number to get the ASCII and converting it to a character
export function encoder(message) {
    let form = [];

    for (let i = 0; i < message.length; i++) {
        form.push(encrypt(message.charCodeAt(i)));
    }

    return form;
}

export function decoder(encoded) {
    let s = '';

    for (let i = 0; i < encoded.length; i++) {
        s += String.fromCharCode(decrypt(encoded[i]));
    }

    return s;
}

primefiller();
setkeys();

