# Cash library

## Introduction

The Cash library allows you to convert an amount of money from a currency to another one.

## Install depedencies

Go to your project folder then run the following commands:
```sh
>cd path/cash  
>npm install
```

## Usage

Now, go to the bin folder
```sh
>cd bin
```

### Conversion
To convert an amount of money, use the following structure:
```sh
>node index.js <amount> <currency>
```

You can find all the currencies available here : https://api.fixer.io/latest'

**Example:**  
Input:
```sh
>node index.js 1 USD
```

Output:
>✔ 0.81 (EUR) Euro  
✔ 0.72 (GBP) Pound Sterling  
✔ 3.38 (PLN) Polish Zloty


### Basic commands
To display basic commandes, use the following structure:
```sh
>node index.js <command>
```

**Commands: **
* '--save, -s' : To save currencies as default currencies
* '--help,  -h' : Display help message
* '--version,  -v': Display version number
