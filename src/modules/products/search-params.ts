import { parseAsString, parseAsArrayOf, createLoader, parseAsStringLiteral } from 'nuqs/server';

export const sortValues = ["curated","trending","hot_and_new"];

export const params = {
    sort: parseAsStringLiteral(sortValues).withDefault("curated"),
   minPrice:parseAsString
.withOptions({
    clearOnDefault: true,
})
.withDefault(""),
maxPrice:parseAsString
.withOptions({
    clearOnDefault: true,
})
.withDefault(""),
tags: parseAsArrayOf(parseAsString)
.withOptions({
    clearOnDefault: true,
}) 
.withDefault([]),
};
export const loadProductFilters = createLoader(params);
