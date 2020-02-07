# Real Hot Girl Script
![](REALHOTGIRLSCRIPT.PNG)

## Introduction
Well, hello there 😈. This is RealHotGirlScript, a sexy, statically-typed, object-oriented, and esoteric programming language that truly puts the F-U in fun. RealHotGirlScript is meant to make you smile, laugh, and have a sense of confidence and joy as you create through computer programming. Its witty and hilarious syntax pulls from some of the sayings that the members of the team have each used as they programmed throughout the years together, as as well references to pop culture icons, such as Megan thee Stallion, Rickey Thompson, and Trevor Wallace. 

## Features
- optional parameters
- keywords for variables ending with z
- data structures similar to arrays, sets, and dictionaries
- closures that mimic Swift and Haskell styles
- object oriented programming langauge
- switch statements
- ```.hotgirl``` file extension
- static typing

## Types
| JavaScript  | RealHotGirlScript |
| --- |---|
| string      | wordz | 
| number     | digitz (for integer values) or longz (for integers with decimals) |   
| const | stayz     | 
| bool | boolz      | 

## Variable Declaration and Assignment
| JavaScript  | RealHotGirlScript |
| --- |---|
| let x = 5;      | digitz x: 5; | 
| let y = “hello!”;     | wordz y: “hello!”; |   
| let z = 6.9; | longz z: 6.9;     | 
| const name = “real hot girl script”; | stayz name: “real hot girl script”;      | 

```
dictz stateCapitals: <"California": "Sacramento", "Nevada": "Carson City", "Oregon": "Salem">;
arrayz numbers: [1, 2, 3, 4];
setz names: <“Shanaya”, “Keanna”, “Sage”, “Lauren”>;

```
## Type Casting
Type casting can be done by putting the value you wish to cast in parenthesis, prepended by the type you wish to change the variable to.
```
longz(5)
wordz(3)
```

## Built In Functions
| JavaScript  | RealHotGirlScript |
| --- |---|
| console.log(“Hello World!”);  |  supLilBitch(“Hello World!”);| 
| Math.floor(3.4);  | (3.4).getDown; |   

## Comments
Single line comments are marked with ```oop``` and multiline comments are marked with ```:/``` at the beginning and ```/:``` at the end.
```
oop this is a single line comment

:/
this is a multiline comment
/:

```
## Arithmetic
- sum = 2 + 4
- difference = 4 - 2
- multiplication = 2 * 4
- division = 4 / 2
- exponents = 2 ^ 4
- modulus = 4 % 2

## Control Flow
### If Statements
```
if (x == 0 ) <
     true and them’s the facts;
 > else <
     false and them’s the facts;
    >

```
### While Loops
``` 
wylin(i < 10 ) <
  text +=  "The number is " + i;
  i++;
>

```
### For Loops
```
openHerUp(digitz i: 0; i < 5; i++) <
  supLilBitch("The number is %d", i);
>

```

## Errors 
- Stack Overflow Error: lifesabeachandyoureheredude?
- Syntax Error: youKnOWyOUsEEme
- Unexpected Argument Error: fuckYou

## Example Programs

#### Hello World
RealHotGirlScript
```
suplilbitch(“Hello World!”);
```
JavaScript
```
console.log("Hello World!");
```
#### Adding Two Numbers
RealHotGirlScript
```
function digitz add (digitz a, digitz b)<
  a + b and them's the facts;
>
```
JavaScript
```
let num1 = 10;
let num2 = 2;
let printVal = "The sum is : ";
console.log(printVal + `${num1 + num2}`);
```
#### Even or Odd
RealHotGirlScript
```
function boolz evenOrOdd(digitz x) <
     x % 2 == 0 and them's the facts;
>
```
JavaScript
```
function evenOrOdd(x) {
    return x % 2 == 0;
}
```
#### Change Maker
RealHotGirlScript
```
function arrayz makeChange(digitz amount)<

    if (amount === 0) <
        return [0, 0, 0, 0];
    >

    if (amount < 0) <
        yeet new RangeError('Amount cannot be negative');
    >

    digitz initAmount: amount;
    digitz newAmount;

    digitz quarters: (initAmount / 25).getDown;
    newAmount: initAmount % 25;

    digitz dimes: (newAmount / 10).getDown;
    newAmount %= 10;

    digitz nickels: (newAmount / 5).getDown;
    newAmount: newAmount % 5;

    digitz pennies: newAmount;

    [quarters, dimes, nickels, pennies] and them’s the facts;
>
```
JavaScript
```
function makeChange(amount){
    
    if (amount === 0) {
        return [0, 0, 0, 0];
    }

    if (amount < 0) {
        throw new RangeError('Amount cannot be negative');
    }

    const initAmount = amount;
    let newAmount;

    const quarters = Math.floor(initAmount / 25);
    newAmount = initAmount % 25;

    const dimes = Math.floor(newAmount / 10);
    newAmount %= 10;

    const nickels = Math.floor(newAmount / 5);
    newAmount %= 5;

    const pennies = newAmount;

    return [quarters, dimes, nickels, pennies];
}
```
#### Fibonacci
RealHotGirlScript
```
function digitz fibonacci(digitz x) <
    if (x <= 1) <
        x and them's the facts;
    >
    fibonacci(x - 1) + fibonacci(x - 2) and them's the facts;
>
```
JavaScript
```
function fibonacci(x) {
    if (x <= 1) {
        return x;
    {
    return fibonacci(x - 1) + fibonacci(x - 2);
}
```
#### Switch Statement
RealHotGirlScript
```
digitz number: 0;
wordz day;

switchItUp (number)<
   case 0:
  		 day : "Sunday";
  		  GTFO💩;
  	   case 6:
   		 day : "Saturday";
    		GTFO💩;
  	   default:
    		day : "Weekday";
>

suplilbitch(“today is a %w”,  day);
```
JavaScript
```
let number = 0; 
let day;
switch (number) {
  case 0:
    day = "Sunday";
    break;
  case 6:
    day = "Saturday";
    break;
  default:
    day = "Weekday";
}

console.log(“today is a ” + day);
```
