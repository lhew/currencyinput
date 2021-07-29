# currency-input
A webcomponent for currency-based values.


### How it works
It Splits a given string (the `value` prop) using the `separator` prop
to split in 2 parts. the integer and decimal (cents) part.

It is important that the separator present in the `separator` value matches
the one found in the `value` string, otherwise, the component will start with
`valid=false` props

### Properties

|     Property     |      Attribute    |                                            Description                                            |   Type   |   Default   |
| ---------------- | ----------------- | ------------------------------------------------------------------------------------------------- | -------- | ----------- |
| `value`          | `value`           | The amount value, using                                                                           | `string` |    `0.0`    |
| `separator`      | `separator`       | Either a dot, or a comma. Other than that, falls back to (.)                                      | `string` |     `.`     |
| `valid`          | `valid`           | Indicates if there the `value` has a valid value or not                                           | `boolean`| `undefined` |
| `currencySymbol` | `currency-symbol` | Possible currency symbols. Can be $,£,¥ and €. Any different values than those will fallback to € | `string` |     `€`     |
| `disabled`       | `disabled`        | Disables the inputs                                                                               | `string` |   `false`   |
| `readonly`       | `readonly`        | Inputs can be copied, focused, but not edited                                                     | `string` |   `false`   |



Just `npm install && npm start` to see the project live.


To test, run `npm run test`.
Coverage report can be delivered by running `npm run test -- --coverage`;

----------------------------------------------


*Built with [StencilJS](https://stenciljs.com/)*

