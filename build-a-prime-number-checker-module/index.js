

function isPrime (num) {
    if (num <= 1) return false; // 0 and 1 are not prime
    if (num === 2) return true;  // 2 is the only even prime
    if (num % 2 === 0) return false; // Exclude all other even numbers

    // Check odd numbers up to the square root of num
    const sqrt = Math.sqrt(num);
    for (let i = 3; i <= sqrt; i += 2) {
        if (num % i === 0) return false;
    }

    return true;
}

module.exports = {
    isPrime
}