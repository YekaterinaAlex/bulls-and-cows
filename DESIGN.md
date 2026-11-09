# Bulls and Cows — Design Documentation

## Data Structures and Algorithms

### Secret Representation

The secret number is represented as a string rather than a number.

This approach preserves leading zeros, supports hexadecimal digits
(`a`–`f`), and allows easy comparison of digits by position.

For example, `"0123"` is a valid four-digit secret.

### Secret Generation

The `generateSecret(length, base)` function generates a random secret
containing unique digits.

It creates a list of valid digits for the selected number system.
At each step, it randomly selects one digit and removes it from the
list using `splice()`.

Removing selected digits ensures that no digit appears twice.

The optional random function allows deterministic testing.

### Secret Generation Complexity

Let `n` be the secret length and `b` be the number system base.

**Time complexity: O(n × b)**

The algorithm selects `n` digits. Removing a digit with `splice()`
may require shifting up to `b` array elements.

**Space complexity: O(b)**

The algorithm stores up to `b` available digits in an array.

### Guess Evaluation

The `evaluateGuess(secret, guess)` function compares a player's
guess with the secret.

A **bull** is a digit in the correct position.

A **cow** is a digit that exists in the secret but is in a
different position.

The function uses `filter()` to count bulls and cows.

Both strings are converted to lowercase before comparison,
so hexadecimal digits are case-insensitive.

For example:

- Secret: `"1234"`
- Guess: `"1532"`
- Result: 2 bulls and 1 cow.

### Guess Evaluation Complexity

Let `n` be the length of the secret.

**Time complexity: O(n²)**

Counting bulls takes O(n) time because `filter()` checks each
digit once.

Counting cows takes O(n²) time because `filter()` iterates over
the guess and `includes()` may scan the entire secret for each digit.

**Space complexity: O(n)**

The algorithm creates lowercase copies of the strings and temporary
arrays while filtering digits.
