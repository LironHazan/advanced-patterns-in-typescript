// ADTs

// Product
interface PageDetail {
  index: number;
  flag?: boolean;
}
//Sum
type Page = 'home' | 'about' | 'contact'; // sum type (home+about+contact)
//  Product
type Site = Record<Page, PageDetail>; // product type (home*about*concat)

const mySite: Site = {
  about: { index: 1 },
  contact: { index: 2 },
  home: { index: 0 },
};

// Parameters
type DummyProfilerArgs = Parameters<typeof injectDummyProfiler>;
type DummyProfilerFN = (...args: DummyProfilerArgs) => void;
function injectDummyProfiler(filePath: string, className: string, methodName: string): void {}

// Required:

// the interesting part of the Required implementation is --> -?
// which cancels the optional ?
// type Required<T> = {
//   [P in keyof T]-?: T[P];
// };
type RPage = Required<PageDetail>;
const page: PageDetail = {
  index: 0,
};

const rpage: RPage = {
  // Property 'flag' is missing in type '{ index: number; }' but required in type 'Required<PageDetail>'.
  index: 0,
};
