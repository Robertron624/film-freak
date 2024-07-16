import '@testing-library/jest-dom';

// Mock IntersectionObserver to avoid errors in tests
class IntersectionObserverMock implements IntersectionObserver {
    constructor(public callback: IntersectionObserverCallback, public options?: IntersectionObserverInit) {}
  
    //@ts-expect-error need to implement
    root: Element | Document | null;
    //@ts-expect-error need to implement
    rootMargin: string;
    //@ts-expect-error need to implement
    thresholds: readonly number[];
  
    //ts-ignore
    observe(target: Element): void {
      target
    }
  
    unobserve(target: Element): void {
      target
    }
  
    disconnect(): void {}
  
    takeRecords(): IntersectionObserverEntry[] {
      return [];
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
global.IntersectionObserver = IntersectionObserverMock as any;