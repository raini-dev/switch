# @raini/switch

[![Build Status](https://travis-ci.org/Raini-js/switch.svg?branch=master)](https://travis-ci.org/Raini-js/switch)
[![codecov](https://codecov.io/gh/Raini-js/switch/branch/master/graph/badge.svg)](https://codecov.io/gh/Raini-js/switch)
[![npm](https://img.shields.io/npm/dt/@raini/switch.svg)](https://www.npmjs.com/package/@raini/switch)
[![npm](https://img.shields.io/npm/v/@raini/switch.svg)](https://www.npmjs.com/package/@raini/switch)
[![licence: MIT](https://img.shields.io/npm/l/@raini/switch.svg)](https://github.com/raini/switch)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![versioning: semantics](https://img.shields.io/badge/versioning-semantics-912e5c.svg)](https://github.com/priestine/semantics)

## Installation

```bash
npm i -S @raini/switch
```

## Usage

### Equation matching

```typescript
import Switch from "@raini/switch";

const match = x =>
  Switch(x)
    .case(1, "matches 1!")
    .case(2, "matches 2!")
    .default("does not match!");

console.log(match(1)); // matches 1!
console.log(match(2)); // matches 2!
console.log(match(3)); // does not match!
```

### Predicate function matching

```typescript
import Switch from "@raini/switch";

const match = x =>
  Switch(x)
    .case(x => x > 10, "greater than 10!")
    .case(x => x < 10, "less than 10!")
    .default("equals 10!");

console.log(match(1)); // less than 10!
console.log(match(11)); // greater than 10!
console.log(match(10)); // equals 10!
```

## Examples

### Get Current Browser

```typescript
import Switch from "@raini/switch";

type TBrowser = "firefox" | "edge" | "chrome" | "ie";

const isEdge = (x: Navigator): boolean => /Edge/.test(x.userAgent);
const isChrome = (x: Navigator): boolean => "vendor" in x && /Google Inc/.test(x.vendor);
const isIe = (x: Navigator): boolean => /Trident/.test(x.userAgent);

export const getCurrentBrowser = (navigator: Navigator): TBrowser =>
  Switch(navigator)
    .case(isEdge, "edge" as const)
    .case(isChrome, "chrome" as const)
    .case(isIe, "ie" as const)
    .default("firefox" as const);

const browser = getCurrentBrowser(navigator);
```

### Sample Routing

```typescript
import Switch from "@raini/switch";
import { createServer } from "http";
import { sendIndexPage, sendAboutPage, sendNotFoundPage } from "./";

const server = createServer();

server.on("request", (req, res) => {
  const cb = Switch(req)
    .case(({ url, method }) => url == "/" && method == "GET", sendIndexPage)
    .case(({ url, method }) => url == "/about" && method == "GET", sendAboutPage)
    .default(sendNotFoundPage);

  cb(req, res);
});

server.listen(process.env.PORT || 3000);
```
