declare module 'minimatch' {
  /**
   * Basic minimatch interface
   */
  function minimatch(target: string, pattern: string, options?: minimatch.Options): boolean;
  
  namespace minimatch {
    interface Options {
      debug?: boolean;
      nobrace?: boolean;
      noglobstar?: boolean;
      dot?: boolean;
      noext?: boolean;
      nocase?: boolean;
      nonull?: boolean;
      matchBase?: boolean;
      nocomment?: boolean;
      escape?: boolean;
      noquantifiers?: boolean;
      flipNegate?: boolean;
      partial?: boolean;
      windowsPathsNoEscape?: boolean;
    }
    
    class Minimatch {
      constructor(pattern: string, options?: Options);
      match(target: string): boolean;
      matchOne(file: string[], pattern: string[]): boolean;
      makeRe(): RegExp | false;
      debug(): void;
      set: string[][];
      pattern: string;
      regexp: RegExp | false;
      negate: boolean;
      comment: boolean;
      empty: boolean;
      options: Options;
    }
    
    function filter(pattern: string, options?: Options): (target: string) => boolean;
    function match(list: string[], pattern: string, options?: Options): string[];
    function makeRe(pattern: string, options?: Options): RegExp | false;
  }
  
  export = minimatch;
}
