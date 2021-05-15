import { Equals } from 'ts-toolbelt/out/Any/Equals';

interface FooModel {
  tag: string;
  index: number;
  parent: FooModel;
}

type ErrType = 'type1' | 'type2' | 'type3';

interface ErrModel {
  type: ErrType;
  msg: string;
}

type EQFoo<T extends FooModel> = Equals<FooModel, T>;
