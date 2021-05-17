// great post by the author of toolbelt
// https://medium.com/free-code-camp/typescript-curry-ramda-types-f747e99744ab

import { Tail } from 'ts-toolbelt/out/List/Tail';
type EvenNum = [2, 4, 6, 8];

const tail: Tail<EvenNum> = [4, 6, 8];
const nontail: Tail<EvenNum> = [4, 6]; //type err
