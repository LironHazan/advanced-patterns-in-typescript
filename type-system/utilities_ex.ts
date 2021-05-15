// When the Record type could be handy

interface PageDetail {
  index: number;
}

type Page = 'home' | 'about' | 'contact'; // sum type (home+about+contact)

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

