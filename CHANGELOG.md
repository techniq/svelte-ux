# svelte-ux

## 0.53.5

### Patch Changes

- Add Gooey component ([`daccd7e`](https://github.com/techniq/svelte-ux/commit/daccd7e1122ccee9850f9b83d5bf4147fee3b23a))

- Add `.grid-stack` utility to Svelte UX tailwind plugin to easily stack grid children ([`3edff44`](https://github.com/techniq/svelte-ux/commit/3edff44863492384602ca25f6af9edf39c2fda9c))

- Add basic RangeField component ([`1dd7f4f`](https://github.com/techniq/svelte-ux/commit/1dd7f4f04b1db981afd5eaa715313f8c29703781))

## 0.53.4

### Patch Changes

- Add Shine component and spotlight action to top-level exports ([`e0c6985`](https://github.com/techniq/svelte-ux/commit/e0c6985a36b6a70a820cd991e413875a54654348))

## 0.53.3

### Patch Changes

- [DateRangeField] Improve dialog size and overflow with large month selection ([`861477f`](https://github.com/techniq/svelte-ux/commit/861477f43360d41acac2dafae38f70dbf3400328))

- [DateRangeField] Support passing `periodTypeOptions` to underlying `DateRange` ([`e099253`](https://github.com/techniq/svelte-ux/commit/e0992538b22e9cfd10b22e82bce44ec8fa8481bb))

## 0.53.2

### Patch Changes

- [Tilt] Support enabling/disabling brightness filter (default: false) ([`c8abcb3`](https://github.com/techniq/svelte-ux/commit/c8abcb37ae139d0835302afcd4e9b0cc3be9b5a9))

- Add Shine component ([`9577113`](https://github.com/techniq/svelte-ux/commit/95771137233108c0658ef60d4b44d7a34c88a797))

## 0.53.1

### Patch Changes

- [tableOrderStore] Support passing the initial handler (like by/direction) before a column header has been clicked ([`375a3cc`](https://github.com/techniq/svelte-ux/commit/375a3cc944356b6017fe51ff0f4bd087a86d899d))

## 0.53.0

### Minor Changes

- Rename `createSortFunc` => `sortFunc` and `createCompoundSort` to `compundSortFunc`, and `sort()` now shallow copies. Export all sort utils as top level ([`baec848`](https://github.com/techniq/svelte-ux/commit/baec848931e1eb8b3dd3d92c75cd423aed6065a7))

## 0.52.1

### Patch Changes

- Update dependencies

## 0.52.0

### Minor Changes

- Consolidate `createPropertySortFunc()` use case into `createSortFunc` to simplify ([`3cedc7f`](https://github.com/techniq/svelte-ux/commit/3cedc7fa2056777a5b6b6dd7c43a026f004f4d29))

- [tableOrderStore] Always set `handler` state to sort function for convenience ([`6e36df8`](https://github.com/techniq/svelte-ux/commit/6e36df8632cfeac178af73460fc633979153bec6))

## 0.51.0

### Minor Changes

- [Table] Rename `column.class` to `column.classes` and `header`/`data` classes to `th`/`td` for consistency with other APIs ([`ff93894`](https://github.com/techniq/svelte-ux/commit/ff93894104be28227fe221b961e0c312746eeb46))

- Add spotlight action ([`fc8cc8c`](https://github.com/techniq/svelte-ux/commit/fc8cc8c204a88c164faefe2945018edf1ddea302))

### Patch Changes

- [Table] Pass `getCellValue`, `getCellContent`, and `getCellHeader` as slot props to applicable `headers` / `data` slots to simplify use case ([`4a95509`](https://github.com/techniq/svelte-ux/commit/4a95509934bed1607693d946ce8f3cbb7f7d6080))

## 0.50.1

### Patch Changes

- [scrollIntoView] Add `onlyIfNeeded` option to mimic non-standard `scrollIntoViewIfNeeded()` ([`38c448f`](https://github.com/techniq/svelte-ux/commit/38c448fd7e9e41e72adcb915d3283e2ebe84c175))

- Add `isVisibleInScrollParent(node)` DOM util ([`2eea4b5`](https://github.com/techniq/svelte-ux/commit/2eea4b5fe8b0910d3bc3ca29290dc3a4aba7474c))

## 0.50.0

### Minor Changes

- Update transitions to Svelte 4 compatible (default local, explicit `|global` instead of default global, explicit `|local`). Fix ToggleButton Dialog/Drawer transition in ([`7406467`](https://github.com/techniq/svelte-ux/commit/7406467e42c2900a6371915d8faaedd42dadfcb3))

## 0.49.1

### Patch Changes

- [StoreSubscribe] Rename `value` prop to `store` ([`4438954`](https://github.com/techniq/svelte-ux/commit/4438954a0fe2cdaa4e1979b189a41ee5807db538))

- [Button] Defend against `classes` sometimes being set to `undefined`. Issue #91 ([`49a525b`](https://github.com/techniq/svelte-ux/commit/49a525ba71bae0ebdc58c92ef4b155a5f36bbf8a))

- [format] Pass additional arguments to underlying `formatDate()` and `formatNumberAsStyle()` functions ([`ebdb2c8`](https://github.com/techniq/svelte-ux/commit/ebdb2c856a1fe4a200036f076896fca430550ad3))

## 0.49.0

### Minor Changes

- Upgrade all dependencies including svelte from 3.59.1 to 4.2.0 ([`301861c`](https://github.com/techniq/svelte-ux/commit/301861cfb63d500e795971a38eddf9b1653b6b32))
- Change svelte to `peerDependency`

## 0.48.3

### Patch Changes

- Support passing `backdrop` classes (including theme) to Dialog and Drawer ([`84adc7f`](https://github.com/techniq/svelte-ux/commit/84adc7f6a6c4189464150245853a1ef867e2f4e1))

- Only close Dialog/Drawer on direct Backdrop click (not drag from Dialog/Drawer to Backdrop) ([`acc3255`](https://github.com/techniq/svelte-ux/commit/acc32559d1e408cfa400320e6999787aec979919))

- [QuickSearch] Add backdrop blur and increase opacity ([`1b82911`](https://github.com/techniq/svelte-ux/commit/1b829116576c15cfb6f342d393bdc6975f11b257))

- [InfiniteScroll] Add 1px height to sentinel to fix intersection detection in some cases ([`3a82242`](https://github.com/techniq/svelte-ux/commit/3a822425f08390b968d2c1b53cc12e987faf7d87))

## 0.48.2

### Patch Changes

- Add basic docs for `uniqueStore` and `mapStore` ([`37b96a5`](https://github.com/techniq/svelte-ux/commit/37b96a5f3e1767e4650442e4028cb103bc8eea3f))

- [Logger] Fix SSR (due to localStorage) ([`935291a`](https://github.com/techniq/svelte-ux/commit/935291a3f09f511c25a052b65db70b26f2bb44fe))

## 0.48.1

### Patch Changes

- Add `toTitleCase()` strring util ([`70caaab`](https://github.com/techniq/svelte-ux/commit/70caaab9ad69a8fa3f8dfe340f6f8f6d1c2957b2))

- Remove need to register `color-var` tailwind color ([`03968f7`](https://github.com/techniq/svelte-ux/commit/03968f731723f1b856acdc71e1f93113e64efed8))

- [Button] Add `text` variant ([`d3b0009`](https://github.com/techniq/svelte-ux/commit/d3b00095d9f0706ee7619e024e24abf844715d2d))

- Add `promiseStore` to easily wrap a Promise as a store. Useful for SvelteKit streamed data handling ([`7b2f662`](https://github.com/techniq/svelte-ux/commit/7b2f6626be230baa857191c89fa4ff4bed8029f5))

## 0.48.0

### Minor Changes

- [SelectField] Rename `clearSearchOnFocus` to `clearSearchOnOpen` to open on up/down key input, and default to `true` ([`7b364ea`](https://github.com/techniq/svelte-ux/commit/7b364eaf67299d0bbeed010afa71bb02ad74e7cf))

### Patch Changes

- [SelectField] Improve handling of highlightIndex after searching ([`cd53e86`](https://github.com/techniq/svelte-ux/commit/cd53e8693a15575604227cd3b1117bc08542af53))

- [Button] Color match focus rings with offset based on variant ([`519ff82`](https://github.com/techniq/svelte-ux/commit/519ff829b17185928571574173ebdb79364b6a7c))

- Remove remaining internal Grid/Stack usage ([`c21ed48`](https://github.com/techniq/svelte-ux/commit/c21ed480a34a11514cb41f9242178f3b333379e6))

- [SelectField] Only select by index (i.e. press "enter") if a valid option is found (not all filtered) ([`6e94fb0`](https://github.com/techniq/svelte-ux/commit/6e94fb05459c745a5fd248481eae5269b8cf5aee))

- [SelectField] Add menu `actions` slot ([`a21355b`](https://github.com/techniq/svelte-ux/commit/a21355b8798ea9c80bf2e5343ba366e970bab52a))

## 0.47.6

### Patch Changes

- [SelectField] Highlight selected option on open and fix highlight styling competing with item hover styling ([`9a027dd`](https://github.com/techniq/svelte-ux/commit/9a027dd25aaa822d549f6ecf81cac7b2a4071bf8))

## 0.47.5

### Patch Changes

- [SelectField] Update styling to match MenuField/MenuButton ([`99c905c`](https://github.com/techniq/svelte-ux/commit/99c905c06791d01755a683cd9e6cc6e69f128819))

## 0.47.4

### Patch Changes

- [MenuItem] Add `selected` prop to apply styling, including handling sibling hover. Refine default styling for MenuButton/MenuField ([`0672ec6`](https://github.com/techniq/svelte-ux/commit/0672ec671082d96c1270152e8ecc25f7907f901c))

- [QuickSearch] Refine styling ([`93fa30c`](https://github.com/techniq/svelte-ux/commit/93fa30ce53e1c377e3a1f04a94574b1496383186))

- [Field/TextField] Support setting `error` to true to enable styling without message. Improve TextField error placeholder when in error state ([`3652357`](https://github.com/techniq/svelte-ux/commit/3652357541ea75983d86ed68a7a10966aeb7b252))

- Update non-major dependencies ([`fb89b0c`](https://github.com/techniq/svelte-ux/commit/fb89b0cbf5a6e638da1c27301d6879d068fd55fb))

## 0.47.3

### Patch Changes

- [Button] Add transition to loading state ([`cb8914e`](https://github.com/techniq/svelte-ux/commit/cb8914e4c572a9221fb82077d19cb27466b7dda6))

- [CopyButton] Transition message ([`6d863ac`](https://github.com/techniq/svelte-ux/commit/6d863ac2ffabffb606f79b65c4e50d46dbed49e4))

## 0.47.2

### Patch Changes

- [SelectField] Only run search() when open (not when closing from selection) ([`566cd74`](https://github.com/techniq/svelte-ux/commit/566cd74d33f93cb6018fe02f4d629a719aa2190d))

- [ToggleGroup] Add "fill-white" variant ([`1572737`](https://github.com/techniq/svelte-ux/commit/15727371ea612f59886c61f882253dfed5c1e05c))

## 0.47.1

### Patch Changes

- Fix Preview preprocess after prettier async formatting ([`a27ddcd`](https://github.com/techniq/svelte-ux/commit/a27ddcdd10e0058d5edd2dd4bc7bb6565a84b30e))

## 0.47.0

### Minor Changes

- Update prettier to v3 including Preview preprocess ([`bbfbb56`](https://github.com/techniq/svelte-ux/commit/bbfbb56364a0e51d9f324342735451893196283a))

## 0.46.3

### Patch Changes

- Change back to using Symbol for theme key. Export `getTheme()` and `getComponentTheme()` as top-level exports ([`ccd5308`](https://github.com/techniq/svelte-ux/commit/ccd530847713258cd9834f92fca030642a430fc8))

## 0.46.2

### Patch Changes

- Change theme key from Symbol to simple string ([`9bc956c`](https://github.com/techniq/svelte-ux/commit/9bc956cbd72055135b75ca9f2bafd0431c1d1644))

## 0.46.1

### Patch Changes

- [Field / TextField] Rename `labelPlacement="shrink"` to `labelPlacement="float"` to better describe usage ([`ebf9efd`](https://github.com/techniq/svelte-ux/commit/ebf9efd181e8049c92b28e183adebff0b8840525))

- Bump all non-major dependencies ([`ebf9efd`](https://github.com/techniq/svelte-ux/commit/ebf9efd181e8049c92b28e183adebff0b8840525))

## 0.46.0

### Minor Changes

- [Field / Textfield] Add top/left label placement, along with existing inset/shrink (replace shrinkLabel prop). Default to inset instead of shrink. Remove filled prop ([`de49c98`](https://github.com/techniq/svelte-ux/commit/de49c98d19335a7d9e94ad7fe4d659ebd640be14))

### Patch Changes

- Add Tabs / Tab components ([#64](https://github.com/techniq/svelte-ux/pull/64))

- [MultiSelectField] Always shrink TextField label ([#64](https://github.com/techniq/svelte-ux/pull/64))

## 0.45.0

### Minor Changes

- [Button] Rename "text" variant to "default" ([`4d61047`](https://github.com/techniq/svelte-ux/commit/4d6104746922808b84ff1d81b525205e53f7a930))

- [ToggleGroup] Major overhaul of styling ([`ef5c2ee`](https://github.com/techniq/svelte-ux/commit/ef5c2ee9cf50a3025fcb335ff091fdf5c63f2241))

  - Support many variants based on accent color
  - Support style modifications including size, rounded (small/full), gap (small/px), and inset.
  - Rename `optionsContainer` to `label` and use label component.
  - Support keyboard up/down/left/right via underlying radio input.

### Patch Changes

- Add `name` prop to Checkbox and Radio components ([`56021eb`](https://github.com/techniq/svelte-ux/commit/56021eb971e9369f5eca7263dee2fa12d73f06ae))

- [DateRange] Align design with new ToggleGroup variant ([`ef5c2ee`](https://github.com/techniq/svelte-ux/commit/ef5c2ee9cf50a3025fcb335ff091fdf5c63f2241))

## 0.44.1

### Patch Changes

- [AppLayout] Fix SSR rendering (window undefined) ([`e0b29f1`](https://github.com/techniq/svelte-ux/commit/e0b29f19640ff3c38b3aec6bbd31aa410a230db4))

## 0.44.0

### Minor Changes

- [AppLayout] Rename `headerFullWidth` to `headerPosition` with full/inset values, and now default to full width. Fix AppBar / temporary drawer z-index ([`76a0ca1`](https://github.com/techniq/svelte-ux/commit/76a0ca18331300f231f07b12ee24a0c1e2e68b92))

### Patch Changes

- [AppLayout] Only show nav drawer initially on viewports >= 768 (md) ([`e19b3b8`](https://github.com/techniq/svelte-ux/commit/e19b3b888efc4339b8e02f0d4d397487fde61913))

- NavItem now closes drawer when clicked on mobile ([`1f59d76`](https://github.com/techniq/svelte-ux/commit/1f59d76c661d6e5aa015ccc7efe0fb5d37b8817c))

## 0.43.11

### Patch Changes

- Bump all non-major dependencies ([`b0bec45`](https://github.com/techniq/svelte-ux/commit/b0bec45311e5321f551718e9b3eef1de435a5e6b))

## 0.43.10

### Patch Changes

- [MenuField] Enable autoPlacement and resize menuProps by default ([`13b7220`](https://github.com/techniq/svelte-ux/commit/13b72209765d041ca80aeadbd3e599c3d264dd95))

## 0.43.9

### Patch Changes

- [MenuField] Support passing `option` and `selected` classes. Adjust px when using groups ([`baac1c4`](https://github.com/techniq/svelte-ux/commit/baac1c4bbb51ecdd2ab2bfe1b34b40ce2955b443))

## 0.43.8

### Patch Changes

- [MenuField] Add group options and theme support. Support hidding menu icon ([`508d656`](https://github.com/techniq/svelte-ux/commit/508d656c91cad1ed341ae5e15c9c56996688af1c))

## 0.43.7

### Patch Changes

- Add stepper prop to MenuField to easily transverse options ([`59d3925`](https://github.com/techniq/svelte-ux/commit/59d39259d963bffb9d95576096f473c975adf8cc))

## 0.43.6

### Patch Changes

- Add `maxDepth` prop to TableOfContents to set maximum header depth traversed (h1, h2, ...) ([`6143fae`](https://github.com/techniq/svelte-ux/commit/6143fae06700a266f12f43178e9a7a0062ba2e1b))

- [Docs] Improve code example dialogs on mobile ([`d74c235`](https://github.com/techniq/svelte-ux/commit/d74c2357e81b92715c7aeb87d2aad6ecdf928805))

## 0.43.5

### Patch Changes

- Add round() and clamp() number utils to top-level export ([`2eb5dd6`](https://github.com/techniq/svelte-ux/commit/2eb5dd6f4c46181656b550d484269a96aea04d61))

- Fix routing isActive() with nested paths ([`3971b79`](https://github.com/techniq/svelte-ux/commit/3971b794a4871f718316982875f7a90578935923))

## 0.43.4

### Commits

- [Field] Add prepend and append classes. Remove overflow-hidden from input to fix clipping (keyboard toggle chekbox/switch/etc) and move to MenuField (where needed for text truncate). Remove use of Stack ([34df1f](https://github.com/techniq/svelte-ux/commit/34df1f0bfb20c6569c4628f8f9ba401feffec25a))

## 0.43.3

### Commits

- [SelectField] Fix `option with action` example ([8a3f03](https://github.com/techniq/svelte-ux/commit/8a3f03c343b3d1c851253693ae6072dd6653d659))
- Sort quick search options by group ([6786c5](https://github.com/techniq/svelte-ux/commit/6786c5f306f45617d7b03aadfb3f1e6be4a882c6))
- [Pagination] Add `format` prop ([018373](https://github.com/techniq/svelte-ux/commit/018373cfa83899caf57b37a6ed2e2622c57a6cff))
- Update paginationStore/Paginate/Pagination docs ([a42bf5](https://github.com/techniq/svelte-ux/commit/a42bf5b20d0b6fc1f8e0ec163ac1aa8417c2b8e1))

## 0.43.2

### Commits

- Update all non-major dependencies ([ad915d](https://github.com/techniq/svelte-ux/commit/ad915d499312b2efe8580eea3f9dadb256a7c301))

## 0.43.1

### Commits

- Add `notNull` type guard ([c3250b](https://github.com/techniq/svelte-ux/commit/c3250bd62ef6bd42bd1803b1d8dc8e4d9e424eb8))
- [ViewSourceButton] Fix on smaller viewports ([fd8868](https://github.com/techniq/svelte-ux/commit/fd88682afbf34565dc839b472fed1341f3cc0120))

## 0.43.0

### Commits

- Rename json encode()/decode() utils to parse()/stringify(), support Map/Set instances, add tests and docs page, add to top-level export ([b1fb1a](https://github.com/techniq/svelte-ux/commit/b1fb1a7bb1c8bf2a38803f938c4db86323699622))
- Fix tailwind warning about nesting plugin, and fix svelte warning about inspector ([7b9a2e](https://github.com/techniq/svelte-ux/commit/7b9a2e10a1243b30fa93910c379c8c28fdd73f5e))

## 0.42.1

### Commits

- [AppLayout] Add `overlapHeader` to opt-in to overlapping main and header ([f32f94](https://github.com/techniq/svelte-ux/commit/f32f94618048e060f79125afa246377998a9a11e))

## 0.42.0

### Commits

- Move AppBar doc to CSS theme ([a36b85](https://github.com/techniq/svelte-ux/commit/a36b85eb8d1bc5a4b0820407c67f6b0a867c12e4))
- [AppLayout] Support setting headerHeight, and always overlap main under header to support background blur headers ([bd2c0e](https://github.com/techniq/svelte-ux/commit/bd2c0ef1b0bac9ad6304c67f8159993becb2d933))
- [NavItem] Remove indicator and just use left border (transparent when not active). Move all docs styling to CSS (instead of split between theme and CSS) ([f19b68](https://github.com/techniq/svelte-ux/commit/f19b68387c5368059a3804037576e427a756b6ae))
- Add CopyButton component ([eaccb7](https://github.com/techniq/svelte-ux/commit/eaccb79e0ceb3165c6b1a6c944e35e92c62223c8))
- [NavItem] Remove built-in text size and padding ([580ac7](https://github.com/techniq/svelte-ux/commit/580ac7283d2e2b0021238b72f32e7d2033091c52))
- [ViewSourceButton] Add filenames ([f43e0e](https://github.com/techniq/svelte-ux/commit/f43e0ed80103ac920fd182329c154b1d3c2262df))
- Support viewing component/store/action/util and doc page source easily, with link to github to edit ([4e0294](https://github.com/techniq/svelte-ux/commit/4e029469ffc5290d1422f9a059ad89fb7873d0e3))
- [Code] Rename `code` prop to `source` ([b16086](https://github.com/techniq/svelte-ux/commit/b16086b172c22364b3051ecce1b9f5564c39e66b))

## 0.41.1

### Commits

- [TableOfContents] Add .TableOfContents component class and theme support ([a1f87c](https://github.com/techniq/svelte-ux/commit/a1f87cbd523004f3951943e954f89830d70e582d))
- Fix typo ([eb8d78](https://github.com/techniq/svelte-ux/commit/eb8d78ddc549024361644c0f3e8ff7906b138a0b))

## 0.41.0

### Commits

- Remove large graphql dependency with small `gql` template string replacement (just helpful for prettier formatting / syntax hightlighting) ([e3ca09](https://github.com/techniq/svelte-ux/commit/e3ca09cd59c2e12ed9550531836f6e2607ec4782))
- [dateDisplay] Add features list ([c4773e](https://github.com/techniq/svelte-ux/commit/c4773e49aa258b128850c8efb0d8a654503ae167))
- Allow using html in features ([1738e4](https://github.com/techniq/svelte-ux/commit/1738e42ab29abd951205784d737ef7e8a89eacae))

## 0.40.8

### Commits

- Add formatDate() and PeriodType to top-level exports ([b58ed5](https://github.com/techniq/svelte-ux/commit/b58ed5f891b92c6ec1c089adab4708ba78976f76))

## 0.40.7

### Commits

- Move dateDisplay, duration, and file utils to top-level export ([3584f3](https://github.com/techniq/svelte-ux/commit/3584f386c3acca9b17e953b07c574fb91a68b0f9))
- [Form] Simplify preventDefault ([91c7e0](https://github.com/techniq/svelte-ux/commit/91c7e0e526fba3af9de087a67238f2c6fe5d1c00))
- [ResponsiveMenu] Add example for adding safe bottom padding to Drawer ([87ba9c](https://github.com/techniq/svelte-ux/commit/87ba9cf951961c0ef113916903aaf666d4c831dc))
- Disable zooming when focusing inputs on mobile ([50a0dc](https://github.com/techniq/svelte-ux/commit/50a0dce499c226792899098d5ebbee69e0c6836c))
- Improve countdown example ([979557](https://github.com/techniq/svelte-ux/commit/9795571ac01f95bce12ececd13ba72639db6a491))
- [Lazy] Add `unmount` prop ([0e29bd](https://github.com/techniq/svelte-ux/commit/0e29bd3bb09965f2cb702c331f251aaffcd26681))

## 0.40.6

### Commits

- [InfiniteScroll / Lazy] Forward on:intersecting event for inspection ([ea6f3e](https://github.com/techniq/svelte-ux/commit/ea6f3e8ae4791c8c10ebb1d8a808c32e9cfd9168))
- Support hiding table of contents on some pages ([c05824](https://github.com/techniq/svelte-ux/commit/c058248e76cf842e3e7fef58625be73e96a136ec))

## 0.40.5

### Commits

- [ResponsiveMenu] Pass menuProps.class / drawerProps.class to applicable component (lost after recent change) ([39893b](https://github.com/techniq/svelte-ux/commit/39893bade011369f298cb93553441b00bfb27024))

## 0.40.4

### Commits

- [ResponsiveMenu] Do not lose '.ResponsiveMenu' class when passing additional classes via `class` ([f01b04](https://github.com/techniq/svelte-ux/commit/f01b04b0b3fdfbbac0dc095d4810546205f1ec0c))

## 0.40.3

### Commits

- Support passing portal target to Dialog/Drawer/Backdrop ([f27c5a](https://github.com/techniq/svelte-ux/commit/f27c5a8584d7cb66c283169270e981b37352556a))
- [ApiDocs] Change tooltip from "value" to "default" ([64300c](https://github.com/techniq/svelte-ux/commit/64300cd896cb04e6ec381c395137654fa67b5301))
- Point docs url to `+page.svelte` (instead of `+page.md`) ([a1bab8](https://github.com/techniq/svelte-ux/commit/a1bab81027a3030cdcfed6b51de009dd13ca6c25))

## 0.40.2

### Commits

- Add uniqueId() to top-level exports. Update all usage to consistently be "component-" prefix ([65642e](https://github.com/techniq/svelte-ux/commit/65642efc718af956cd89f9a187b4c172fbd1414b))

## 0.40.1

### Commits

- Add `createTheme()` to top-level exports ([5a97af](https://github.com/techniq/svelte-ux/commit/5a97afc0c24b5a5efced70665a01eb6fef93914a))

## 0.40.0

### Commits

- Add example for transparent blurry header ([edae0d](https://github.com/techniq/svelte-ux/commit/edae0d32615544435e7a2e93442274d8e6503bf2))
- [AppLayout] Rename `fullHeaderWidth` to `headerFullWidth` ([9bcc40](https://github.com/techniq/svelte-ux/commit/9bcc40f2644ab64ef3db48f9ccbab1e5242e863f))
- Update dependencies ([506e1d](https://github.com/techniq/svelte-ux/commit/506e1d94090e08a465b779627acaea35d7296e67))
- Keep date encoding examples in local time ([1e2cca](https://github.com/techniq/svelte-ux/commit/1e2ccab4fb9e6011b08054a8eeabcda1ca81ce35))
- Add explicit timezone to each Date for getParamConfig tests ([6e3d8c](https://github.com/techniq/svelte-ux/commit/6e3d8ca9e00ea047b98b29ba3958bf7963867c2e))
- Add format() to top-level exports. Add docs ([40becd](https://github.com/techniq/svelte-ux/commit/40becda02fc5244d9ae7f1ad6335910a1d955579))
- Add tests for `getParamConfig()` ([087524](https://github.com/techniq/svelte-ux/commit/087524e2cf81462126fb52d29db2042dd3555cd9))
- Remove build from CI action (done by Vercel publish) ([b2757a](https://github.com/techniq/svelte-ux/commit/b2757a973087bb8f250af06627eb7a221be7c14b))
- Setup vitest and github actions. Closes #17 ([6b9a5b](https://github.com/techniq/svelte-ux/commit/6b9a5b2926282a378677a7e05d6ad77eae6f8661))
- Merge pull request #61 from techniq/theme-support ([628dc4](https://github.com/techniq/svelte-ux/commit/628dc4dac8ba43aef0e75b4df2e78e4bd203ab3f))
- [MenuItem] Do not forward theme to internal Button instance ([58dac2](https://github.com/techniq/svelte-ux/commit/58dac2d674c7bc02e56e36b544e90e7ac03cf043))
- [ResponsiveMenu] Add "ResponsiveMenu" class to underlying Menu and Drawer for easier focus styling. Add example to docs ([4b7949](https://github.com/techniq/svelte-ux/commit/4b7949ea5bd0f769fb84bb7e0b4127bd2020163e))
- Fix ResponsiveMenu api docs ([75272d](https://github.com/techniq/svelte-ux/commit/75272d752d5f1d69a5493f600b551d5aee489059))
- Add Theme to NavMenu ([805e89](https://github.com/techniq/svelte-ux/commit/805e892ea61b5181e968de80d6073f4793edf07e))
- Add Theme component to easily wrap some components (particulary for docs). Using `createTheme()` directly is still preferred usage ([b1db0c](https://github.com/techniq/svelte-ux/commit/b1db0ce54c006a3728c32da5c33f98dbc65cd174))
- Cleanup ([45fcef](https://github.com/techniq/svelte-ux/commit/45fcef83b42146c7fcad62a226f3cea2b43526f0))
- Fix DateButton display after Button variant="filled" rename to "fill" ([7fd26f](https://github.com/techniq/svelte-ux/commit/7fd26f84d5345cab8361cd7abff64855e895d451))
- Update ToggleGroup usage after `variant="..."` change ([751def](https://github.com/techniq/svelte-ux/commit/751def781414631bd6b6383d1cc4165460fcf1d8))
- Improve Input example examples ([2a95be](https://github.com/techniq/svelte-ux/commit/2a95be66c1364af175ebb31a7fc7d890d6a2a9e5))
- Scroll to the top of <main> after navigate (since SvelteKit scroll handling only applies to body) ([8cc140](https://github.com/techniq/svelte-ux/commit/8cc14085766693a241f817841dc2aa1bdae810f4))
- Fix blockquote usage on TextField docs ([de01b8](https://github.com/techniq/svelte-ux/commit/de01b8f8a31a381eae94edccbdf137ae13427876))
- Improve header style selectors using `:not(.class *)` ([e27f80](https://github.com/techniq/svelte-ux/commit/e27f80aea99511b43dc9836269caf8c542a1a86b))
- Add more related components/actions ([9d7b94](https://github.com/techniq/svelte-ux/commit/9d7b949269ae374df0ac8a0c926fbe30f7775332))
- Support defining features via page load ([6a3f3e](https://github.com/techniq/svelte-ux/commit/6a3f3e294a7e8b20e2f95d0d4b27b1bd42580391))
- Add cls() to top-level exports and add docs page ([f3318b](https://github.com/techniq/svelte-ux/commit/f3318b6d53ffb154210417ed77d10ac38e9319af))
- [AppLayout] Simplify switching between full height nav (default) and full width header ([903255](https://github.com/techniq/svelte-ux/commit/90325513aaf5ee785f1b955be1aba5b43d416857))
- Change side nav background to palette color ([4f5249](https://github.com/techniq/svelte-ux/commit/4f52497d01e9b867f73b581d5a54420a242a91ee))
- Improve docs ([cdf3d1](https://github.com/techniq/svelte-ux/commit/cdf3d13387811f09e5ff8fce4cde49b9019e8afb))
- [ButtonGroup] Support passing `size` to underlying Buttons ([3f140b](https://github.com/techniq/svelte-ux/commit/3f140bad28b51c89d07ec9cc6c76297ea6394ba9))
- Remove all styling from NavMenu, move to +layout / theme ([30a3e2](https://github.com/techniq/svelte-ux/commit/30a3e2dcfcdb1fc4cb861f82076e22c61ef1528c))
- [ToggleGroup] Use `variant` instead of individual properties ([998b46](https://github.com/techniq/svelte-ux/commit/998b4652b3d82639c8cb623d75d102329dbc13b1))
- [Button] Add `variant-{variant}` class to allow easy per-variant customization (theme, classes, etc) ([edd4dc](https://github.com/techniq/svelte-ux/commit/edd4dcafa5b78b98b7766a75735664921aede42e))
- Add remaining theme references to components ([a84981](https://github.com/techniq/svelte-ux/commit/a849811dde93b7a6aecf988e1ff9d8133057429e))
- [ExpansionPanel] Add classes and theme support ([4b881f](https://github.com/techniq/svelte-ux/commit/4b881f462b9acf4ce831b243ddeebb654ca05a81))
- Add NavItem docs and reset theme on docs ([c60298](https://github.com/techniq/svelte-ux/commit/c6029887b0d7791586b449b9567f9258a358d882))
- Move defined colors in Appbar, AppLayout (nav), and NavItem to theme ([4a8366](https://github.com/techniq/svelte-ux/commit/4a8366bf5ce35ca8ebf23442e7c6cd1827ef876a))
- Add more theme usage ([23db96](https://github.com/techniq/svelte-ux/commit/23db963773b77e0928c37de308638270c6b6d3e8))
- [Button] Add jsdoc @type to `classes` to fix api docs (sveld) ([a9a76d](https://github.com/techniq/svelte-ux/commit/a9a76d1834b0e6c89eff155171df5082aec4b0fe))
- Improve Theme type key (component name) and value (classes prop based on component, or string) ([38911c](https://github.com/techniq/svelte-ux/commit/38911c32b5374693c968491612e2f7d7c01f09dd))
- Add theme to AppLayout ([089eb7](https://github.com/techniq/svelte-ux/commit/089eb7cad5dc91cf0571f0155e8ecb33bd25ebbb))
- Start customizatoin docs page ([dc0541](https://github.com/techniq/svelte-ux/commit/dc0541e91fb951c8285bea72fca8ea354b8eb03f))
- Simplify using theme by always returns an object and use `theme.root` in place of `class` string ([3d710e](https://github.com/techniq/svelte-ux/commit/3d710e957df670e7ce6c2c3e93a950a6c6c4cfcf))
- Start to flesh out component theme support (passing class/classes via context) ([51c6e4](https://github.com/techniq/svelte-ux/commit/51c6e41306e7866c6c46fcecbc4b7d1d43e94d65))
- [ButtonGroup] Add get/set functions to add types and simplify usage ([ee1597](https://github.com/techniq/svelte-ux/commit/ee1597ccca36fb7c1041366a051650d9c2d4b90c))
- Fix ButtonGroup > Button classes after class update ([203911](https://github.com/techniq/svelte-ux/commit/203911323e5958ade694ce31df701f20ee05771c))
- Add ComponentName as class for most component's top-level elements to allow `:global(.ComponentName) { ... }` styling and easier devtool identification ([f19a3b](https://github.com/techniq/svelte-ux/commit/f19a3be82cabc3880d780dff2d809491b278818f))
- Add app.d.ts ([541fb9](https://github.com/techniq/svelte-ux/commit/541fb96e28f3616dfb94667276cbe0affa2095d0))
- Rename CircularProgress to ProgressCircle (better match for Progress (bar)) ([c81a67](https://github.com/techniq/svelte-ux/commit/c81a6766a9d6d261c2245b0ee07bf664a6fdcc6e))
- Remove old deprecated SvelteAction type ([fa63d9](https://github.com/techniq/svelte-ux/commit/fa63d960d4538ec524bc593b067bea43144bc4ec))
- Add placeholder +page.ts / load() for all doc pages ([dd8a13](https://github.com/techniq/svelte-ux/commit/dd8a130321d359b0d03b93ccfca4af91b7bec85f))
- Remove Stack from CircleProgress docs ([a295be](https://github.com/techniq/svelte-ux/commit/a295beb70c42753ac8c5f0bcaa9dd32bf67f7a09))
- Add progress bar. Resolves #52 ([f9ab41](https://github.com/techniq/svelte-ux/commit/f9ab41193f96420a624e43365ed8eab41e3b44fe))

## 0.38.0

### Commits

- [Field] Do not render label element when label not set ([7c9bfd](https://github.com/techniq/svelte-ux/commit/7c9bfdbd005930541e91f9987a36c348255aec29))
- Improve a lot of types, particularily with actions and utils. Begin to seutp typedoc ([1cec99](https://github.com/techniq/svelte-ux/commit/1cec995845b9ff03676424d1f5bb06231ea0e24e))
- Remove deprecated `fly` and `horizontalSlide` transitions (built-ins now support use cases) ([28c59a](https://github.com/techniq/svelte-ux/commit/28c59a9d116ab1003f2e5dfe5670573ee1f96359))
- Use `Action` / `ActionReturn` types from `svelte/action`. Always use named exports (no default) ([4f8012](https://github.com/techniq/svelte-ux/commit/4f8012b324a1e2911d03cf1ab0b33b04560c8757))
- [AppLayout] Allow passing `areas` for more control (ex. full-width header). Use `style:--var` instead of `cssVars` actions. Add `classes` prop. Leverage more tailwind JIT ([8f0b89](https://github.com/techniq/svelte-ux/commit/8f0b89c0779860cf1885083f61e55619a7cb0b9b))
- [Table] Requiring setting `column.html` to protect from {@htm}l XSS vulnerability ([872fa2](https://github.com/techniq/svelte-ux/commit/872fa2d89b7a1d6fabf528ae68ba3a1edb856652))
- [Table] Support passing html for format, and add example for custom markup ([00dc24](https://github.com/techniq/svelte-ux/commit/00dc245d7cad25dd7490a898de72e386d5e141cf))

## 0.37.5

### Commits

- [MenuField] Add `change` event, fix types, and add "Empty selection" example ([8b5486](https://github.com/techniq/svelte-ux/commit/8b54864045f0e4cf4e69ca2969103918540712f3))

## 0.37.4

### Commits

- [ButtonGroup] Move @apply classes to tailwind arbitrary variants ([f9eaeb](https://github.com/techniq/svelte-ux/commit/f9eaeb61c11022216a2b9cd3372f3527cb5cf1a7))
- [ScrollingNumber] Add ButtonGroup examples ([1e803e](https://github.com/techniq/svelte-ux/commit/1e803e1f5738f0c69e69f2c1dc8269d0fe41c611))
- Update timerStore usage ([9358de](https://github.com/techniq/svelte-ux/commit/9358de471e3b59a668a067ecc6275d950e011e47))
- Add Tilt to NavMenu ([b09bde](https://github.com/techniq/svelte-ux/commit/b09bdef296e33b5b3831e6d15d8f82b7f765523c))
- [ScrollingNumber] Use stacked grid elements instead of relative/absolute position to not require root height matching value line-height ([965115](https://github.com/techniq/svelte-ux/commit/9651158f7c05d8bcdb13ef89f813fa8e07f38555))

## 0.37.3

### Commits

- [TextField / Input] Add autocapitalize prop (<input> attribute) ([bf2eb0](https://github.com/techniq/svelte-ux/commit/bf2eb035a234b960fa5bce3ccd1d24b4ee7fc0e1))
- [ScrollingNumber] Only preventDefault for handled keys (up/down) and fix API docs ([907fb1](https://github.com/techniq/svelte-ux/commit/907fb1601465e68b9ce32d3f21183d05fc08249f))

## 0.37.2

### Commits

- Add Tilt component. Resolves #48 ([987a20](https://github.com/techniq/svelte-ux/commit/987a20e0f8ad11194bf27635243a368489790b00))
- Add ScrollingNumber to top-level exports ([89aec1](https://github.com/techniq/svelte-ux/commit/89aec1a66da78e963ad3dac3b1cc2158b6e23746))
- Add note about keyboard shortcuts ([898ad4](https://github.com/techniq/svelte-ux/commit/898ad4aea3d2ff08f6555e6c69bd370bd7febb5b))
- [TextField] Add show password toggle button when `type="password"` ([d155db](https://github.com/techniq/svelte-ux/commit/d155dbf4a5056331fc31dc2d786ff4c83fb7fb6c))
- Stop countdown by default ([036eb8](https://github.com/techniq/svelte-ux/commit/036eb8ad685ad431caf3f92a328ffe210dcbe55c))
- [ScrollingNumber] Prevent keyboard default ([faf59d](https://github.com/techniq/svelte-ux/commit/faf59d383abaa01cd690d5d9bf34fe176f9b3fe8))
- Merge branch 'master' of https://github.com/techniq/svelte-ux ([e990f0](https://github.com/techniq/svelte-ux/commit/e990f094093fd65f7a598ab240e8229c3ac87423))
- [ScrollingNumber] Add keyboard shortcuts ([1c1ac0](https://github.com/techniq/svelte-ux/commit/1c1ac0dc629c2a7b2a07c13e85c580d2456d9be1))
- [ScrollingNumber] Add countdown example ([2a559e](https://github.com/techniq/svelte-ux/commit/2a559ec837ac501ffb4ca3f338245e4468161094))
- [ScrollingNumber] Add countdown example ([7dfc95](https://github.com/techniq/svelte-ux/commit/7dfc95b99a8fa40008699e5f1d1fa09c4e3db167))
- [timerStore] Allow setting initial value and getting current value in `onTick`. Allow setting value, and resetting to initial. Fix isRunning by changing to store. ([32eaf3](https://github.com/techniq/svelte-ux/commit/32eaf3e4ed745bc320170297f715bb348e887ce9))
- Add ScrollingNumber component ([587175](https://github.com/techniq/svelte-ux/commit/5871756fd3928a0b5c05d26bc410000367b906fa))
- Add more related references ([8ed258](https://github.com/techniq/svelte-ux/commit/8ed25839182115f35d19a26ff9175037b6e22b52))
- Add popover aciton docs. Support adding `related` to docs data ([832f7c](https://github.com/techniq/svelte-ux/commit/832f7cfe1f7e90a5b029c98c5bcb59e7c88b51e4))
- [use:overflow] Consolidate overflow events ([eef627](https://github.com/techniq/svelte-ux/commit/eef62724ceda55bada24e39563e3712b42e7a4b3))
- Add `.scrollbar-none` tailwind util ([7a1321](https://github.com/techniq/svelte-ux/commit/7a1321abec162e56c25106b5062182ad7468385e))
- Always show Code/Preview copy buttons on top (with background blur) ([42706d](https://github.com/techniq/svelte-ux/commit/42706d1b58b5020b473c7ce95e3e9098b7891818))
- Cleanup ([30bc90](https://github.com/techniq/svelte-ux/commit/30bc90337a2ada4fd580c2015d0b364dbfdb41a5))

## 0.37.1

### Commits

- [TextField] Pass `name` to input ([3d6dec](https://github.com/techniq/svelte-ux/commit/3d6dec1b5bfb845249fa14bd62b081aeda550ff5))
- [AppLayout] Add example ([19d069](https://github.com/techniq/svelte-ux/commit/19d069a1a3f03e755dec7d5ff6a98dad342a6eea))
- Update `+layout.svelte` in getting started ([103f38](https://github.com/techniq/svelte-ux/commit/103f38ccc050ed6dfe86a622c7bee648c42a5f81))
- [QuickSearch] Update search button to better support smaller viewports ([b6cda0](https://github.com/techniq/svelte-ux/commit/b6cda00d253fa843bd70e93dcc3ca7cb7c4fc652))
- [Button] Set `pointer-events-none` on underlying `<Icon>` (visible mobile only) ([57a769](https://github.com/techniq/svelte-ux/commit/57a769742c7f5a765056dceace7abc3bc69f3bbc))
- [paginationStore] Show from as `0` instead of `1` when `0` total ([309d8d](https://github.com/techniq/svelte-ux/commit/309d8d89aed114aefbb57ce9562d7b6e84eacac5))

## 0.37.0

### Commits

- Fix use:interaction options typing ([8e80f0](https://github.com/techniq/svelte-ux/commit/8e80f096449e557cc2e96eca7ff1fda4b89673a4))
- Add use:intersection examples ([5e55b0](https://github.com/techniq/svelte-ux/commit/5e55b0d744725094f47ac2872cd20e7b75eece3e))
- Update all action docs from +page.md to +page.svelte. Improve dataBackground and observer pages ([ade335](https://github.com/techniq/svelte-ux/commit/ade335b883ce15afd76b0d8d4e0b4206fa7c6b46))
- [Field/TextField] Support passing label, input, and error classes ([0471ca](https://github.com/techniq/svelte-ux/commit/0471ca7faca2368b10a116e8514ac52c6df6aefe))
- [NumberStepper] Support passing min/max ([1c45cd](https://github.com/techniq/svelte-ux/commit/1c45cd74dcf1de95ebff3daca8a385e2d1048efc))
- [Popover] Open dispatch `close` if open. Fixes quickly toggling multilple button/menu's while transitions, calling `clickOutside` to fire a close event ([ddada6](https://github.com/techniq/svelte-ux/commit/ddada626e9a862ab91441e8f26d128675643c76e))
- Update queryParamStore/queryParamsStore to take props object instead of individual arguments ([a6b6c7](https://github.com/techniq/svelte-ux/commit/a6b6c7c24cfb0658297277b6adee5564fd358c47))
- Improve matchMedia docs ([2828ae](https://github.com/techniq/svelte-ux/commit/2828aefe6f339b5358a71cbbb7185ddd67cd64c0))

## 0.36.1

### Commits

- Speed up transition durations for Button (300ms => 200ms) and MenuItem (300ms => 75ms) ([326bd0](https://github.com/techniq/svelte-ux/commit/326bd0c7002de81d49580a326ae4c09b9dc0e5c5))

## 0.36.0

### Commits

- Add ReponsiveMenu component ([f45f70](https://github.com/techniq/svelte-ux/commit/f45f7046ddc89c5f07772f5f6e88aca1441237a4))
- Refine matchMedia(string) store and add convenient matchMediaWidth(number) and tailwind-inspired smScreen/mdScreen/etc ([85625d](https://github.com/techniq/svelte-ux/commit/85625dc619a92356f504fb16c58db4bc8684911c))

## 0.35.7

### Commits

- [Tooltip] Only show when tab-focused (:focus-visible) and not click-focused. Close when clicked (if already focused and re-moused over) ([98ceb3](https://github.com/techniq/svelte-ux/commit/98ceb370de8d2f4e4266769a1f1bb6ac76960584))
- Change layout.js to layout.ts ([d20eef](https://github.com/techniq/svelte-ux/commit/d20eef47443712c8140da23e1e56fd1016bfb005))
- Add `lang="ts"` to .svelte <script> blocks (recently migrates from .md) ([316ab3](https://github.com/techniq/svelte-ux/commit/316ab30bea60888737d10b1385580ea76dd65ced))
- [portal] Improve possibly null handling ([b628d8](https://github.com/techniq/svelte-ux/commit/b628d8247b3b43cec28802025063144b295f2bd6))
- [MenuItem] Center content by default ([100021](https://github.com/techniq/svelte-ux/commit/100021622c720cd97ce4589ad3c0701b912c76f9))

## 0.35.6

### Commits

- Cleanup types on MultiSelect components ([b5f06b](https://github.com/techniq/svelte-ux/commit/b5f06b6869853580ca4f89fd8ccae9729e089f00))
- [MultiSelectMenu] Support passing placeholder to inline TextField ([0ceb14](https://github.com/techniq/svelte-ux/commit/0ceb14d5701992f471ee27cb1346dfa20c4a6d87))

## 0.35.5

### Commits

- [MultiSelectOption] Support passing `class` and `classes` props ([2cae52](https://github.com/techniq/svelte-ux/commit/2cae52b3dcbf8c31421a35de6d03b965fe04db64))

## 0.35.4

### Commits

- [MenuSelectMenu] Fix MultiSelectOption import ([7b6641](https://github.com/techniq/svelte-ux/commit/7b66417f5e57654a172821ed7114e655c5b585a0))

## 0.35.3

### Commits

- [MultiSelect(Menu|Field)] Support passing `option` slot to underlying `MultiSelect` ([a55a35](https://github.com/techniq/svelte-ux/commit/a55a352abecaebe37d402b7891770c4aebdadc37))
- Fix duplicate "Examples" menu item ([016622](https://github.com/techniq/svelte-ux/commit/0166220322053cfd8328e6783ae6f05bb970802f))
- [TableOfContents] Add bullet points and refine indention ([36b6ba](https://github.com/techniq/svelte-ux/commit/36b6bae038219b9a8e6b0268966a150b12565f86))
- Add resize action examples ([4727f2](https://github.com/techniq/svelte-ux/commit/4727f2c679f4f6df61bcdf4ce1bf4c53ee9a0a96))
- [Button] Support passing props to Icon ([469828](https://github.com/techniq/svelte-ux/commit/469828d378d7813b0264dc401cc4d69a9db696e0))
- [Button] Update basic example ([750cb3](https://github.com/techniq/svelte-ux/commit/750cb3ef73ed9b07a0ccf1717486d87afba41ad7))
- [Tooltip] Improve types ([dab3ea](https://github.com/techniq/svelte-ux/commit/dab3ea34a9b89253e56e8d2c519969dea31ebb31))
- [MenuItem] Pass classes.root to `class` so not overwritten by default `class` styles (hover, etc) ([284718](https://github.com/techniq/svelte-ux/commit/2847186ae126dde6b555aa81c2576e42341dd8c6))
- [Menu] Use Button as anchor instead of unneccessary (and less accurate) <span> wrapper ([8baf1d](https://github.com/techniq/svelte-ux/commit/8baf1dce0a886a809de2fe34d9a334d45dc831b9))
- Fixup some types ([f851db](https://github.com/techniq/svelte-ux/commit/f851dbb204047e05cc0c26e42eefbb73916609b7))

## 0.35.2

### Commits

- [Drawer/Dialog] Fix close-attempt firing on all keypresses ([9e0473](https://github.com/techniq/svelte-ux/commit/9e047326950a44a6cce36bf6da399a2e36641324))
- [Button] Add gray color ([c5170a](https://github.com/techniq/svelte-ux/commit/c5170a511f6de5afd365d8e9707f37e1af3b0af4))
- [Button] Add icon placement examples ([3fb288](https://github.com/techniq/svelte-ux/commit/3fb288973f0dd12508baca8e02db2f0833e58ec1))

## 0.35.1

### Commits

- Rename `isDirty` to `isChanged` to better match the example ([9fb63c](https://github.com/techniq/svelte-ux/commit/9fb63c530dca02a67303c57c72aa110b1a55b98a))
- Allow overwriting doc title and update grid/stack tailwind docs ([2d726e](https://github.com/techniq/svelte-ux/commit/2d726e46c470d54641ff97c14e0483f577097d39))
- [Dialog/Drawer] Dispatch `close-attempt` event to support confirmation prompts when changed ([e9ddc4](https://github.com/techniq/svelte-ux/commit/e9ddc4c3754b9df83035b2561862e0071888cbfb))

## 0.35.0

### Commits

- [Drawer] Consolidate `top`/`bottom`/`left`/`right` props to `placement="..."`. Change default to `right` instead of `left` ([8925f4](https://github.com/techniq/svelte-ux/commit/8925f4c79129adbf879cb0c88076a8c0a18f4a04))

## 0.34.0

### Commits

- [Button] Rename variant `outlined` => `outline`, `filled` => `fill`, `filledOutlined` => `fill-outline`. Add `fill-light`. Improve ButtonGroup examples ([d7fa4e](https://github.com/techniq/svelte-ux/commit/d7fa4e7c65c6ec3d2218c4f1f582cb08b1c14fe3))
- [ApiDocs] Add border to help cropping of sides when using `overflow-auto` on container ([d4a703](https://github.com/techniq/svelte-ux/commit/d4a7036571d53f8439ea33e77f9104f420be3ce0))
- [Duration] Add leap year comparison example ([39a681](https://github.com/techniq/svelte-ux/commit/39a681e68a836636fbae49e4cba45496e819762f))
- [Duration] Refine util examples ([9ca8b0](https://github.com/techniq/svelte-ux/commit/9ca8b0f21d659d0b3575c852906ba81a1239f89e))
- [Duration] Fix `<Duration minUnits={DurationUnits.Year} />`. Add ApiDocs ([d84703](https://github.com/techniq/svelte-ux/commit/d84703192e1ae4cfa041fb87fd638637aad79b34))
- Update QuickeSearch to handle +page.svelte along with +page.md ([ab4bf9](https://github.com/techniq/svelte-ux/commit/ab4bf9d043fa7dc4d635911dbf6408816fadcdc1))
- Rename most component docs `+page.md` to `+page.svelte` (no longer use markdown/mdsvex for those pages). Issue #53 ([ea32c9](https://github.com/techniq/svelte-ux/commit/ea32c9313921711a4cb15e277e5b8602c7c84337))
- Update vite-plugin-sveld types ([74b180](https://github.com/techniq/svelte-ux/commit/74b180429d729f84316023e2608715bf1748345f))
- Replace all markdown blockquotes (> TODO) with <Blockquote> component. Add `$docs/*` alias ([06990b](https://github.com/techniq/svelte-ux/commit/06990bc04bf54269457d209ce75ec5cfad1103fc))
- Replace all markdown headers (# Foo) with elements (<h1>Foo</h1>) ([56b8a5](https://github.com/techniq/svelte-ux/commit/56b8a549d4e340ec18abf2d54cd483fdfa4b5a0a))
- [TableOfContents] Add any missing `id` attributes to headers ([aa89d1](https://github.com/techniq/svelte-ux/commit/aa89d11bf42eb4c65bc0e31e385c98b0eb5ee0fa))
- Improve variable names ([50ba19](https://github.com/techniq/svelte-ux/commit/50ba1957db6696831b31e37beea853517c8a9fe3))
- [Code] Fallback to `text` if language/grammer not found ([a9fc4c](https://github.com/techniq/svelte-ux/commit/a9fc4ca0915368b873acf27cd72ef753afb89bda))
- Add ToggleButton description ([eaa164](https://github.com/techniq/svelte-ux/commit/eaa164305dbeaf1d724fc9b8c8b59f591e984a90))

## 0.33.10

### Commits

- [Icon] Swap svg and url detection now that we check includes() vs startsWith() (fix FA urls in svgs) ([a146b0](https://github.com/techniq/svelte-ux/commit/a146b0000bbf6926258a6c9c2d987332e509a25f))

## 0.33.9

### Commits

- [Icon] Relax detecting `http` and `<svg` strings (can include whitespace, `<?xml`, etc) ([4f280f](https://github.com/techniq/svelte-ux/commit/4f280feedcb45fc1f5271fc85c8ead2392ae0975))
- Change Pagination slot example to show "Page x of y" ([9dae9c](https://github.com/techniq/svelte-ux/commit/9dae9cfc0a542546145753896131e50db655ec81))
- [Pagination] Use autoPlacement for rows per page ([7f8440](https://github.com/techniq/svelte-ux/commit/7f84409c629692b738fd6e6f46a5dbffb9eef6a0))

## 0.33.8

### Commits

- [Badge] Support passing class for simply styling ([4c0ec4](https://github.com/techniq/svelte-ux/commit/4c0ec4dfa9f104ec6d95463ccc71273ef952ecf7))
- [TableOfContents] Fix hot reloading sometimes not finding and allow changing the reference element (default to <main>) ([7f2ca4](https://github.com/techniq/svelte-ux/commit/7f2ca4f29aa15a4594990f996c38be92c5fa16b0))

## 0.33.7

### Commits

- Move prismjs to peerDependencies and move `Code` from top-level exports to not require ([3a2d5c](https://github.com/techniq/svelte-ux/commit/3a2d5c8c9437c6f2326e6bfc12f860996e59df1e))

## 0.33.6

### Commits

- Update dependencies ([c411f5](https://github.com/techniq/svelte-ux/commit/c411f5d6001e8dc38ee7c2e565435d2be00313b6))

## 0.33.5

### Commits

- [Button] Use flex gap on <button> instead of margins on underlying Icon/CircularProgress. Allows for hidden text via media query, and is simpler ([e18aed](https://github.com/techniq/svelte-ux/commit/e18aed46122da8dac01b2432e9011a5aa62c94f4))

## 0.33.4

### Commits

- [ApiDocs] Allow descriptions to wrap, but still maintain carriage returns. Improve layout of slot props and other pills ([7cb9ef](https://github.com/techniq/svelte-ux/commit/7cb9efdd6ee6e6ded09680f46906d6b5bb8e9f39))
- Remove console.log ([0d49d8](https://github.com/techniq/svelte-ux/commit/0d49d86b98044a21b3e984e8c91b99e89915c379))
- Cleanpu some console.logs ([64cf0c](https://github.com/techniq/svelte-ux/commit/64cf0c957de981484f3a4d2daf666e5b5fb53433))

## 0.33.3

### Commits

- Move QuickSearch to components ([41c4f6](https://github.com/techniq/svelte-ux/commit/41c4f6a4fffc3d78223dd1c08bcf8516cb187494))
- Build QuickSearch options within +layout.svelte ([a13bbc](https://github.com/techniq/svelte-ux/commit/a13bbcbe0714d4042da8c86be59b15e9ecb71a14))
- Cleanup some type errors ([fa60d1](https://github.com/techniq/svelte-ux/commit/fa60d1f4f0ce21df42469c142ef78979b657693a))
- Cleanup console.log ([565818](https://github.com/techniq/svelte-ux/commit/565818cd6856ee8eb5c68dab0c96e317dc0b1dd6))
- Expose Logger util as top-level export and add docs ([0bb985](https://github.com/techniq/svelte-ux/commit/0bb985162c2ed1bf929db1f6a2cf5a26d4ae593e))
- [Switch] Support checked={null} ([29f66b](https://github.com/techniq/svelte-ux/commit/29f66befbcd6cdbd2b91ab6dfbf70920b3a1d3bf))
- [Switch] Reduce padding 1px ([82c2c3](https://github.com/techniq/svelte-ux/commit/82c2c311c57a42ae07232d17f5161f9d97ffdf7d))
- [QuickSearch] Set to a fixed position ([182331](https://github.com/techniq/svelte-ux/commit/1823316391ee8196834000fbf69ee2da075e8977))
- Add basic quick search for docs ([f595b3](https://github.com/techniq/svelte-ux/commit/f595b39fde2f1a7806c555c6d38fbd23f32fd8d5))
- [Switch] Support passing classes to underlying element. Add color prop. Set data-checked for advanced styling ([9af9af](https://github.com/techniq/svelte-ux/commit/9af9af255fc9830034e5532e239ffdd0d48fe6e1))
- Add TailwindColors type ([0150b2](https://github.com/techniq/svelte-ux/commit/0150b27e6973b3e5849acf5b45eb7bdf5dcf1788))
- [Dialog] Do not show actions container if actions slot not passed ([0a348b](https://github.com/techniq/svelte-ux/commit/0a348b7006b34860ba0d18c8552c3288491fe573))
- [DatePickerField] Only show header when selection available (and transition in/out) ([e7ebbe](https://github.com/techniq/svelte-ux/commit/e7ebbe7ff30f7c5eeb7449d02383542d24e72bda))
- Add @deprecated markers for `fly` and `horizontalSlide` transitions since Svelte's built-in ones now handle their intended use cases ([d0e126](https://github.com/techniq/svelte-ux/commit/d0e12601fc8098578d865cb66fb9989e876bd8ee))

## 0.33.2

### Commits

- [Form] Support passing schema to underlying `formStore` and expose errors as slot prop ([e2cb77](https://github.com/techniq/svelte-ux/commit/e2cb773a8015c824d59ae2c57202b876e66cbb33))
- [Field] Add examples for using `<input type="number">` and `Input` component ([94cf41](https://github.com/techniq/svelte-ux/commit/94cf41040ca9c753ce250dbca8c9348589bf2d60))
- [Input] Forward onkey event ([518806](https://github.com/techniq/svelte-ux/commit/5188066fb05d93b529a2e6a7a5fc117a3c229b05))

## 0.33.1

### Commits

- [MultiSelectField] Dispatch own `change` event instead of forwarding MultiSelectMenu. Allows dispatching `change` on clear and simplifies event details ([32168f](https://github.com/techniq/svelte-ux/commit/32168f556af819fba167ed178ae866aac8055a2c))

## 0.33.0

### Commits

- [movable action] Fix step/stepPercent drifting over time ([4de038](https://github.com/techniq/svelte-ux/commit/4de038ac2f366c78f34eb8f13c3ceeed26e4de65))
- Rename `pannable` action to `movable` (and related events) ([fb34a8](https://github.com/techniq/svelte-ux/commit/fb34a80d76c74b19602e7ebe1da7dc9cfe99baed))
- [Preview] Remove unneeded overflow ([26f9f3](https://github.com/techniq/svelte-ux/commit/26f9f333f5cd01535c4491f48e3e88cce2f34a3d))
- [Checkbox/Radio] Use label left padding instead of flex gap to fix dead zone between input and label ([b92006](https://github.com/techniq/svelte-ux/commit/b9200691ac6a095a2613ab07dc79c688b7107c32))
- [MultiSelectMenu] Enable autoPlacement by default ([b2ac46](https://github.com/techniq/svelte-ux/commit/b2ac467910b36812129b9d6e674f49289e399130))
- [TextField] Improve layout of type examples ([28a7c5](https://github.com/techniq/svelte-ux/commit/28a7c56c7b1bcd1c139571203bc006d6d867594a))
- [TextField] Set inputmode based on type for better software keyboard ([8eecbe](https://github.com/techniq/svelte-ux/commit/8eecbe461ab1a93c8aaa1a6f853e9ef21aaf0ba1))
- [NumberStepper] Select on focus for easier replacing of value ([bdf6c9](https://github.com/techniq/svelte-ux/commit/bdf6c94d5d8f2329ae2e92075a174fe412d9eea8))
- Add NumberStepper component ([05e8f2](https://github.com/techniq/svelte-ux/commit/05e8f216829affa5e16ca931b261689d6b83e09a))

## 0.32.3

### Commits

- Add `overflow-none` to Preview and main doc container ([9845e1](https://github.com/techniq/svelte-ux/commit/9845e1f159937055b86337a55ac4d93b01d3ce6a))
- Only inject Preview `code` prop if not already set ([7f6394](https://github.com/techniq/svelte-ux/commit/7f6394b5a96cf85151963e03b73ad24e40f6c0d9))
- Remove remark codePreview plugin (replaced by svelte preprocessor) ([c081d2](https://github.com/techniq/svelte-ux/commit/c081d25b6c9edd527603224d79b9890217593e88))

## 0.32.2

### Commits

- Install prismjs and prism-svelte as dependency (for Code/Preview components) ([3f88e6](https://github.com/techniq/svelte-ux/commit/3f88e6559ae45ddbdb9a87e594bced937a9672ec))

## 0.32.1

### Commits

- [MultiSelectField] Fix seaching by `searchText` from MultiSelectMenu to MultiSelect ([e6e698](https://github.com/techniq/svelte-ux/commit/e6e6985cf73768b4640c66a845294cb03f18eebc))
- Add `id` to Usage header to allow linking / scroll highlighting ([37ba11](https://github.com/techniq/svelte-ux/commit/37ba11fdcbfd4e36f742d170e7fcbb2495f79d3c))
- Add TableOfContents docs ([dede99](https://github.com/techniq/svelte-ux/commit/dede99fd3e8ea0d72f670361f4bbac93e1ee9024))
- Add usage example to all components ([60373c](https://github.com/techniq/svelte-ux/commit/60373c496d7df19f2933b388be53489515012f0a))
- Add Code component ([b5cab0](https://github.com/techniq/svelte-ux/commit/b5cab09bd8802f7f435d89d55f91981fe1e83ee2))
- [TableOfContents] Add hover class ([200429](https://github.com/techniq/svelte-ux/commit/2004292406a24ac106916c1931ccbe18246d40a5))
- [TableOfContents] Do not highlight if `id` not set on item ([14980c](https://github.com/techniq/svelte-ux/commit/14980c05de5337801b4d5b66754a98e9ed688224))
- [Badge] Improve docs toc/headers ([83931a](https://github.com/techniq/svelte-ux/commit/83931af966b3af8d9ca67623486560c99f515f5e))
- [Preview] Support passing props to preview (class, language, showCode, etc) ([9d6028](https://github.com/techniq/svelte-ux/commit/9d60287c8621d365580d94d3de3f6458c28a4f6b))
- Replace codePreview remark plugin with svelte preprocessor ([b3351f](https://github.com/techniq/svelte-ux/commit/b3351f65ce3461d590e7f36d520bb692bfb6a564))
- [Icon] Update features ([4a4c90](https://github.com/techniq/svelte-ux/commit/4a4c9043328859f39eae56cb32fdcd96b24f0c3b))
- [TableOfContents] View headers as html ([afacdc](https://github.com/techniq/svelte-ux/commit/afacdcbadb88ae0acfe0e5f14fb18e4371fa423b))
- Remove load() explicit types ([d437f8](https://github.com/techniq/svelte-ux/commit/d437f80a2d236d9391d913a852d46a7b50198c86))
- Rebuild sidebar toc when page changes ([b99b1d](https://github.com/techniq/svelte-ux/commit/b99b1df3ea71d0f4a3bf40e9a5755a3c31c1bccf))
- Reorder MenuField example ([f88c5a](https://github.com/techniq/svelte-ux/commit/f88c5a34298e429982765e703544b0fc96a4c9ad))
- Improve tsconig.json (fix `./$types` import), enable strict. Move `description` under `meta` ([f263dd](https://github.com/techniq/svelte-ux/commit/f263dd8219c81ed610788f4a970f0f0eeb526f0c))

## 0.32.0

### Commits

- [TableOfContents] Highlight active heading based on scroll ([609b04](https://github.com/techniq/svelte-ux/commit/609b049206a8d377d65ae7f3fd30124f26338e2e))
- [AppBar] Ignore null title items ([d1f308](https://github.com/techniq/svelte-ux/commit/d1f3085bec4120f994912641a6485d38113e6a8e))
- Fix +error.svelte ([161dc4](https://github.com/techniq/svelte-ux/commit/161dc4f9fba7213d625a072c0daf3443e09abb10))
- Replace remaining frontmatter (i.e. `description`) with +page.js `load()` ([0a1204](https://github.com/techniq/svelte-ux/commit/0a12049ed185a06e77fa38058c4668461df204da))
- Remove/replace markdownToc() svelte preprocessor with simple $page.url.pathname regex and remove/cleanup most mdx frontmatter ([21ccaa](https://github.com/techniq/svelte-ux/commit/21ccaac7752a955588975e074caf19562eb80263))
- [cssVars] Fix example clearing values due to binding to object properties ([bf72e4](https://github.com/techniq/svelte-ux/commit/bf72e4df567ec3a688f63f09832f6db5c67ca562))
- Fix action docs ([4ff79c](https://github.com/techniq/svelte-ux/commit/4ff79cdd4783d8eda63eb58f27880764a425f0d4))
- Move TableOfContents to components and add to top-level exports along with TreeList. Change classes to accept string or function. Rename items to nodes ([72f7b1](https://github.com/techniq/svelte-ux/commit/72f7b1e473f1ba661a60a0a5b461eeaae5c003ae))
- Remove docs +layout.svelte and move AppBar/<main> to root +layout.svelte. Fixes homepage layout ([cec6e3](https://github.com/techniq/svelte-ux/commit/cec6e30e825e7871a9e0ce859148f17bd05698bb))
- Rename ListTree to TreeList ([ea0bba](https://github.com/techniq/svelte-ux/commit/ea0bba02f988507f9cc2e6e16dcc59edfb1077bb))
- Cleanup ([6c8043](https://github.com/techniq/svelte-ux/commit/6c8043b6d7011e067719283414396d240155f151))
- Replace toc svelte preprocessor with much simplier and flexible TableOfContents component using new ListTree. Add `buildTree()` array util ([578336](https://github.com/techniq/svelte-ux/commit/578336d0a4e1124e56ec07f65a477e28b5c6f368))
- Add ListTree component to recursively rendering ul/li elements ([b50181](https://github.com/techniq/svelte-ux/commit/b50181565f8e4055323bdc422c6bc12ce2867e7f))

## 0.31.2

### Commits

- Improve layout by moving toc to right (sticky on scroll) ([0fd161](https://github.com/techniq/svelte-ux/commit/0fd16188368f14eadbb37bb39cd41e35ee0d406c))
- Scan .js files for tailwind classes (pickup svelte.js plugin usage) ([b94f7f](https://github.com/techniq/svelte-ux/commit/b94f7fa03fa4fb9f4dd147d909f5e326099a1bdf))
- Shrink copy code button slightly ([73adf6](https://github.com/techniq/svelte-ux/commit/73adf6103d1606e92f65001eee5ed0e64f958d15))
- [ToggleGroup] Add examples for null/undefined options ([e5652e](https://github.com/techniq/svelte-ux/commit/e5652ece8c77769358dae818cab425f527859d23))

## 0.31.1

### Commits

- [ToggleGroup] Support clearing value and setup Logger ([943fa8](https://github.com/techniq/svelte-ux/commit/943fa8f6a3cb818027055c018f1bbf24dba1df15))

## 0.31.0

### Commits

- [Checkbox] Support `bind:group` ([02651a](https://github.com/techniq/svelte-ux/commit/02651aa88aa9481764d1084e9ee7bac2341d2a5e))
- Update all patch and minor dependencies (skip immer for now) ([331386](https://github.com/techniq/svelte-ux/commit/33138671884e7717d0494e83a63eb53a2fad702d))
- Setup vercel analytics ([e92a5a](https://github.com/techniq/svelte-ux/commit/e92a5aaacdf81d9795460284995b8eb32f58aed9))
- [mapStore] Add `update` to simplify modifying existing value (and reduce risk of stale values) ([143fe5](https://github.com/techniq/svelte-ux/commit/143fe55e2b63c87f46cd907b9fe1e33d17f33190))

## 0.30.5

### Commits

- [Icon] Set `fill-current` on container to simplify coloring font sets without `<path fill="currentColor" />` set. Looking at your Font Awesome. ([7071e6](https://github.com/techniq/svelte-ux/commit/7071e6d2dca258bd91624cec1ee5466a618f4a80))

## 0.30.4

### Commits

- [Drawer] Forward [intro|outro][start|end] events ([5aea8a](https://github.com/techniq/svelte-ux/commit/5aea8a622280d6746638c4063d5267bc1e3e5a07))
- Add initial features list to docs ([c6bb86](https://github.com/techniq/svelte-ux/commit/c6bb86be75ecfc528861abda0e01087e711abe92))

## 0.30.3

### Commits

- [SelectField] Fix typeahead by only re-selecting value if menu is not open (for when options change) ([a02105](https://github.com/techniq/svelte-ux/commit/a02105ecd78c40b41b6de8c7146159c5e688784e))

## 0.30.2

### Commits

- [queryParamsStore] Handle retoring default value (empty array, etc) and removing param ([cb63a4](https://github.com/techniq/svelte-ux/commit/cb63a41f914792fc4e3b2442dfe31d78720701d6))

## 0.30.1

### Commits

- [queryParamStore] Allow passing `goto()` from SvelteKit as last argument and enable directly setting store (like queryParamsStore) ([fa07d4](https://github.com/techniq/svelte-ux/commit/fa07d45949892ba1f75ecf4b5098364075586e0f))

## 0.30.0

### Commits

- [queryParamsStore] Rename `create()` to `createParams()`, add `createUrl()`. Allow passing `goto()` from SvelteKit as last argument and enable directly setting store ([02f21a](https://github.com/techniq/svelte-ux/commit/02f21a8f5517c5b7d818719fd137360a2f13e120))

## 0.29.20

### Commits

- [Menu] Remove `|local` from out: transition (causing too many regressions) ([cbb1c8](https://github.com/techniq/svelte-ux/commit/cbb1c8d03333cd33242bf122e6352a3f336a8f65))

## 0.29.19

### Commits

- [MultiSelect] Allow passing props to apply and cancel buttons and support trigging a form submit from apply click ([39f814](https://github.com/techniq/svelte-ux/commit/39f8144b3f2aad398f86fb4560211fdd4ac7ca9d))

## 0.29.18

### Commits

- Extract MultiSelect component from MultiSelectMenu ([d39395](https://github.com/techniq/svelte-ux/commit/d393959273bbb430c7366f5d32f7669a2c3b84b0))

## 0.29.17

### Commits

- [MultiSelectField] Hide menu after clear (if opened) ([162189](https://github.com/techniq/svelte-ux/commit/1621897d894e5cabfb1d9f984a74293f0f5374b9))
- Add `reset()` to selectionStore, use to add "Cancel" to MultiSelectMenu. Add Drawer example ([0014ee](https://github.com/techniq/svelte-ux/commit/0014ee37d7aead7d5b6305ca15042f57f12daa73))

## 0.29.16

### Commits

- [MultiSelectField] Still focus input when showing menu ([df9878](https://github.com/techniq/svelte-ux/commit/df9878bd00d2dade7e84de8cac55b8fa8de445a2))

## 0.29.15

### Commits

- [MultiSelectField] Do not clear text when clicking on input if already open, do not autoselect text on focus, and change how disabled is applied ([6031ec](https://github.com/techniq/svelte-ux/commit/6031ec3e42d9352d1aeb8778a646360ce44a6cbc))

## 0.29.14

### Commits

- [MultiSelectField] Support toggling close ([68e2d0](https://github.com/techniq/svelte-ux/commit/68e2d07a97c8ae23d3592b3089690f632fcc84ba))

## 0.29.13

### Commits

- [MultiSelectField] Fix filtering ([393351](https://github.com/techniq/svelte-ux/commit/3933511274ad228d0dd1cfc48ec234aa2e110001))

## 0.29.12

### Commits

- Add MultiSelectMenu, MultiSelectOption, and MultiSelectField components ([81b6c0](https://github.com/techniq/svelte-ux/commit/81b6c0f9952b78b8d3af6d77c504bf60fc5e0dba))
- [InfiniteScroll] Support disabling (show all) ([1068a2](https://github.com/techniq/svelte-ux/commit/1068a28a2c699be3f9fa8b4f5cc9d0ce2a5cbbcb))
- Add `|local` to remaining components without breaking ToggleButton usage by splitting `transition:` into `in:`/`out:` and only applying to `out:`. Resolves #51 ([14a3c5](https://github.com/techniq/svelte-ux/commit/14a3c574ea3e1a42b0f6932693ba6bff2c3dd0f1))
- [Button] Add filledOutlined variant ([a6c653](https://github.com/techniq/svelte-ux/commit/a6c65302db1bf4257368b4e98c8ff73b34d7bb40))

## 0.29.11

### Commits

- [ToggleButton] Allow placing the button after toggled content (useful with show/hide transitions) ([0ce116](https://github.com/techniq/svelte-ux/commit/0ce116f49a10b0ef0cf032c3b269f1068966d9f9))

## 0.29.10

### Commits

- [MenuButton] Do not set an explicit size for the selection/text (inherit from Button) ([3101e9](https://github.com/techniq/svelte-ux/commit/3101e93f7ce6f18d98e9051687ec2b8bed5709d4))

## 0.29.9

### Commits

- Add MenuButton component (similar to MenuField) ([ac04ce](https://github.com/techniq/svelte-ux/commit/ac04ce3bdf53b340b0c9bbd4aba3c1db28f196b8))
- [MenuField] Remove `explicitClose` prop (should be passed via `menuProps={{ explicitClose: true }}` like example ([313446](https://github.com/techniq/svelte-ux/commit/313446422d9b11ea676488e2cd8949a6c87c6a03))
- [MenuField] Fix value example ([e5f690](https://github.com/techniq/svelte-ux/commit/e5f690eecffcf9aa5648ebba797c94cbd6139edc))

## 0.29.8

### Commits

- [Icon] Use same icon container while loading icon via URL. Fixes Tooltip usage when `<Icon svgUrl="..." />` ([cc8a9d](https://github.com/techniq/svelte-ux/commit/cc8a9d09fe37d27d2ea9f0d6346254199285d3c7))

## 0.29.7

### Commits

- Also revert adding `|local` for Menu as it breaks ToggleButton usage (issue #51) ([6da768](https://github.com/techniq/svelte-ux/commit/6da76894895da4028637613b883927c816d07827))

## 0.29.6

### Commits

- Revert adding `|local` to Dialog / Drawer / Backdrop as it breaks ToggleButton usage (issue #51) ([feec1b](https://github.com/techniq/svelte-ux/commit/feec1bec8e865634ee9bd085c12bd25d9096656f))

## 0.29.5

### Commits

- Update all Svelte transitions with `|local` modifier for better SvelteKit compatibility ([fd0552](https://github.com/techniq/svelte-ux/commit/fd055243303d1c8d4c72ae7a8e7e835e7dcd144f))

## 0.29.4

### Commits

- [ToggleButton] Move `on` closer to transition element to fix after adding `|local` modifier ([d75966](https://github.com/techniq/svelte-ux/commit/d75966c0f4a9619c298fc6b2833e6e0aca325586))

## 0.29.3

### Commits

- [ToggleButton] Always make transition local (fix SvelteKit) ([c693a4](https://github.com/techniq/svelte-ux/commit/c693a45c15e4ed52f8636d5d4ad16f8921fb4b62))

## 0.29.2

### Commits

- Expose `on` as prop on `Toggle` to allow default and binding. Use with `ToggleButton` ([edc295](https://github.com/techniq/svelte-ux/commit/edc295d93f6b01225fab4e197282d9559b5bef0b))

## 0.29.1

### Commits

- [Pagination] Add tooltips to each button, and small gap (by default) ([aa3209](https://github.com/techniq/svelte-ux/commit/aa3209b782df6af6a337da2eeede0f953ed79c4b))

## 0.29.0

### Commits

- [Pagination] Much more flexible including support to show/hide components, control order, perPage support, slots and classes overrides. Remove TablePagination (Pagination handles all use cases) ([753a0d](https://github.com/techniq/svelte-ux/commit/753a0de8f8495d06bedfd8f7530a2e2b61f96e1e))

## 0.28.1

### Commits

- [SelectField] Only update selected value with updates options if value !== undefined ([e4f809](https://github.com/techniq/svelte-ux/commit/e4f809ab0d8544cfb782f925b45344eda791eb40))

## 0.28.0

### Commits

- [SelectField] Refresh selection when options change (update searchText, for example). ([85c115](https://github.com/techniq/svelte-ux/commit/85c1152a2776b7c6f13de1c57382df184f24ebfe))
- [SelectField] Change manyOptions `name` to string instead of number ([c9630d](https://github.com/techniq/svelte-ux/commit/c9630d7601895fecc6c9627a07d47ad83d7b3d8e))
- [SelectField] Rename item/items to option/options ([898808](https://github.com/techniq/svelte-ux/commit/8988084f366127d15ff0fcfc0d0c077aef24b5d3))
- [SelectField] Pass `selected` and `value` as item slot props ([942f8e](https://github.com/techniq/svelte-ux/commit/942f8ed4ce19df1c7055cf057c0ecff039cbc7d0))

## 0.27.23

### Commits

- [SelectField] Ignore clicks on group items ([e9dde3](https://github.com/techniq/svelte-ux/commit/e9dde3c996ef733547ea70af98be9f2af017c429))

## 0.27.22

### Commits

- [SelectField] Support disabling clearable, add basic selected styling with classes.selected support, and removing group uppercase by default ([a229bb](https://github.com/techniq/svelte-ux/commit/a229bb78aaecafc2910de09a5c6a3c68fb1d5a87))

## 0.27.21

### Commits

- [ToggleButton] Forward click event ([78fbf4](https://github.com/techniq/svelte-ux/commit/78fbf4adc3c2d7ec4d76294b069cef8aca4fb977))

## 0.27.20

### Commits

- [ToggleButton] Add ButtonGroup example ([68626f](https://github.com/techniq/svelte-ux/commit/68626fbf1680e28b00b27a0e64285728a7ecee05))
- [Button] Change default passing for icon-only sizes ([34e9e4](https://github.com/techniq/svelte-ux/commit/34e9e44b795d43e19051573aacc7c56df2733fb9))

## 0.27.19

### Commits

- [ToggleButton] Fix slide transition ([9e8d40](https://github.com/techniq/svelte-ux/commit/9e8d401e22e0489c1cdb4197839d7821affd169d))

## 0.27.18

### Commits

- [MenuItem] Restore font size default (text-sm) after Button sizes ([77d828](https://github.com/techniq/svelte-ux/commit/77d82890cfdb48ebe720349cb67dbba6cf526bb4))

## 0.27.17

### Commits

- Add utils to package exports ([46c0a8](https://github.com/techniq/svelte-ux/commit/46c0a8dd1a22da309d636ca97b798b8563d47a3d))

## 0.27.16

### Commits

- Add plugins to package exports ([8499af](https://github.com/techniq/svelte-ux/commit/8499afeed3b1dc3f49ecc06445e836f2fe317638))

## 0.27.15

### Commits

- Updates for latest svelte-package changes ([382f66](https://github.com/techniq/svelte-ux/commit/382f660faa55a80cf0dc4b5c708041e0c11860b0))
- Add ToggleButton to top-level exports ([3a97f7](https://github.com/techniq/svelte-ux/commit/3a97f7ab247b41b5b6765b31cbc93e0bbd2013a3))
- Add ToggleButton component to simplify use case, including mounting/unmounting toggled elements (using transition to coordinate unmounting with children animating) ([549254](https://github.com/techniq/svelte-ux/commit/549254a673d3ce8eb0054c3882d920620aad6778))
- Upgrade dependencies ([402446](https://github.com/techniq/svelte-ux/commit/402446249b24ecea085885c4d40d6c8011f56b4b))

## 0.27.11

### Commits

- [Button] Replace `small` prop with `size` (sm, mg, lg). Fix iconOnly button default padding. Add more examples ([886d21](https://github.com/techniq/svelte-ux/commit/886d21d4120d8a97731f94c373a60f424fee2862))
- Improve comment ([a2e501](https://github.com/techniq/svelte-ux/commit/a2e501d757e4c3462976761a8a4b5f64d5d8ea4c))

## 0.27.10

### Commits

- [ButtonGroup] Fix support with `<Button href="">` (`<a>`) ([29b34c](https://github.com/techniq/svelte-ux/commit/29b34c77034076701bc82909722b39f10c9e0ca1))
- [ButtonGroup] Add tooltip example ([5fece5](https://github.com/techniq/svelte-ux/commit/5fece52670c12e4b3762e02c5abfcba76d2f6f13))

## 0.27.9

### Commits

- [ButtonGroup] Forward click and key press events ([ddc6ae](https://github.com/techniq/svelte-ux/commit/ddc6ae6bea27ac338d1582285dc62fc92683a3c6))

## 0.27.8

### Commits

- [Button] Do not require `variant` prop to be passed (defaults to ButtonGroup variant or `text` ([b3df3b](https://github.com/techniq/svelte-ux/commit/b3df3b812f43a459b38e7327bac1869038a8fcd6))

## 0.27.7

### Commits

- [Button] DIrect Button props override ButtonGroup context (instead of other way around) ([6c1521](https://github.com/techniq/svelte-ux/commit/6c15216bf4f1ed9951b4f18b80ad768fb56079a3))

## 0.27.6

### Commits

- [ButtonGroup] Switch to `inline-flex` by default (can be overwritten via `class="flex"` ([926e2f](https://github.com/techniq/svelte-ux/commit/926e2fd20fe224f18fe3931ce5106e94b267d58a))

## 0.27.5

### Commits

- [ButtonGroup] Overlap borders instead of removing to allow showing checked/selected button (with z-index). Add pixel page between text buttons ([7323e8](https://github.com/techniq/svelte-ux/commit/7323e8610ac4601c77f41886edb9992435080487))

## 0.27.4

### Commits

- Remove `button-group` marking class to fix conflict in another project ([33c127](https://github.com/techniq/svelte-ux/commit/33c127f6a9716ac37c8306e8e48d8a3be7841997))

## 0.27.3

### Commits

- Add ButtonGroup to top-level exports ([85c713](https://github.com/techniq/svelte-ux/commit/85c7134b14fd6e88a6832b568a29015f085172f0))

## 0.27.2

### Commits

- [Button] Lower case by default ([623a1d](https://github.com/techniq/svelte-ux/commit/623a1de6494bafb114ca50b32568c8b1450f43ca))

## 0.27.1

### Commits

- [Button] Add white background to default outlined variant ([5a2adb](https://github.com/techniq/svelte-ux/commit/5a2adb57e8de0b9a66b862baf47254ef49a538ec))

## 0.27.0

### Commits

- [Button] Replace `circle` boolean prop with `rounded` (true/false/full). Add Button and ButtonGroup examples ([935662](https://github.com/techniq/svelte-ux/commit/93566228ba365b8a7b5ff184d81c88d173a51110))
- Add ButtonGroup component ([55bf07](https://github.com/techniq/svelte-ux/commit/55bf07d64ea68cecf12afa431ea3bbca93b8f09f))
- [Button] Better organize examples ([85d186](https://github.com/techniq/svelte-ux/commit/85d186520715aef546b36250330190bd794315d7))
- [Button] Add variant support (replaced `filled` and `base` props). Much improved `color` prop (sets color instead of CSS var). ([efb849](https://github.com/techniq/svelte-ux/commit/efb84942e2829c8661255861867cd795a2537415))
- [DateRange] Fix layout after ToggleGroup classes/options change ([d9ba7a](https://github.com/techniq/svelte-ux/commit/d9ba7aabfca4dafd5287e53116187ff3b89c46bb))

## 0.26.26

### Commits

- [Icon] Set width/height to 1.0rem when using font awesome SVG strings ([a5fa29](https://github.com/techniq/svelte-ux/commit/a5fa29fe4e0944524a031a35d172387c8b215128))
- [Icon] Add font awesome SVG color example ([c29865](https://github.com/techniq/svelte-ux/commit/c298653a6a3f3afd76afbf01d222ed27f9c51a45))
- Fix ListItem frontmater ([65350d](https://github.com/techniq/svelte-ux/commit/65350d8bed324cc672d67e4f1a0d3054d7537005))

## 0.26.25

### Commits

- [ToggleOption] Actually pass `selected` as slot prop ([385a3c](https://github.com/techniq/svelte-ux/commit/385a3c90b434c34875d07513348ef49431e63e4e))

## 0.26.24

### Commits

- [ToggleOption] Pass `selected` as slot prop ([7c0e5e](https://github.com/techniq/svelte-ux/commit/7c0e5ef63715c8cac115d7daa49519449a76648d))
- [ApiDocs] Add props.isRequired and module exports ([96b1ba](https://github.com/techniq/svelte-ux/commit/96b1baf98d27ce681646c8a9a40d7731b96ce51e))

## 0.26.23

### Commits

- [Form] Restore inadvertent removal of preventDefault from on:submit ([f9edc8](https://github.com/techniq/svelte-ux/commit/f9edc8eae9daa1bb53b330ddc1367e08990b96f8))

## 0.26.22

### Commits

- [Form] Allow not passing initial state and pass $$restProps (ex. `class`) ([4c9f33](https://github.com/techniq/svelte-ux/commit/4c9f33e1714d343c243224ada65c266a55a4e3fb))

## 0.26.21

### Commits

- [MenuItem] Do not overwrite all classes (after adding $$restProps) ([f43ac1](https://github.com/techniq/svelte-ux/commit/f43ac1dc905544383adbc80e82a12e0932e80d9d))

## 0.26.20

### Commits

- [MenuItem] Support passing `disabled` (and rest of Button props) ([d10c6c](https://github.com/techniq/svelte-ux/commit/d10c6c6a9b215ed68176b06c4513d39e1eae60b3))

## 0.26.19

### Commits

- Add `hidden` support to ColumnDef to simplfy adding/removing columns ([4961e0](https://github.com/techniq/svelte-ux/commit/4961e0bbd775e96d047205df1ee212b94ec3eae9))

## 0.26.18

### Commits

- Fix Dialog, Drawer, and Menu popover clickOutside handling after changing from `click` to `mousedown` / `mouseup` ([fcb088](https://github.com/techniq/svelte-ux/commit/fcb088da794315f72a418508f44df3762da69799))

## 0.26.17

### Commits

- [Button] Use more flexible `data` Icon prop (support font awesome definitions, loading via URL, and svg strings) ([6bbc0f](https://github.com/techniq/svelte-ux/commit/6bbc0f2392ca4317964a88e397d968e9de2e9ba7))
- [Icon] Allow conveniently passing `svgUrl` or `svg` string as `data` (like path) ([d4abb2](https://github.com/techniq/svelte-ux/commit/d4abb251eb6bbef622d46456c2874202542aee7b))

## 0.26.16

### Commits

- [Icon] Remove promise if fetch fails, will request on next request ([4ec9d0](https://github.com/techniq/svelte-ux/commit/4ec9d04481920a5c8cf9a83b16ce5d5468c7fc7a))
- [Icon] Cache promise earlier to only request the same icon once (if on same page/render) ([47ba56](https://github.com/techniq/svelte-ux/commit/47ba56d7f35593f98b77edf0f433f049e5fb90da))
- [Icon] Add support for passing `svg` as string prop, default slot, or fetch url (with cache) ([49e7fc](https://github.com/techniq/svelte-ux/commit/49e7fc0449f894c71a35ce953234e82c984d7877))

## 0.26.15

### Commits

- scrollIntoView: Fix when scrollParent is not `position: absolute` (ex. popover) or `body` (i.e. offsetTop/Left = 0) ([7a4528](https://github.com/techniq/svelte-ux/commit/7a4528e6afb820cfea0cb5860af2ce714a466858))

## 0.26.14

### Commits

- [popover] Use `mousedown`/`mouseup` instead of `click` to track if mosue changes targets between events (drag within input to outside) ([fba4e1](https://github.com/techniq/svelte-ux/commit/fba4e1cd9d22691c1ef9a33bf69de29a5f69c3c7))

## 0.26.13

### Commits

- [SelectField] Only dispatch change when value changes ([92585a](https://github.com/techniq/svelte-ux/commit/92585ac4812129463d4d4c88d774a0b3da437992))

## 0.26.12

### Commits

- [dataBackground] Update `value` type to allow `null` and `undefined` (handled internally) ([1f6e7b](https://github.com/techniq/svelte-ux/commit/1f6e7bd09f8e1da2972cd191dbab45e6c1149d2d))

## 0.26.11

### Commits

- [DomTracker] Do not destroy actions on subsequent changes (just call update). Only call destroy() when being unmounted. Fixes `dataBackground` tweening when added via `table` action. Update example ([8cd109](https://github.com/techniq/svelte-ux/commit/8cd109f50298a407b395bb6e69bc583da25f2715))
- [dataBackground] Handle null/undefined value ([78fcdf](https://github.com/techniq/svelte-ux/commit/78fcdf5f345a24399cd4e9ce54058aa0b5ad88e5))

## 0.26.10

### Commits

- [SelectField] Fix clicking on scrollbar (offsetParent) closes menu ([db4995](https://github.com/techniq/svelte-ux/commit/db49951518c1221e545fac1436c4af2c273aca89))
- [Table] Move dataBackground action handling to tableCell action ([78d7e7](https://github.com/techniq/svelte-ux/commit/78d7e75268144e9945031bf50e2c1703a58171ef))
- [Table] Automatically calculate dataBackground domain based on table data by default. Allow passing simply option as well as function when more context is needed ([a5fdfd](https://github.com/techniq/svelte-ux/commit/a5fdfd0597b8affe681413cd45b4fb08bba1977c))
- [dataBackground] Change `bar` to `mode = 'bar' | 'fill'` and default to 'bar' ([a7fd4f](https://github.com/techniq/svelte-ux/commit/a7fd4fc7e66fd3d18e46edee7ddba2ed7df0b89f))
- [ExpansionPanel] Simplify impl after recent Collapse changes ([0c5109](https://github.com/techniq/svelte-ux/commit/0c510910e574c48ed406ba1cfb662a3ffa6bd1fa))

## 0.26.9

### Commits

- [dataBackground] Update types to not require domain (impl does not). Update Table to allow partial DataBackgroundOptions ([a66745](https://github.com/techniq/svelte-ux/commit/a66745f3978eda4f5f8106247e2ad8b4823ca09d))
- [Table] Do not require passing `rowIndex` for column.value / getCellValue() / getCellContent() ([5b8dc6](https://github.com/techniq/svelte-ux/commit/5b8dc6100f8a3745f55dc648233c6d8ad03a0734))

## 0.26.8

### Commits

- [Table] Support passing `dataBackground` to conveniently add dataBackground action to cell ([9456bb](https://github.com/techniq/svelte-ux/commit/9456bb7fe50d3d304ce90940754358e89f92c8f7))
- [Collapse] Add classes prop to conveniently style. Add aria-expanded to root element and data-open attribute to icon to enable more styling capability. Support changing icon without overriding slot. Disable button via attribute. Resolves #50 ([0d4ee3](https://github.com/techniq/svelte-ux/commit/0d4ee3e7074a50523d0f8e74c9b4ee823b495fc2))

## 0.26.7

### Commits

- [Collapse] Allow controlling via `open` prop (and still support bind:group) ([ceb8ec](https://github.com/techniq/svelte-ux/commit/ceb8ec7dfb45fc8d45fbd051e65555511c3fa25e))

## 0.26.6

### Commits

- [TweenedValue / SpringValue] Support passing format prop to simplify genearl usage. Add example to style based on value ([db0bf9](https://github.com/techniq/svelte-ux/commit/db0bf94098b662fb9eab1e98c2d7bcbe0f47bfc0))

## 0.26.5

### Commits

- Remove console.log ([458512](https://github.com/techniq/svelte-ux/commit/458512a9c8a599f5f7c29feaecbfedc67b9fabfc))
- Merge pull request #49 from techniq/table-class-improvements ([a8a806](https://github.com/techniq/svelte-ux/commit/a8a806949435368096dfbb01af0d0a37403c2b18))
- [Table] Now applies component defined classes to column definitions to allow overriding slots (header, data) without having to redefine styles (and allow column-defined classes to override table). Add `tbody`, `thead`, and `tr` classes. ([ffc566](https://github.com/techniq/svelte-ux/commit/ffc566a61f9e19cbf3e1f19ac2ac58b7319f7084))
- [Collapse] Support passing a custom transition and/or transition parameters ([0324d9](https://github.com/techniq/svelte-ux/commit/0324d916dafa7cea765f8c34bba8a12114442335))
- [dataBackground] Support passing color as function (ex. colorScale) ([18f440](https://github.com/techniq/svelte-ux/commit/18f4401705c15fddc9b1d4eb50b1cf5956183a47))
- [Collapse] Remove redundant example ([a61bb2](https://github.com/techniq/svelte-ux/commit/a61bb2faa5614c862564535339d8d93a72e5b839))

## 0.26.4

### Commits

- [Tooltip] Add enabled prop ([be5674](https://github.com/techniq/svelte-ux/commit/be567492bd5dfe01e2bc69bf22752b8557eaf4d2))
- Link remaining props to either svelte-ux docs page or MDN element page based on type ([4939ed](https://github.com/techniq/svelte-ux/commit/4939edf3f6ed5bfbed68a2d85d71be11f9097437))

## 0.26.3

### Commits

- [SelectField] Set `tabindex="-1"` to fix/workaround Safari setting `relatedTarget` on input blur outside of items (instead of selected itemm like Chrome/Firefox) ([576a4a](https://github.com/techniq/svelte-ux/commit/576a4af859736c80960f623e8d381ff531bddd30))

## 0.26.2

### Commits

- Add Overflow component as top-level export ([c418a3](https://github.com/techniq/svelte-ux/commit/c418a3b60bdee5a8db9484b32acfec6781ec12c7))

## 0.26.1

### Commits

- Add `overflow` action and `Overflow` component ([9d44d5](https://github.com/techniq/svelte-ux/commit/9d44d513b9e2c94956a6cf224dd318f89efb5485))

## 0.26.0

### Commits

- Upgrade dependencies ([f25c4b](https://github.com/techniq/svelte-ux/commit/f25c4b42938d827477cdae1944f0728d7029aac6))

## 0.25.6

### Commits

- [Menu] Do not allow a menu to exceed 100vh (improves svelte in transitions when overflow viewport) ([f097c5](https://github.com/techniq/svelte-ux/commit/f097c5fc60ff279dacd8d985477a1b74db42257c))

## 0.25.5

### Commits

- [SelectField] Add some protection in case menuItemsEl hasn't been binded on mount ([782336](https://github.com/techniq/svelte-ux/commit/782336884a9ae5ef1b6f3cc1e0d4f67c393630f7))
- [SelectField] Close menu if previous selection is re-selected, without closing when items change. Rely on `loading` prop to properly wait (i.e. ignore) initial ([261194](https://github.com/techniq/svelte-ux/commit/261194a435586a5352c4aa0e33c35f8901e18fef))

## 0.25.4

### Commits

- Merge branch 'master' of https://github.com/techniq/svelte-ux ([136a8e](https://github.com/techniq/svelte-ux/commit/136a8e60c6cbadc8d437e393d294483c4f022597))
- Merge pull request #44 from techniq/lazy-component ([e2a8ea](https://github.com/techniq/svelte-ux/commit/e2a8ea14b0fa18c4f7e52bb5f7cff0e097ee5ae3))
- [SelectField] Use `bottom-start` placement by default (fixes quick jumping issues, especially with large lists). Support passing remaining props to underlying Menu. ([9a0c98](https://github.com/techniq/svelte-ux/commit/9a0c986495878facc4137ec68dfcbd2e5f9705cc))
- [popover] Fix passing placement with alignment (ex. `bottom-start`) when using autoPlacement ([f82201](https://github.com/techniq/svelte-ux/commit/f822015ade2337622b5f8c5814ddd18e35f94d2e))
- [SelectField] Add many options example (to test popover resizing) ([a4d5f7](https://github.com/techniq/svelte-ux/commit/a4d5f70e9dacab837a6fe13b8143f0537958d5ce))
- [SelectField] Close menu if previous selection is re-selected ([f37de9](https://github.com/techniq/svelte-ux/commit/f37de9e9bc53b59736520c4973c44ed321c4aee1))
- Add Lazy component. Update intersection action to use node's parent as root by default ( can be overridden to use body, etc) ([8e6ff7](https://github.com/techniq/svelte-ux/commit/8e6ff7cf71f564f6d9e8df350ac6e1cf4c14b0e5))
- [SelectField] Key items by value to make sure they are properly unmounted/mounted ([0945f2](https://github.com/techniq/svelte-ux/commit/0945f23eb19dac1ecab3884ae8328ba8c2aa71a6))
- [SelectField] Shrink empty text (by default) ([5ce679](https://github.com/techniq/svelte-ux/commit/5ce67941ab41842087c73e3800edb3db6be9be54))
- [ApiDocs] Add slot description if defined (using sveld's non-standard `@slot` JSDoc). Add example with Collapse's trigger slot ([4d3b51](https://github.com/techniq/svelte-ux/commit/4d3b5124c8ecee438f1cc70515f23c930d6c4db0))
- [InfiniteScroll] Fix API docs ([8dee79](https://github.com/techniq/svelte-ux/commit/8dee79513027678b7cfe6a53d1846b1738c5c1af))
- [SelectField] Pass loading prop to empty slot ([2b35ff](https://github.com/techniq/svelte-ux/commit/2b35ff17c03b52f3cb73a7cbe9a48317695c5dd2))

## 0.25.3

### Commits

- [SelectField] Add logger for searchText value ([5bf0f3](https://github.com/techniq/svelte-ux/commit/5bf0f3152062598a2a23a837ce789a98fdfe2a1d))
- [SelectField] Replace console.log with logger.debug ([3229f5](https://github.com/techniq/svelte-ux/commit/3229f52ebe7eb0115f173baa82c9f2957ffe9354))
- [Drawer] Add MenuField example ([97915f](https://github.com/techniq/svelte-ux/commit/97915f9f146754734fcb720026329255637741f9))
- [Menu] Disable click event propagation (like Drawer and Dialog) to not trigger Popover's clickOutside (since content is portal'd) ([67ed27](https://github.com/techniq/svelte-ux/commit/67ed27388d036613ea71890baa2476eef0a98c83))
- [Field] Fix ToggleGroup examples ([4095ff](https://github.com/techniq/svelte-ux/commit/4095ffb3bf14f4d014dcfc4b56dba4e487a74950))

## 0.25.2

### Commits

- [Popover] Do not require a reason for close (`unknown` by default) ([f78654](https://github.com/techniq/svelte-ux/commit/f78654edf2b88205ba0feffbfa7ee308fb04c4d2))

## 0.25.1

### Commits

- [Button] Forward click event when using anchor element (href) ([c61ef0](https://github.com/techniq/svelte-ux/commit/c61ef0265c44797a8b33b2b18330a0a65c9f99ed))

## 0.25.0

### Commits

- [SelectField] Fix incorrectly closing on blur when item (or action) is clicked. Add item with action example ([8ae1f9](https://github.com/techniq/svelte-ux/commit/8ae1f9d7cc5ec19232c7f1aed42ef9c4337e16c3))
- [ApiDocs] Change slot props to orange to match other props ([e1bf86](https://github.com/techniq/svelte-ux/commit/e1bf8624d4852cbf0fca22a35fb59aae7b1a9b61))
- Rename Scroll to ScrollContainer ([a824d4](https://github.com/techniq/svelte-ux/commit/a824d4776cf603a2bf8b836d683e252585795056))
- [ApiDocs] Parse and display slot props ([f81363](https://github.com/techniq/svelte-ux/commit/f813638a8a0ea5842abfeac91baef3acf496a211))
- [MenuItem] Handle `scrollIntoView` action, and update SelectField to use `MenuItem` ([fa1be9](https://github.com/techniq/svelte-ux/commit/fa1be9f47022eb028bc80c5df8bf9f8cffbf52b8))
- [Button] Support passing `actions` (like `Input`, `TextField`, etc) ([25d1d3](https://github.com/techniq/svelte-ux/commit/25d1d3230677f464a9ccdff99d31cd861836e4bc))
- [multi action] Do not create wrapper action if no actions passes. Handle actions with no destroy ([01c606](https://github.com/techniq/svelte-ux/commit/01c606945b3323f577cfaa5190c47373fc173906))

## 0.24.4

### Commits

- [MenuItem] Left align menu items, allow passing in `class` prop, and update `MenuField` examples to use `MenuItem` ([7b4a51](https://github.com/techniq/svelte-ux/commit/7b4a51a8c0f004a0146ff0cec00231984062f5e2))
- [Logger] Enable via localStorage instead of code changes ([2a60e4](https://github.com/techniq/svelte-ux/commit/2a60e486a94d0213cc88a329e0b850aa247e00c0))

## 0.24.3

### Commits

- [SelectField] Handle null search text ([93daaf](https://github.com/techniq/svelte-ux/commit/93daaffec4437919790bbe87ac84070cd0b843d4))

## 0.24.2

### Commits

- Support disabling focusMove action and use to disable Menu focus on SelectField (keep on input) ([fca319](https://github.com/techniq/svelte-ux/commit/fca3196eef6b10a5d80e555b5a41f04236a4e5ad))

## 0.24.1

### Commits

- Add `clearSearchOnFocus` prop ([256d5b](https://github.com/techniq/svelte-ux/commit/256d5b9abceae85060bcf07571ebbf03452cc9f3))
- [scrollIntoView] Fix scroll offset calcuation (only noticable in some situtations) ([685b77](https://github.com/techniq/svelte-ux/commit/685b77b9cdf6019c965b72ed0fcf150c894de29f))

## 0.24.0

### Commits

- Add tailwind-merge and cls util to simplify usage ([e46fce](https://github.com/techniq/svelte-ux/commit/e46fce30e4684d2ef95e0456aba34177a50fe7f1))
- Merge pull request #41 from dimfeld/accent-colors ([d12057](https://github.com/techniq/svelte-ux/commit/d12057391120180fa0850b169857a44a278dc470))
- replace all uses of hardcoded blue with accent color ([b16a73](https://github.com/techniq/svelte-ux/commit/b16a736f6c3e1204abd8dcac7bc66dfee9e4ae1c))

## 0.23.0

### Commits

- Merge branch 'master' of https://github.com/techniq/svelte-ux ([f754a1](https://github.com/techniq/svelte-ux/commit/f754a1adb2ff17ce933956dedd05409424b3350e))
- Merge pull request #39 from dimfeld/additional-input-types ([ad0296](https://github.com/techniq/svelte-ux/commit/ad0296948a2fe6864df6137dd67d35ac389a2e7a))
- Merge pull request #40 from dimfeld/readme-update ([d7d790](https://github.com/techniq/svelte-ux/commit/d7d790d8f349a3d9c705c48db0b5e38f0ef3377b))
- [SelectField] Support "item.group" to add headers between options. Add `classes` to pass to underlying elements ([16ee13](https://github.com/techniq/svelte-ux/commit/16ee13ef0d7f93fce90d3dc01b4ee592ffd7e8b2))
- [Menu] Enable overflow-auto ([c14ed0](https://github.com/techniq/svelte-ux/commit/c14ed06c11297a0c7bc4f6e26953e05e34b450c5))
- [popover] Support `resize` to enable floating-ui's `size()` middleware. Enable SelectField autoPlacement (true by default) ([a21af7](https://github.com/techniq/svelte-ux/commit/a21af75d86b300661ae3d7e01d8cffbcaa897975))
- [getScrollParent] Fix handling of reaching top-level element (null node.parentNode) by properly falling back to document.body ([174541](https://github.com/techniq/svelte-ux/commit/174541744541cabd2ec41b04a8105fd163850311))
- instructions update: do not use tailwindcss-forms ([b25465](https://github.com/techniq/svelte-ux/commit/b25465857901d9eaafe1b7bbd8b15f82d8998d0a))

## 0.22.19

### Commits

- Add email and search TextField types ([a587bc](https://github.com/techniq/svelte-ux/commit/a587bce2c587fe717ce5f1a7030c335e0edca984))
- Remove unneeded empty option ([4107e8](https://github.com/techniq/svelte-ux/commit/4107e88c2593a828d1589e6839f3e818ab0b4537))
- [focusMove] Opt into focus restore, and only enable on Dialog/Drawer (not Menu). Fixes SelectField re-focusing on close/selection ([2b2a42](https://github.com/techniq/svelte-ux/commit/2b2a428264372e3cd842d99d4ea36af24256c201))
- Add typings for observer events (intersecting and mutate) ([d5ca7e](https://github.com/techniq/svelte-ux/commit/d5ca7e36ac331f02453656aa701b443c961dc09f))

## 0.22.18

### Commits

- [InfiniteScroll] Pass all visibleItems to slot to enable transitions / better control ([ac2fc6](https://github.com/techniq/svelte-ux/commit/ac2fc60ffba9d4de3ca7d840b8838a9ae9fe33e9))

## 0.22.17

### Commits

- Add InfiniteScroll to copy-level exports ([60fe27](https://github.com/techniq/svelte-ux/commit/60fe271ca1f1696dcccbec97ddc113db0ce9c38c))

## 0.22.16

### Commits

- Add InfiniteScroll component ([35f142](https://github.com/techniq/svelte-ux/commit/35f14258a8b2b6beeb9a12198800145afeae6bbd))
- Simplify building NavMenu ([880be8](https://github.com/techniq/svelte-ux/commit/880be891001af78241eacc14464f9016cd6f029d))

## 0.22.15

### Commits

- Add horizontalSlide transition ([d35bfa](https://github.com/techniq/svelte-ux/commit/d35bfae1c3e94b72fea23fabba89347eec05d5c1))

## 0.22.14

### Commits

- [ToggleGroup] Only dispatch change event when value actually changed ([de6f9a](https://github.com/techniq/svelte-ux/commit/de6f9a2018bb11c65f73fd5df1353e98dabd834b))
- [ToggleGroup] Remove unsupported controlled example ([e0305b](https://github.com/techniq/svelte-ux/commit/e0305b54e533a7cd452a87fc383b0c26cd34bb57))

## 0.22.13

### Commits

- [formStore] Add revertAll() to reset draft/state to initial value ([d37f5e](https://github.com/techniq/svelte-ux/commit/d37f5e98243d31f135947551fce55e92456bd925))
- [Form] Expose undo from formStore. Update example ([c2b0d8](https://github.com/techniq/svelte-ux/commit/c2b0d8c90544525b4b509e52345f4d7b77ae74a8))
- [formStore] Update `current` draft value after undoing. Add jsdoc comments ([351340](https://github.com/techniq/svelte-ux/commit/3513409e54f4f50272499d63fbfd36700caadad4))

## 0.22.12

### Commits

- [changeStore] Improve types and default previous to `undefined` instead of `null` ([8813fc](https://github.com/techniq/svelte-ux/commit/8813fc93ad96f5c68350674ce114dff4a82164ac))

## 0.22.11

### Commits

- Add changeStore ([9897bf](https://github.com/techniq/svelte-ux/commit/9897bf15c893866dc0a3e158365639b477900187))
- Fix dirtyStore import example ([694277](https://github.com/techniq/svelte-ux/commit/694277cbc38bb406d3ce135733a82539a21e8e43))
- [Tooltip] Wrap slot in span if `cursor` prop only set ([78384e](https://github.com/techniq/svelte-ux/commit/78384e4a016ae64e6e9076ff7e7952213dadd4c4))

## 0.22.10

### Commits

- [Tooltip] Only show underline if title set. Add cursor prop to change mouse cursor if title set. ([ab0730](https://github.com/techniq/svelte-ux/commit/ab0730eacd6ef456bae9835c8230521c4fd05611))
- Ad svelte inspector ([25a956](https://github.com/techniq/svelte-ux/commit/25a956eeedf3041160d8717fc19d0f76edf1736d))

## 0.22.9

### Commits

- Add MenuItem to top-level export ([439601](https://github.com/techniq/svelte-ux/commit/43960147447f50138fc289e8052334c47363c27c))

## 0.22.8

### Commits

- Add MenuItem component ([775ee9](https://github.com/techniq/svelte-ux/commit/775ee9a9cf0a1b21951938d2e4bb7e33a6b94f2b))
- [Menu] Use focusMove to focus menu, and use <menu> instead of <ul> element ([db95c4](https://github.com/techniq/svelte-ux/commit/db95c4fc4913b9abfce8514f8d4e88122ccafbbe))
- [Button] fullWidth also sets `width: 100%` along with `display: flex` ([1c0186](https://github.com/techniq/svelte-ux/commit/1c01863e229e9c724ced5c1c4e089ebfff37b4ae))

## 0.22.7

### Commits

- [Icon] Rename `label` to `title` ([bcaef8](https://github.com/techniq/svelte-ux/commit/bcaef84677612da7dbf4569a19c88f856831ab20))

## 0.22.6

### Commits

- [Icon] Update type to accept string or number ([9670b0](https://github.com/techniq/svelte-ux/commit/9670b02abfd45fc0b1893dccc3cbaceaabb1fd86))

## 0.22.5

### Commits

- [Icon] Add Accessibility props (label, desc) ([b540cc](https://github.com/techniq/svelte-ux/commit/b540ccf422084f9b02f415968c7b9a57d1306ba4))
- Add FontAwesome `IconDefinition` type (or path `string`) to data ([64e8e2](https://github.com/techniq/svelte-ux/commit/64e8e2d2a6c2699853d1c0ffec0073741ca16c57))
- Add examples to rotate / scale / flip ([6b950f](https://github.com/techniq/svelte-ux/commit/6b950fb95fc33d84b977e78529de17eee01f8165))

## 0.22.4

### Commits

- Fix sourceUrl after SvelteKit upgrade ([4aae64](https://github.com/techniq/svelte-ux/commit/4aae64cbfd7988c7fbbf81836ebad74e6189a1eb))
- Improve wording of comment ([1ef6a9](https://github.com/techniq/svelte-ux/commit/1ef6a911683df66dedbb5369a4087421da0b71b4))
- [Icon] Add support for font awesome icons with `data` prop, multiple paths (duotone, stacked icons), passing class to path(s), and add animation examples. ([bf8ddb](https://github.com/techniq/svelte-ux/commit/bf8ddb3c8839ceb13601836b4f289a4b5c562a7d))
- [Tooltip] Show when focused ([c28d65](https://github.com/techniq/svelte-ux/commit/c28d65ac36f0c92ff019bb87beff9812d1dbdbd6))

## 0.22.3

### Commits

- [scrollShadow/scrollFade] Watch for transition and animation events to hopefully catch when flip'd children are done animating ([59d6e1](https://github.com/techniq/svelte-ux/commit/59d6e1780419e9568e913d4614f43c517feda4e5))

## 0.22.2

### Commits

- [Popover/Menu/Tooltip] Add autoPlacement support (uses flip by default). Issue #29 ([3bcd17](https://github.com/techniq/svelte-ux/commit/3bcd17c2c177a0189f3e5450bf5bbe56d780fa52))
- [scrollFade] Remove gradient if no overflow (set null instead of undefined) ([6199a5](https://github.com/techniq/svelte-ux/commit/6199a5019fd9b7dcd7deab1ae8bb2da749401048))

## 0.22.1

### Commits

- [TextField] Support passing options to autofocus action. Use to fix Menu transition jank ([e2c960](https://github.com/techniq/svelte-ux/commit/e2c9601594d179f20577ce25d7750bc3fd783069))
- [autoFocus] Support passing options to delay focus ([feb3e4](https://github.com/techniq/svelte-ux/commit/feb3e4b3a0344c307b88220a7e34ff98a174ba5f))

## 0.22.0

### Commits

- Remove direct usage of $app/store (require passing in current $page). Fixes Vite prebundling ([0c1e84](https://github.com/techniq/svelte-ux/commit/0c1e8470868720c9e3bf26d070af854819a34418))
- Replace $app/environment with simple `window` check to fix consuming package ([c5b749](https://github.com/techniq/svelte-ux/commit/c5b749ee1e713b29ecff7e950252cc0ad493c40c))
- npm audit fix ([7688cc](https://github.com/techniq/svelte-ux/commit/7688cc436613012a36c391e574ed97375815f93c))
- Replace `svelte-kit package` with `svelte-package` ([09f83a](https://github.com/techniq/svelte-ux/commit/09f83a778ee1c31c2bdebdd65cd61feb8e86e9c6))
- svelte-migrate: updated files ([3615d9](https://github.com/techniq/svelte-ux/commit/3615d9e4cdbf5e0614e7b5a3edc01de13792887b))
- svelte-migrate: renamed files ([ae952a](https://github.com/techniq/svelte-ux/commit/ae952affd3643959f2b0859b3c50f4da62cbf187))

## 1.0.0

### Commits

- Upgrade remaining non-SvelteKit dependencies ([37cac8](https://github.com/techniq/svelte-ux/commit/37cac880210d3f989ea2966d431f44816135453e))
- Upgrade all patch and minor dependencies ([bfe683](https://github.com/techniq/svelte-ux/commit/bfe683631d4953e422c5b47b54afd0acf33673ec))
- Remove docs Layout console warnings ([d3a790](https://github.com/techniq/svelte-ux/commit/d3a790115923675ba2f05cf35d59f69f357cab4b))

## 0.20.5

### Commits

- [Checkbox] Set border color to accent when focused ([0e4391](https://github.com/techniq/svelte-ux/commit/0e4391895d2d07a6e87c15f1e419a13f4449d33f))
- Remove NavItem from top-level exports (until $app is handled better) ([d6f651](https://github.com/techniq/svelte-ux/commit/d6f651ba78a88559878d5048fc1df680d1d1ce63))

## 0.20.4

### Commits

- [dirtyStore] Support resetting flag. Add to top-level exports ([943d0e](https://github.com/techniq/svelte-ux/commit/943d0efce19af244adf741f8c8d09718349416be))

## 0.20.3

### Commits

- [Popover] Restore z-index back to 50 (match Dialog/Drawer, fix usage within) ([268c65](https://github.com/techniq/svelte-ux/commit/268c65d127f4fd7f76e85c4fc12060f3b4e1e00f))
- Add dirtyStore ([fb7de5](https://github.com/techniq/svelte-ux/commit/fb7de58fd6babc55347942c72a2dfdeb5addf624))

## 0.20.2

### Commits

- [Checkbox / Radio] Add background hover when not checked ([275583](https://github.com/techniq/svelte-ux/commit/275583299a0cbb3020fab7139c6e6c6e98111462))
- [Popover/Menu/SelectField] Remove maxViewportHeight (might return) ([dac916](https://github.com/techniq/svelte-ux/commit/dac91611db93b3e223296900b25a93e7fa0a93ef))

## 0.20.1

### Commits

- [Button] Add classes prop to style underlying components. Use iconOnly to better control gap(empty default slot) ([9058d7](https://github.com/techniq/svelte-ux/commit/9058d70e2c0bfbc2a2cc738a86057105d527bd09))
- Cleanup TODO ([75ff0f](https://github.com/techniq/svelte-ux/commit/75ff0fe2273eebce3e706ee1f46c780bbe98ea6c))

## 0.20.0

### Commits

- Use `@floating-ui/dom` instead of custom impl. Resolves #29. Issue #14 ([9cc7e3](https://github.com/techniq/svelte-ux/commit/9cc7e3799915413029f4857b911c240886ea3b18))
- [Popover] Fix popover location in examples after simplification. Remove origin examples ([f9de3c](https://github.com/techniq/svelte-ux/commit/f9de3c57f1d14aec9bba0208658ef2f5263d4b98))
- [Popover] Simplify examples by using Toggle component and reduce markup ([2a4191](https://github.com/techniq/svelte-ux/commit/2a4191052a4586fca26943b99f5169c41bd0bb3a))
- Add scrollIntoView() dom util (similar to node.scrollIntoView()). Use with ToggleOption and scrollIntoView action. Closes #36 ([a98e2e](https://github.com/techniq/svelte-ux/commit/a98e2e65aa97e76de9d14931b6522dad9d6e87ca))
- [getScrollParent] Return horizontal-only scrollable parents as well as vertical ([a14a0a](https://github.com/techniq/svelte-ux/commit/a14a0a15c5abc9ff2b18a9b4b42a9e31276d20dd))
- Add scrollFade action. Issue #35 ([925288](https://github.com/techniq/svelte-ux/commit/9252881100f910663ec4771425a1bb032505a2db))

## 0.19.7

### Commits

- [Switch] Switch to use accent color (like Radio/Checkbox) ([2b4226](https://github.com/techniq/svelte-ux/commit/2b422663e4d300568331b87eb3d6f2ecba169cc8))

## 0.19.6

### Commits

- [scrollShadow] Add example with truncation ([0afd46](https://github.com/techniq/svelte-ux/commit/0afd4645eb18c929629b69a7d0b22e8a6b133ab6))
- [Checkbox/Radio] Support passing classes to underlying elements ([78d4b6](https://github.com/techniq/svelte-ux/commit/78d4b6759a83439dbcda635d71066d705837cfcd))

## 0.19.5

### Commits

- [scrollShadow] Remove pointer-events on overlay ([4eef90](https://github.com/techniq/svelte-ux/commit/4eef906a3b4445acc24fb2ec37a50c8f76502a09))

## 0.19.4

### Commits

- [scrollShadow] Apply shadow to :after element to overlay shadow on top instead of under, which supports white fade/shadows improves black shadows ([2d7ecf](https://github.com/techniq/svelte-ux/commit/2d7ecf62979d47ca740603a26f8340141f8e0784))
- [scrollShadow] Control each shadow's offset, blur, spread, color, and scrollRatio (along with turning off). ([bf1448](https://github.com/techniq/svelte-ux/commit/bf1448f1314f43e20fb14f799bff904bd868d28a))
- [scrollShadow] Watch for mutations (add/remove children, styles updated, etc) ([fbcbcf](https://github.com/techniq/svelte-ux/commit/fbcbcf7eef3d8eb7be877437e4946d47d6ebf811))

## 0.19.3

### Commits

- Watch `.ts` classes for tailwind classes ([d26be4](https://github.com/techniq/svelte-ux/commit/d26be42e52214e68abbcc915e8ae45884f48a621))
- [shadowScroll] Use passive scroll event ([2ebd63](https://github.com/techniq/svelte-ux/commit/2ebd63edb20b53514985543dbba9492032275243))
- Add scrollShadow action ([aa9501](https://github.com/techniq/svelte-ux/commit/aa950187a016572cc9880ed94a2a0f43be732dbe))

## 0.19.2

### Commits

- [Switch] Swap `flex` for `grid` to workaround an unrelated issue ([154945](https://github.com/techniq/svelte-ux/commit/15494550d8580d3b917e065e231640abd6fd6e90))

## 0.19.1

### Commits

- [ToggleGroup] Still pass all classes when using contained/underlined variants ([f2e558](https://github.com/techniq/svelte-ux/commit/f2e5580950355358cccd383d51fd9ea358e7be6a))

## 0.19.0

### Commits

- [Popover] Do not capture keydown/click events so they propagate up the tree (instead of first). Update Dialog/Drawer to not propagate keydown/click events. Add Menu example using Dialog/Drawer options. ([951d2c](https://github.com/techniq/svelte-ux/commit/951d2cd30f5f7fca410a2ff54c74007d02490e77))
- [Toggle] Add `toggle`, `toggleOn`, and `toggleOff` events ([e74fbd](https://github.com/techniq/svelte-ux/commit/e74fbd20409aa9f34e861b89235d4c3410c62284))
- [ToggleOption] Use `parent.scroll()` instead of `option.scrollIntoView()` to make sure we never scroll the page ([00d49c](https://github.com/techniq/svelte-ux/commit/00d49cbe5f55aa96144f49ad7f0253e7b5023b3d))
- [Drawer/Dialog] Add autofocus examples ([fa302a](https://github.com/techniq/svelte-ux/commit/fa302ae8a518ed9251ca997f5c5dbb4303df279a))

## 0.18.1

### Commits

- Remove focus outline from Dialog/Drawer (not directly keyboard focusable) ([b89936](https://github.com/techniq/svelte-ux/commit/b89936d1465eaeb0952d46b16d8935afe95c6298))
- Add nested Dialog within Drawer example ([3cb1fe](https://github.com/techniq/svelte-ux/commit/3cb1feb7f1f85bee7d84abc1d48761f80466838c))

## 0.18.0

### Commits

- [ToggleGroup] Add autoscroll to opt-into behavior ([cd5669](https://github.com/techniq/svelte-ux/commit/cd5669eef65f0d17d9222dec10b7cf22e7d35d40))

## 0.17.0

### Commits

- [TextField] Apply accept filtering to input ([e82309](https://github.com/techniq/svelte-ux/commit/e823096dafa91764814d4f115a436f68c2727f3e))
- [Dialog/Drawer] Add simple focusMove (and restore) action and use to allow Escape to propogate. Focus trapping coming later. ([d9bdbc](https://github.com/techniq/svelte-ux/commit/d9bdbc1ff5e9c7a59e8b0a4658bad412c1b6f9b8))

## 0.16.0

### Commits

- [ToggleGroup/Option] Add classes support and leverage tailwind for built-in styles. options div is now created by ToggleGroup ([56b26b](https://github.com/techniq/svelte-ux/commit/56b26b11c044a797d2198201dba0d738642d08b6))

## 0.15.4

### Commits

- [Form] Wrap with `<form>` element and use on:submit / on:reset to simplify usage ([3690b4](https://github.com/techniq/svelte-ux/commit/3690b401df4896cff8bfcc1d82ec1dfebdd0f801))
- [Button] Add type and default to "button" ([aa8d96](https://github.com/techniq/svelte-ux/commit/aa8d962d3f5f0c838db365d4f21d0f7d4ab358c2))
- [Field/TextField] Add classes prop ([e126f8](https://github.com/techniq/svelte-ux/commit/e126f87c71982bdaf5cd64c80f072ba08082a3ab))
- [Menu] Support passing transitionParams ([ef07d1](https://github.com/techniq/svelte-ux/commit/ef07d1035f0ed97b607bb2bf396efd2459f58a91))

## 0.15.3

### Commits

- [MenuField] Truncate selection text if too longer for container ([11675b](https://github.com/techniq/svelte-ux/commit/11675b9a051b72943091202552bd7f937c214c80))

## 0.15.2

### Commits

- [formStore/Form] Add `refresh()` / `current` to capture current draft value when desired (each change, blur, etc) ([ffca14](https://github.com/techniq/svelte-ux/commit/ffca14f9fff9334c68f53f1c5e281e774250eaf0))
- Update Checkbox circle examples to use `size` prop instead of `dense` ([fbe970](https://github.com/techniq/svelte-ux/commit/fbe970d39bfddc873fce9e76ff423cc604c21553))

## 0.15.1

### Commits

- [Checkbox / Radio] Improve layout of multi-line labels (do not wrap under input) ([2583f2](https://github.com/techniq/svelte-ux/commit/2583f2e5c4893a3fdf7c03194d9e06f991d5809a))

## 0.15.0

### Commits

- Fix isActive to no longer match similar pages ("/FooBar" should not also match "/Foo" routes) ([61b552](https://github.com/techniq/svelte-ux/commit/61b552ff7cbb949f098758bcd7946eb773cf4453))
- Scroll option into view (if needed). Resolves #27 ([7aedb6](https://github.com/techniq/svelte-ux/commit/7aedb688898d6abc583a2cbdd8fd47adbee861ae))
- [MenuField] Add `explicitClose` prop and pass `close` slot prop ([1a9c60](https://github.com/techniq/svelte-ux/commit/1a9c60c8b3ed69b656956fa55d562e624a911eb1))

## 0.14.6

### Commits

- [Menu] Add `explicitClose` prop and pass `close` slot prop ([b469a4](https://github.com/techniq/svelte-ux/commit/b469a4bea85403b6ec3dd4ecd14871ed1711e06d))

## 0.14.5

### Commits

- [Field/TextField] Add convienent iconRight to append (like icon to prepend) ([6b267f](https://github.com/techniq/svelte-ux/commit/6b267f00ca1008beba2c4135e4e375447cdb2088))
- [getScrollParent] Ignore overflow parents if scrollHeight === clientHeight (continue to transverse parents) ([00c2ec](https://github.com/techniq/svelte-ux/commit/00c2ec93499d1cb12c342595684d6244579b4495))

## 0.14.4

### Commits

- [selectionStore / Selection] Handle multi-page / filtered "all" toggling. Simplify API. Use Set to guarantee no duplicates. Add clear() ([bb0a2c](https://github.com/techniq/svelte-ux/commit/bb0a2c81868987b1f644d1230b53edf95cd4136b))

## 0.14.3

### Commits

- Restore empty array default values after last change ([31df2f](https://github.com/techniq/svelte-ux/commit/31df2f71e9393f1eaafd10aa46d8b6207314f88e))

## 0.14.2

### Commits

- [selectionStore] Change `all` to store and expose to allow updating (list filtered, etc) ([3b1a70](https://github.com/techniq/svelte-ux/commit/3b1a701ca9deeee13c58483a4fdde9e8e118f3b8))
- Add Scroll docs to menu ([0a8711](https://github.com/techniq/svelte-ux/commit/0a87110f2714ecb754188c0d15e83e2ba2fb7788))

## 0.14.1

### Commits

- Add Scroll component ([473572](https://github.com/techniq/svelte-ux/commit/473572bf05aba4518b95d8597a79ac7e12f10831))

## 0.14.0

### Commits

- Add Selection component for selectionStore ([50d683](https://github.com/techniq/svelte-ux/commit/50d683ec9b74bd5599eccc6dcae07db29217a983))
- Add selectionStore to top-level exports ([dde477](https://github.com/techniq/svelte-ux/commit/dde477d514d1e1875bec8edb349aee81236dd564))
- Add selectionStore ([e5dc12](https://github.com/techniq/svelte-ux/commit/e5dc1215bd6a5f37ecea432ab4e37fc540255ebd))
- Fix syntax highlight ([7852db](https://github.com/techniq/svelte-ux/commit/7852db136afe9a1f9b4228377a27adcffa159102))
- [SpringValue / TweenedValue] Handle `nullish` and add `disabled` prop ([ca0c06](https://github.com/techniq/svelte-ux/commit/ca0c06ac2087b117be4e70a50cf07c8270f75911))

## 0.13.2

### Commits

- [MenuField] Add prepend and append slots ([abc9e0](https://github.com/techniq/svelte-ux/commit/abc9e030b727a1a789ef61b7840b654c8b844f0b))

## 0.13.1

### Commits

- Add `type="button"` to not inadvertently submit forms ([51c33b](https://github.com/techniq/svelte-ux/commit/51c33b9da90a15162935ef2a2eef03a7147feeaa))

## 0.13.0

### Commits

- Add MenuField to simplify Field + Menu use cases ([ae7756](https://github.com/techniq/svelte-ux/commit/ae775656c330a159d57c99217533e37c6494f5cc))
- [Switch] Transition focus ring ([b40a75](https://github.com/techniq/svelte-ux/commit/b40a75b26c058d46e01bf0290c1c49e499259c03))

## 0.12.0

### Commits

- [Switch] Support focusing and simplify implementation. ([0871d0](https://github.com/techniq/svelte-ux/commit/0871d0b49c19a1a8306cd540bfc00fd9a847eab0))
- [Checkbox/Radio] Refine focus ring ([6616a0](https://github.com/techniq/svelte-ux/commit/6616a09d4ee05fd47278d30819e37e666ff6a3f8))
- [Checkbox/Radio] Change "hidden" checkbox to `inline` so it does not have any layout effect ([6c5839](https://github.com/techniq/svelte-ux/commit/6c5839a4031e9804447eeecf27acd3a68c5ff709))
- [ToggleOption] Propagate click event ([3e9efd](https://github.com/techniq/svelte-ux/commit/3e9efd366d07bbbfd0aab8ea832d9c5e67a233bc))
- Use `focus-visible:` instead of `focus:`. Remove `hover:` ring effect. ([90033d](https://github.com/techniq/svelte-ux/commit/90033db06e8332b554eb4de4cbfee482fdec4328))
- [Radio] Support focusing (with refined focus/hover style), replace `dense` with `size` (smaller by default). Simplify implementation. ([15b8be](https://github.com/techniq/svelte-ux/commit/15b8bef2f91067a1295ebb5eec9375c3c466d978))
- [Checkbox] Support focusing (with refined focus/hover style), replace `dense` with `size` (smaller by default). Simplify implementation. ([8782ce](https://github.com/techniq/svelte-ux/commit/8782ce054f229271c11d53c22264ad950ee2b596))

## 0.11.1

### Commits

- [dataBackground] Fix type of `tweened` option ([0a9458](https://github.com/techniq/svelte-ux/commit/0a9458638b9f92a9202ed2f375cc24b52647d937))

## 0.11.0

### Commits

- [Duration] Support passing partial duration (ex. milliseconds) along with start/end dates ([dc6b5a](https://github.com/techniq/svelte-ux/commit/dc6b5a9820e979e8c12ddabdafb618e19a9fbb6a))

## 0.10.1

### Commits

- [Tooltip] Fix pointer events closing tooltip if overlap trigger ([3d2015](https://github.com/techniq/svelte-ux/commit/3d2015d55edc2ad359d20c81fe41a6e1e85fdf78))
- [objecttoString] Add `;` after last value ([5471f8](https://github.com/techniq/svelte-ux/commit/5471f8e372021b4563ef89b095971e02566ee857))

## 0.10.0

### Commits

- [Table] Support passing class/style to container, wrapper, and table via "classes" prop. Pass "class" to container instead of table ([07524c](https://github.com/techniq/svelte-ux/commit/07524c72530ccbd5fe899f0d7d2b2267deccc7a5))
- Remove automatically adding box-shadow borders when using table sticky (can apply when needed with greater control (i.e. color)) ([c57c7d](https://github.com/techniq/svelte-ux/commit/c57c7d60a37f90eb27f218666f872329dece499a))

## 0.9.2

### Commits

- Add `keysByValues()` object util to swap keys/values ([b35fb0](https://github.com/techniq/svelte-ux/commit/b35fb04604c4d10b5f4dad28ded184ff873cf494))
- Remove unused Tab/Tabs imports ([0a817c](https://github.com/techniq/svelte-ux/commit/0a817c5b430138355de7b1a5184326296d6f74ad))

## 0.9.1

### Commits

- Support passing `class` to ToggleGroup and ToggleOption. Added `classes` to ToggleOption for more flexability. ([12ca5f](https://github.com/techniq/svelte-ux/commit/12ca5f12d78a86d2bf34acf0963da4b5face920b))

## 0.9.0

### Commits

- Replace some style usage with tailwind classes ([6880de](https://github.com/techniq/svelte-ux/commit/6880de93c2826ee6f0ff8bf83a66ca6ea100d177))
- [ToggleGroup] Change "selected" prop to "value" ([675923](https://github.com/techniq/svelte-ux/commit/675923caf9e92de960fd8636bdba802c87efdce7))
- Rename Tabs/Tab => ToggleGroup/ToggleOption ([13978b](https://github.com/techniq/svelte-ux/commit/13978b1a553dcf29043b6c8203305df91649fc57))

## 0.8.8

### Commits

- Add ComponentProps, ComponentEvents, and ComponentSlots type helpers ([0458dc](https://github.com/techniq/svelte-ux/commit/0458dc1632db26e185197286e90aa4c49ed425ed))

## 0.8.7

### Commits

- Improve value type of entries() typeHelper (with note to improve further) ([af1efe](https://github.com/techniq/svelte-ux/commit/af1efe71cef171857c463961863509e84939a806))

## 0.8.6

### Commits

- [mapStore] Add .refresh() to force a reactive update in case of internal changes to entries ([7fd95f](https://github.com/techniq/svelte-ux/commit/7fd95f79d0eec12fd3d0b5b6ad6b80903f9b58fe))
- Add mapStore to top-level exports ([373e28](https://github.com/techniq/svelte-ux/commit/373e28a8baac061d58cdbc65c98b41d974611187))

## 0.8.4

### Commits

- Add mapStore which wraps `Map` and simplifies syncing state with Svelte ([94bd4d](https://github.com/techniq/svelte-ux/commit/94bd4daf16d1a8a4d2f20c54a02bbb23fdd71ed7))

## 0.8.3

### Commits

- Improve types on SpringValue and TweenedValue ([c362fa](https://github.com/techniq/svelte-ux/commit/c362fa46bd6a21d44ad541c37749248189f4c868))

## 0.8.2

### Commits

- Use more naive approach to check if browser/SSR ([777af5](https://github.com/techniq/svelte-ux/commit/777af538dd630648cf5a673f33d0364d5fc8b891))

## 0.8.1

### Commits

- Add top-level exports for SpringValue and TweenedValue ([fac88d](https://github.com/techniq/svelte-ux/commit/fac88dc6d2b1b29708c35b3903b9ab98359b8bf6))

## 0.8.0

### Commits

- Add SpringValue and TweenedValue ([856e30](https://github.com/techniq/svelte-ux/commit/856e30efffe77dfdb006c0c6a5df49a5b2242055))

## 0.7.7

### Commits

- Replace `browser` from `$app/env` with `!import.meta.env.SSR` until better supported when imported as package ([c409a2](https://github.com/techniq/svelte-ux/commit/c409a2ff4d002573ac015a0764e3a39c6b2a58ab))

## 0.7.6

### Commits

- [dataBackground] Support tweening value changes ([8e1c54](https://github.com/techniq/svelte-ux/commit/8e1c5479808bc554e722067aba6a92fdbdd2a6f4))

## 0.7.5

### Commits

- [dataBackground] Opt-in to showing baseline ([28d315](https://github.com/techniq/svelte-ux/commit/28d315124500880f107ea3a18055897bf745541c))

## 0.7.4

### Commits

- [dataBackground] Support passing inset as [x,y] to control each axis separately ([20ade2](https://github.com/techniq/svelte-ux/commit/20ade2bf07ef71fbc990fa5bb905ac927c26acae))

## 0.7.3

### Commits

- [Card] Use flexbox with justify-between and content flex growing to always align actions at bottom of card (if stretched by parent) ([f8cf53](https://github.com/techniq/svelte-ux/commit/f8cf537e69037512c4421323eb179b62a2314e9c))

## 0.7.2

### Commits

- [Tabs] Change overflow-hidden to overflow-auto to allow scrolling (as needed). Fixes #25 ([3bc6b4](https://github.com/techniq/svelte-ux/commit/3bc6b4fb69c91f5b1b0cb5c2ce997650e87d9796))

## 0.7.0

### Commits

- Update markdownToc preprocessor to handle non-component frontmatter replacement for source and doc urls (support stores, utils, etc). Add frontmatter to all doc pages. ([bf8cf9](https://github.com/techniq/svelte-ux/commit/bf8cf958b1a0e8629b5df2e7bdca41ec62b24dc0))

## 0.6.11

### Commits

- [Card / Header] Support passing title or subheading as array (rendered using Breadcrumb) ([de48c8](https://github.com/techniq/svelte-ux/commit/de48c88b98b1e509a185044e3381d42260365383))
- [Preview] Do not run Prism.highlight() if code is null (nested example unable to be located) ([9b1c5c](https://github.com/techniq/svelte-ux/commit/9b1c5c6bfbb107739b3b13db68dae219917de75b))

## 0.6.10

### Commits

- Remove Preview from top-level exports to fix Prism commonjs/esm issue. ([0cb6d0](https://github.com/techniq/svelte-ux/commit/0cb6d0116bab20833c2b4bdc0fb1669974d1142e))

## 0.6.9

### Commits

- [Preview] Highlight directly (by default) unless `highlightedCode` passed ([1d1673](https://github.com/techniq/svelte-ux/commit/1d16738430df5ac350d36f256225d4715eef1fd1))

## 0.6.8

### Commits

- Add Preview to top-level exports ([de10ee](https://github.com/techniq/svelte-ux/commit/de10ee555bfe431361955e3cd74e1b584bdae3a5))

## 0.6.7

### Commits

- [Preview] Allow toggling code (hidden by default) and copying to clipboard. Issue #24 ([85a6d3](https://github.com/techniq/svelte-ux/commit/85a6d316875066b2a841aa37ae896ee6b7ff243d))
- Add comment regarding plugin elevation classes ([e2ad74](https://github.com/techniq/svelte-ux/commit/e2ad74b9ff5ae3327efa53303fc39dc3a659cc43))

## 0.6.6

### Commits

- Improve types on encodeObject() and decodeObject() ([9e012d](https://github.com/techniq/svelte-ux/commit/9e012d2ddd26b24eb934b42cb5b72699d56a79c8))
- Update dependencies ([28163b](https://github.com/techniq/svelte-ux/commit/28163bffdca89c5ec5fba3e37e987796f4d2c2cc))

## 0.6.5

### Commits

- [AppBar] Also set document.title to pickup reactive updates ([d008ad](https://github.com/techniq/svelte-ux/commit/d008ad04357064683d78c96c530b8d45c223b8c6))

## 0.6.4

### Commits

- [AppBar] Add `head` property to set head title ([96c6c8](https://github.com/techniq/svelte-ux/commit/96c6c86379a848ee94977e2311ee7612c744a93e))

## 0.6.3

### Commits

- Add truncate() string util ([9ffec6](https://github.com/techniq/svelte-ux/commit/9ffec628ec541dd99ef298acd1364732f5438405))
- Fix docs regarding tailwind plugin ([f613f2](https://github.com/techniq/svelte-ux/commit/f613f2ff0cb37d6c69daf728011e2d8113bee1be))
- Add link to repository in AppBar ([14de5b](https://github.com/techniq/svelte-ux/commit/14de5bf36c09843677d436bd3a3ffcea336c3a4a))

## 0.6.2

### Commits

- Update json decode() to allow 1 or more milliseconds after period (includes 1-2 and 8+) ([abf4e1](https://github.com/techniq/svelte-ux/commit/abf4e1f4a7b30674c8ec19635fbaa976cafcda1f))

## 0.6.1

### Commits

- Update json decode() to handle postive timezone offsets (+04:00) ([168427](https://github.com/techniq/svelte-ux/commit/1684270616a8c86ebcc14067aa05b0a9698165fb))

## 0.6.0

### Commits

- Update json decode() to support 3-7 digits of milliseconds (not just 3) as well as no milliseconds (no decimal) ([26b661](https://github.com/techniq/svelte-ux/commit/26b6616797468fe042e76f58f70a32c943e62d97))
- Remove "target: "#svelte" in getting started (no longer needed with SvelteKit) ([64641c](https://github.com/techniq/svelte-ux/commit/64641c072d455b6ca498e93fd8842cc83497d2b3))
- [Breadcrumb] Add title tooltip to long text example ([d03bd0](https://github.com/techniq/svelte-ux/commit/d03bd019cd372274cae04474c401285dcd872ccd))

## 0.5.2

### Commits

- [Breadcrumb] Add example on how to truncate long text ([2e2e8c](https://github.com/techniq/svelte-ux/commit/2e2e8c6fe2da15b2cfdd4b43c53129d5c3020cd4))
- [Icon] Do not flex shrink ([2354f9](https://github.com/techniq/svelte-ux/commit/2354f95eb18074c4a6d88beb9cd2cc52d82399b2))
- Add AppLayout documenation placeholder ([e5709e](https://github.com/techniq/svelte-ux/commit/e5709e09e0f2266c55dca1e75593dd4c6315d685))

## 0.5.1

### Commits

- Update all dependencies ([686f3f](https://github.com/techniq/svelte-ux/commit/686f3f1bf88b2ffdbe35e545652b7d15568dc58f))

## 0.5.0

### Commits

- Remove outdated tailwindcss-elevation plugin (required tailwind 2.x) with in-house plugin (enabling additional possibilities) ([e6e465](https://github.com/techniq/svelte-ux/commit/e6e4655c4cd9990d8213c59b20acde9cdaeed2c5))

## 0.4.18

### Commits

- Add uniqueStore to manage unique values using `Set` (with improves ergonomics and better control of updates) ([960db7](https://github.com/techniq/svelte-ux/commit/960db71afb830732b0c1f7980366fa448c0c72b8))
- Add samples() array util ([f72d21](https://github.com/techniq/svelte-ux/commit/f72d214db98ea6b1d1d69f6e322579147f034e81))

## 0.4.17

### Commits

- Make copy of path since .shift() mutates original array ([a56b6b](https://github.com/techniq/svelte-ux/commit/a56b6b2b835b47b0cadee0be0b812f3302d2ed9c))

## 0.4.16

### Commits

- [EmptyMessage] Pass restProps ([e2b2c6](https://github.com/techniq/svelte-ux/commit/e2b2c612dfeb27307f72b2196dd4f8bb90a83416))

## 0.4.15

### Commits

- Fix accidently removing export on last change ([c61f7f](https://github.com/techniq/svelte-ux/commit/c61f7f2b19ce7ef1d24ff79c3db1d8f65a2d863c))

## 0.4.14

### Commits

- Update get() Map util to handle not finding path (or not nested Map) ([cdaa8a](https://github.com/techniq/svelte-ux/commit/cdaa8a5f2a496033bbcf1049eeb9c51e17657f27))

## 0.4.13

### Commits

- Add missing d3-array and lodash-es types ([aca0d2](https://github.com/techniq/svelte-ux/commit/aca0d2cf026f6cc43dba5e52a905324aadd04538))

## 0.4.12

### Commits

- Add get() Map util (similar to lodash get() for objects) ([68e27d](https://github.com/techniq/svelte-ux/commit/68e27de5d48e8e2deddd207dabad1c52645861f1))

## 0.4.11

### Commits

- [TablePagination] Remove use of Grid (fix css variable inheriting, etc) ([186345](https://github.com/techniq/svelte-ux/commit/186345db93bc92a4bfe2e741401a42a1e77b746d))

## 0.4.10

### Commits

- [Button] Add loading state ([c9b5eb](https://github.com/techniq/svelte-ux/commit/c9b5ebcef652d1febf0dd125fa7683b19abb365e))

## 0.4.9

### Commits

- [Tabs] Add hover color to underlined styles (like contained) ([e263e1](https://github.com/techniq/svelte-ux/commit/e263e19108acdac9e54ac318e1fa4433316e2093))

## 0.4.8

### Commits

- [TablePagination] Improve layout on mobile ([0f2e45](https://github.com/techniq/svelte-ux/commit/0f2e45dcb8fd9dc329a71c602e38faa42b28449d))

## 0.4.7

### Commits

- Add uniqueId() string util ([465cea](https://github.com/techniq/svelte-ux/commit/465cea8f402b3063301d004e9f4941ba049d3f74))
- Switch from static to vercel adapter to fix SSR initial page views ([6cc935](https://github.com/techniq/svelte-ux/commit/6cc935c4d49200631d11387851f25cab71041b2a))

## 0.4.6

### Commits

- Handle null options ([a4112e](https://github.com/techniq/svelte-ux/commit/a4112ec72aef2702ddfb3f05a70e8eda58003255))

## 0.4.5

### Commits

- Update to option changes for layout actions ([b8391b](https://github.com/techniq/svelte-ux/commit/b8391b25c7d05755d5d915c81f4c7b75bf8349af))

## 0.4.4

### Commits

- Allow passing dataBackground options to ColumnDef ([38f1be](https://github.com/techniq/svelte-ux/commit/38f1bea3f95dc7a00a5fe7ea75059e8d98ed82a6))
- Disable pointer events on disabled Field/TextField ([1a36f5](https://github.com/techniq/svelte-ux/commit/1a36f56fd5a4c51abad6e226e393fa756b379e8f))

## 0.4.3

### Commits

- Add flattenTree array util ([71f9ca](https://github.com/techniq/svelte-ux/commit/71f9caa398fc92c709036d60dee548a314487f6f))
- Add TODO to handle layout changes to remainingViewportWidth ([5dc843](https://github.com/techniq/svelte-ux/commit/5dc843043496528f270bd622c00b8af5417e303a))

## 0.4.2

### Commits

- Add remainingViewportWidth layout action ([785ad9](https://github.com/techniq/svelte-ux/commit/785ad9e30cf755c7ed3dfa443a8fd3abf834fc1b))

## 0.4.1

### Commits

- Add dataBackground to actions/root index exports ([939847](https://github.com/techniq/svelte-ux/commit/93984763e0e3706d8ab86aa11560be6f698cb990))

## 0.4.0

### Commits

- Add dataBackground action ([8324fc](https://github.com/techniq/svelte-ux/commit/8324fca0bd1bea8e1d5bfda8121e796b51b04ead))
- Add randomInteger() number util ([eb8eac](https://github.com/techniq/svelte-ux/commit/eb8eac8be6c8b3f7b23e961020dab4ee5fcc7643))

## 0.3.6

### Commits

- Add walk array util to transverse tree ([be50ab](https://github.com/techniq/svelte-ux/commit/be50ab54e2b6b42f542eca5f714926365190c734))

## 0.3.5

### Commits

- [fetchStore] Support suppressErrors config ([e91826](https://github.com/techniq/svelte-ux/commit/e918263b26b26f3c9a2c54845aee21ae3534bfe5))

## 0.3.4

### Commits

- [DateRangeField] Add clearable prop ([b0f9f0](https://github.com/techniq/svelte-ux/commit/b0f9f057dbc095d2e99eeb37c53af379b4a8dc8e))

## 0.3.3

### Commits

- [DatePickerField / DateRangeField] Make props more consistent (fullWidth => center), do not set icon by default, and make OK button more prominent. Replace "Empty" with single space (to maintain height) ([bd69cb](https://github.com/techniq/svelte-ux/commit/bd69cb9ac1b51d23184579d825aba653ffa03df9))

## 0.3.2

### Commits

- Comment out vite optimizeDeps (no longer needed afer recent SvelteKit/Vite upgrade) ([8ecbbb](https://github.com/techniq/svelte-ux/commit/8ecbbb48bc57ae7f20aa3272ca78375d7482ab08))

## 0.3.1

### Commits

- Improve append/prepend alignment after recent Button change to use inline-flex ([53b09f](https://github.com/techniq/svelte-ux/commit/53b09fea4316e75adf541d656d8092156411049a))

## 0.3.0

### Commits

- Upgrade SvelteKit from 202 to 303 ([0af244](https://github.com/techniq/svelte-ux/commit/0af24446b5d97f0e27722a28d1134735ceeb46a8))
- Upgrarde non-semver dependencies (except SvelteKit) ([01c4a3](https://github.com/techniq/svelte-ux/commit/01c4a39ec0d3949ad1f1267a6886615588323de7))
- Improve number alignment with tabular-nums ([8d0480](https://github.com/techniq/svelte-ux/commit/8d0480704346d566b9315f2d32989246de8cd6e2))
- Upgrade patch and minor dependencies. Fix code examples white-space issue after upgrade. ([e85101](https://github.com/techniq/svelte-ux/commit/e85101f5299aa7d9423dec3c11c8e86b38f6d7a0))

## 0.2.30

### Commits

- [TextField] Improve number handling of empty. Issue #21 ([5bd42e](https://github.com/techniq/svelte-ux/commit/5bd42ec6a8c7d17c214bc2cf5f0b2c185a008c8a))
- Add disabled tooltip example (needs fixed). Issue #19 ([db4852](https://github.com/techniq/svelte-ux/commit/db4852f10e47b13d1df6b3b29cbc51b4ff002326))

## 0.2.29

### Commits

- [graphStore] Force all mutations by default (always run even if variables do not change between fetch() calls) ([c2f426](https://github.com/techniq/svelte-ux/commit/c2f426f78bcc2851c479499b83432d0e37cfb8ce))

## 0.2.28

### Commits

- [Collapse] Use local transition modifier to work around SvelteKit page change issue. https://github.com/sveltejs/kit/issues/628 ([4d949a](https://github.com/techniq/svelte-ux/commit/4d949ab1995114663332f266425ec0d5ff132a53))

## 0.2.27

### Commits

- [Field] Fix alignment prepend items (icon) ([5664eb](https://github.com/techniq/svelte-ux/commit/5664eb039de3f7c94ae7e63685402f9a29b8d25c))
- [DateField] Add icon example ([86dfd0](https://github.com/techniq/svelte-ux/commit/86dfd0ac8c04eee28606a54e74791649374ebd51))

## 0.2.26

### Commits

- [Breadcrumb] Filter null items ([fd1fe0](https://github.com/techniq/svelte-ux/commit/fd1fe0e9df62d6b465407d6d583e6144ea47baa0))
- Fix Breadcrumb button example after change to Button to use inline-flex ([f130b2](https://github.com/techniq/svelte-ux/commit/f130b21c22f45522a509a33def0206fe67eff723))

## 0.2.25

### Commits

- [Button] Add flex alignments also for iconOnly ([e10cb5](https://github.com/techniq/svelte-ux/commit/e10cb5eadedbe922816148e3e99d65cc92fbf49b))

## 0.2.24

### Commits

- [Button] Add justify-content to fix some layout regressions after switching from [inline-]block to [inline-]flex ([dc2a5b](https://github.com/techniq/svelte-ux/commit/dc2a5bb12f3a3a058518ebdc0c9e394fca0030e1))

## 0.2.23

### Commits

- [SelectField] Add readonly prop ([f472d2](https://github.com/techniq/svelte-ux/commit/f472d2c3cbf633679cece78a6a32b91857cf605d))
- [Button] Center text when using <a> link like <button> (UA styling) ([17c128](https://github.com/techniq/svelte-ux/commit/17c128f6bc4f83231a0d194da28693535c794fb3))

## 0.2.22

### Commits

- [Pagination] Use tailwind classes instead of Grid. Issue #18 ([cc8a3c](https://github.com/techniq/svelte-ux/commit/cc8a3cea52679af5707a59c1fa9032c0ade86fc6))

## 0.2.21

### Commits

- Only use implicit column alignments based on format if defined as string (not function) ([befe4a](https://github.com/techniq/svelte-ux/commit/befe4a17366c30e6883dad63f769ff8c48916ba8))

## 0.2.20

### Commits

- Default table cell alignment (including headers) to left unless explicitly (column.align) or implicitly (column.format) set ([3756f5](https://github.com/techniq/svelte-ux/commit/3756f5522ca5650e5320a866cbda3e3e5848e778))

## 0.2.19

### Commits

- [ExpansionPanel] Add 'relative' class to match ListItem to fix inconsistent stacking contexts when missing ExpansionPanels and ListItems in same list. ([c2c59b](https://github.com/techniq/svelte-ux/commit/c2c59b432dbebd18e3ea9b85ce12576fb163809a))

## 0.2.18

### Commits

- [ListItem] Add convenient loading prop (like Card) ([52eba6](https://github.com/techniq/svelte-ux/commit/52eba61fdc2055d5f50cc55cbca4fd5ff5d35e8e))
- Add isUpperCase() string util ([693d02](https://github.com/techniq/svelte-ux/commit/693d02645c7abb8c045b88e6919653b24ff6becc))

## 0.2.17

### Commits

- Export StoreSubscribe at top level ([421435](https://github.com/techniq/svelte-ux/commit/4214351fd40d461fb1eda05f8e6ca470e63e6d5d))

## 0.2.16

### Commits

- Add StoreSubscribe value (aka take 3 for TableOrderIcon store support) ([0a9e69](https://github.com/techniq/svelte-ux/commit/0a9e695dfde84608f33d708867cec1f3a15e42b1))

## 0.2.15

### Commits

- [TableOrderIcon] Support order as readable store value, take 2 ([2c2d1f](https://github.com/techniq/svelte-ux/commit/2c2d1f1196c479fb739234b4a2eca6f4927e169b))

## 0.2.14

### Commits

- [TableOrderIcon] Support order as readable store value ([b62004](https://github.com/techniq/svelte-ux/commit/b62004e3ade8c44d5395034864fb04c165afc228))

## 0.2.13

### Commits

- [Avatar] Add icon prop to simplify basic usage ([59f165](https://github.com/techniq/svelte-ux/commit/59f1657a124ee199ffad4e7dcbfc6cfdc4c23c46))

## 0.2.12

### Commits

- [Checkbox] Stop click propagation (like Switch) ([f48ae2](https://github.com/techniq/svelte-ux/commit/f48ae2c80f9438d37e8616b8d3095b732b83f657))

## 0.2.11

### Commits

- [ErrorNotification] Set max height on description (scrollable) ([303beb](https://github.com/techniq/svelte-ux/commit/303beb79ef27e2d9a3e0a5afd107f24420628263))

## 0.2.10

### Commits

- [Breadcrumb] Improve display of many items ([c96a13](https://github.com/techniq/svelte-ux/commit/c96a13e7e8f797b0e5019ec05d4da0ed9e37c246))

## 0.2.9

### Commits

- [ErrorNotification] Improve handling of wide error descriptions (stack traces) ([457af7](https://github.com/techniq/svelte-ux/commit/457af74c48634b61e659ceeecfb4430fa2646ec3))
- [Breadcrumb] Simplify slot usage where possible ([96ebb7](https://github.com/techniq/svelte-ux/commit/96ebb76048f2ea60999ade08781ee5183e212eb4))
- [queryParamsStore] Add comments and remove use of lodash.isFunction() ([c09bdb](https://github.com/techniq/svelte-ux/commit/c09bdbc5ce5ee40731665a52846e765b5cad3597))

## 0.2.8

### Commits

- [fetchStore] Allow `force` to override `once` ([c27bbf](https://github.com/techniq/svelte-ux/commit/c27bbf2c84ac57622e7b92a59520632d524bf106))

## 0.2.7

### Commits

- Skip checking object property expiry if value does not exist ([dcfffe](https://github.com/techniq/svelte-ux/commit/dcfffe9fec8009fd17f6872f3a0407bd08f76768))

## 0.2.6

### Commits

- Check if object exists (has expiry but no value) ([c0fb0c](https://github.com/techniq/svelte-ux/commit/c0fb0c3571c743e94f483d4c0f9aba71f3d53431))

## 0.2.5

### Commits

- [Overlay] Only apply background color if none passed (fix package usage). Add docs ([29ad73](https://github.com/techniq/svelte-ux/commit/29ad73f7b3608ca800904c2950393e2326bc4a1f))

## 0.2.4

### Commits

- [Radio] Fix dense prop ([9068eb](https://github.com/techniq/svelte-ux/commit/9068eb21b72dbafd168744eeb3350267ad9902f7))

## 0.2.3

### Commits

- Change $lib import to relative to fix npm package, but comment out as unused for now ([2d2c03](https://github.com/techniq/svelte-ux/commit/2d2c035e5cd6ae0edde0b88f0faba1629a8ef944))

## 0.2.2

### Commits

- [Checkbox] Fix dense prop ([103018](https://github.com/techniq/svelte-ux/commit/1030181701ca3d9e4980f195c276efeb8757717b))
- [Month] Transition WIP ([ac4e06](https://github.com/techniq/svelte-ux/commit/ac4e06ffa7ef14cdd61263dd49606752ae7c8dc3))
- Fix display/class in grid example (no effect) ([40345f](https://github.com/techniq/svelte-ux/commit/40345fc9eb52b1d27390b185e46226ab3163fce8))
- Remove $component frontmatter from tailwind grid/stack examples ([b7401b](https://github.com/techniq/svelte-ux/commit/b7401b5d12919c20b560088133cefd5854999462))
- Add tailwind class-based grid and stack examples menu items ([def572](https://github.com/techniq/svelte-ux/commit/def5724a352d982851f1c76b2d0e980ea7e110c0))
- Update cssVars docs ([8be17f](https://github.com/techniq/svelte-ux/commit/8be17fa648da5e42417d6694be2bdca8a97b269a))
- [Docs] Add placeholder pages for missing actions and stores ([cfef4d](https://github.com/techniq/svelte-ux/commit/cfef4d5979646a46043f5f22efd72f850a85aaf7))

## 0.2.1

### Commits

- [DateRange] WIP adding DateFields for Start/End ([13fae4](https://github.com/techniq/svelte-ux/commit/13fae409a63c3898d16695a65dcff766971d24dd))
- [DateRange] Expand selection range to match period type ([3818de](https://github.com/techniq/svelte-ux/commit/3818de7f99eabe0abdbdace15d622776fa7c0fd8))
- Increase indention ([96c3dd](https://github.com/techniq/svelte-ux/commit/96c3dd0b60f8d7558d8690c68c19db5b8b819509))
- [ApiDocs] Show $$restProps ([852114](https://github.com/techniq/svelte-ux/commit/852114e0bb3e4474aeba55da7e9ec751d090c2f9))
- Only show table of contents for component (currently) ([508948](https://github.com/techniq/svelte-ux/commit/508948c367b0fd197ce5db71ab2fc091b019bfa3))
- [timerStore] Improve docs ([a5525e](https://github.com/techniq/svelte-ux/commit/a5525e948bd62000c502b39ca4025e20f89ca85a))

## 0.2.0

### Commits

- Add Duration component ([a9363b](https://github.com/techniq/svelte-ux/commit/a9363bd0ef19b56a2480b9bbb6297074b62c1a1c))
- [humanizeDuration] Always show a single unit (even if 0) ([1d7ad0](https://github.com/techniq/svelte-ux/commit/1d7ad0b1a4a10dce0ebbc43eecf2231da927fe47))
- Add timerStore ([d9a355](https://github.com/techniq/svelte-ux/commit/d9a3550df554ef62dd36d96d204c0a94ca8891c3))
- Add note about tailwind version ([222a63](https://github.com/techniq/svelte-ux/commit/222a6387c2bdbf55d3b5686e1ae33aebe9c34a1f))
- Add more humanizeDuration() examples ([6bbc49](https://github.com/techniq/svelte-ux/commit/6bbc4977aef00ea35cf94a88911057926660d6b8))
- Tweek description ([dbc991](https://github.com/techniq/svelte-ux/commit/dbc99167861e14b18148ee415e812c1dce348de7))
- Improve look of table of contents ([c46934](https://github.com/techniq/svelte-ux/commit/c46934a5d594a141403df4d8e60a305ae1551d03))
- Increase click size of view source and edit page icon buttons ([7190c1](https://github.com/techniq/svelte-ux/commit/7190c171e92a25296ac170ac3458adcfb38264f1))
- Update Getting Started docs ([3a448d](https://github.com/techniq/svelte-ux/commit/3a448d849b6d7053e4aaabb834cc58c8f80bd723))
- Fix wording ([61bfa0](https://github.com/techniq/svelte-ux/commit/61bfa02b168144d7c9a9cb4a81c8b2a9fb574e7f))
- Add notes about importing ([d3f653](https://github.com/techniq/svelte-ux/commit/d3f6536c9a54b63f77a812ac218a05c5b52bd963))
- Improve layout ([54f8d1](https://github.com/techniq/svelte-ux/commit/54f8d133ce1ff2aecd4da2be436c3fd90aae85ef))
- Update index with getting started instructions ([d6069e](https://github.com/techniq/svelte-ux/commit/d6069eda6856cf729fc5e8d4c2ff886c26695f07))
- [Month] Add some jsdoc descriptions ([b1387e](https://github.com/techniq/svelte-ux/commit/b1387e275e52c1e0ab5b6b45271efa80cf917c5d))

## 0.1.6

### Commits

- Export ApiDocs ([da10a5](https://github.com/techniq/svelte-ux/commit/da10a512853d31ed46ab25b68a09af12bf304687))
- Extract codePreview() and markdownToc() plugins/preprocessors ([0983a0](https://github.com/techniq/svelte-ux/commit/0983a0556f7bf029f82fce81561bb32827a4ccfb))
- [EmptyMessage] Remove explicit height and change to small padding ([d58f07](https://github.com/techniq/svelte-ux/commit/d58f076fab063b4cab825000eb04c2371e120a3a))

## 0.1.5

### Commits

- [Icon] Forward click event ([38d980](https://github.com/techniq/svelte-ux/commit/38d9800d68b5536c9993c3fa3c5ae509dd3fb915))
- [Checkbox] Fix headers ([7792c7](https://github.com/techniq/svelte-ux/commit/7792c766d7f2ce51028663ae6d5bfd32d64fa13d))
- Add view source link ([1987de](https://github.com/techniq/svelte-ux/commit/1987de2c539259ea170dbe4e5182098907726b8a))
- [ApiDocs] Reduce height of empty messages ([403b58](https://github.com/techniq/svelte-ux/commit/403b58e6ba25152ff71f94a78b6078fc422f6b1c))
- [ApiDocs] Add icons/color to props/slots/events ([d38bbc](https://github.com/techniq/svelte-ux/commit/d38bbcd461d62941b60f2ada08307e47c3763f88))
- [ApiDocs] Show empty message ([827712](https://github.com/techniq/svelte-ux/commit/8277128319e65d7352b5374713c7b2bda99c0fea))
- [ApiDocs] Handle 'null' default value ([a7ffcc](https://github.com/techniq/svelte-ux/commit/a7ffcc23c7909e0ff7921c1356cd44e555882ef3))
- Remove console.log ([1e2653](https://github.com/techniq/svelte-ux/commit/1e265394f7cf40db76922e5e8521a0328b4ab18d))
- [ApiDocs] Retain indention of description. Issue #7 ([1364d3](https://github.com/techniq/svelte-ux/commit/1364d397ea8e815ae409e2c144c4f483d3d36cd1))

## 0.1.4

### Commits

- [Card] Fix overriding classes if `class` passed ([018c3c](https://github.com/techniq/svelte-ux/commit/018c3c8abca47a1032a65ef5cf37c31494cb91d0))

## 0.1.3

### Commits

- [ApiDocs] Improve look of props, slots, and events. Still needs more work ([570132](https://github.com/techniq/svelte-ux/commit/570132c832480da6b57f583021cdd80bb4b97014))
- Add ApiDocs to all component examples ([104616](https://github.com/techniq/svelte-ux/commit/104616c9f56ba9180ff636f0767e20a285a9bd7a))
- Use vite-plugin-sveld to parse typescript / api docs ([209443](https://github.com/techniq/svelte-ux/commit/20944376b9d3e7d0698ef35ae12c270ac8fc143f))
- Map h1 (# Foo) in markdown to SectionDivider. Still need to set id ([aef355](https://github.com/techniq/svelte-ux/commit/aef3557bd4e08d2b4577ad304fff1593432baea1))
- [Tabs] Update underline to use tailwind classes, including accent. Add border to contained variant tabList. Update circle example to use aspect-square ([fbd999](https://github.com/techniq/svelte-ux/commit/fbd99921bc9ba90d3f262a105f22b91ffd61f86d))
- [Card] Forward restProps ([16c660](https://github.com/techniq/svelte-ux/commit/16c6602a73e3d4bdcabb3db1c0627cbeb97448ad))
- Fix vercel build since it uses `/vercel/path0/src/...` instead of `.../svelte-ux/src/...` git working directory ([1fb620](https://github.com/techniq/svelte-ux/commit/1fb6208fe6d4701a2b5bd6ea2b1f977e20dd33bc))
- Rename component doc files since now hosted on vercel instead of netlify ([2c518c](https://github.com/techniq/svelte-ux/commit/2c518cf1f0215669b92b3b8ab6ef875e10125249))
- Fix import of d3-time ([7e3ab8](https://github.com/techniq/svelte-ux/commit/7e3ab8de9b0ff1f55ae27b6506a60958383f63dc))
- Add generated table of contents along with component name and link to github page to edit ([397698](https://github.com/techniq/svelte-ux/commit/3976988da7d243c1db99d37ac01d5580164b04e7))
- Add rehype-slug to add ids to headers ([0a8292](https://github.com/techniq/svelte-ux/commit/0a829276fb3fda541c45af971fa39910beb28d9a))
- [RangeSlider] Support clicking on track to move ranges. Mouse hover state. Simplify css calcs ([fe940e](https://github.com/techniq/svelte-ux/commit/fe940e4127e18b46fa5f37672263de3eea950d52))
- Update dependencies ([e736dc](https://github.com/techniq/svelte-ux/commit/e736dc8d0343739c534b1c283d7891023ba0f954))
- Install tailwind typography plugin ([e9a920](https://github.com/techniq/svelte-ux/commit/e9a9209d47fa1bc994866b6af1ae3deefbc42a5a))
- [RangeSlider] Simplify and improve disabled state using "pointer-events-none" and removing tabindex ([f66252](https://github.com/techniq/svelte-ux/commit/f662521c742ea1d6420f3570e7723423a6b5c496))
- [RangeSlider] Support disabled ([24e7f6](https://github.com/techniq/svelte-ux/commit/24e7f6753578fdd5d210ee33daafe06c8d0c6c7b))
- [RangeSlider] Show focus state ([834c64](https://github.com/techniq/svelte-ux/commit/834c6456762d4f30ee5854964e64e08a26d1cf29))
- [RangeSlider] Add clicking to move value(s), but comment out for now until more thought ([8d823e](https://github.com/techniq/svelte-ux/commit/8d823e8296071a06b4c956c70128a3a7f0da6c68))
- Add event types ([5ae431](https://github.com/techniq/svelte-ux/commit/5ae431b62c1ecd14ba64ef2014e43f0f809d56de))
- Add TODO note ([d39663](https://github.com/techniq/svelte-ux/commit/d39663743ada991e073b4f3ea45fca9428834c8d))
- [RangeSlider] Support double clicking the thumbs or range to set min/max or both respective ([b34b43](https://github.com/techniq/svelte-ux/commit/b34b43cddb407c9187547923d67b999ac51a5c2d))
- [RangeSlider] Add keyboard inputs. Applies based on last cilcked/moved (start/end/range) ([daae50](https://github.com/techniq/svelte-ux/commit/daae5047c883df3227ddb326e4c08a7d99a17d82))
- [RangeSlider] Smoothly tween changes. Show values as floating tooltips while hovered / dragging. Maintain step precision / fix float math (added decimalCount() and round() utils. Handle each event types with same function. ([62ce0e](https://github.com/techniq/svelte-ux/commit/62ce0e37528b4d1709b5b28c6c209b904e5a93e7))

## 0.1.2

### Commits

- Add RangeSlider to exports ([41ef86](https://github.com/techniq/svelte-ux/commit/41ef86a78e33f6279d93fbce7c5aec6b628b0e3d))

## 0.1.1

### Commits

- Add RangeSlider WIP. Issue #2 ([3d0d6c](https://github.com/techniq/svelte-ux/commit/3d0d6ce654a5606a7db356f3b2cccabc6c82ce4d))
- Update menu component names to be consistent ([f52629](https://github.com/techniq/svelte-ux/commit/f52629ec80ef23f5c85bfb51d69c0a622822e559))
- Add clamp() util ([19d223](https://github.com/techniq/svelte-ux/commit/19d22364148e868aad6b6eaf6547ef3cefd4b7cd))
- [pannable] Support stepping by pixels or percent of parent widdth, and support ignoring axis changes (x/y) ([2cd6c2](https://github.com/techniq/svelte-ux/commit/2cd6c2dcf8ea1bbcb220497afaf89cae5b30bbe5))
- Remove unneccessary sky color (all colors included with Tailwind 3.0) ([08eadc](https://github.com/techniq/svelte-ux/commit/08eadc4d50fcf520fbf7e9a5c4b5cfe181a9c445))

## 0.1.0

### Commits

- Use Tailwind 3.0's arbitrary properties to set CSS variables instead of expect all defined on root element (plugin). Use clsx instead of svelte class: in more places ([4fbe8b](https://github.com/techniq/svelte-ux/commit/4fbe8b2bd1a2c2130adc439a7bd4af36516b4207))
- Update dependencies including SvelteKit (Vite 2.7) and Tailwindcss 3.0 ([1a6a24](https://github.com/techniq/svelte-ux/commit/1a6a24837ae0612a38e4d0f90d9770c2e32be8cd))
- Update comment about routing module with link to related issue ([629bdb](https://github.com/techniq/svelte-ux/commit/629bdb90b941dba3c46ef993ddf860760bab8e4c))

## 0.0.112

### Commits

- Remove accidental Backdrop blur enabled by default ([32984a](https://github.com/techniq/svelte-ux/commit/32984a5521f0bb44bea595b7650f34524c4e25c3))

## 0.0.111

### Commits

- [Backdrop/Dialog] Support passing fadeParams to Backdrop and use to sync with Dialog ([c560fb](https://github.com/techniq/svelte-ux/commit/c560fbdcc06380039c79e487b9d6f4c0358cc9e8))
- [Dialog] Improve action button colors ([53e586](https://github.com/techniq/svelte-ux/commit/53e586e6d2c9283c61aa4fb66e369dae650cf405))
- [Dialog] Fix "Disabled action" example using same state as Basic ([8ee41b](https://github.com/techniq/svelte-ux/commit/8ee41b47229ef44838f152fecec3aa7a42a56b3a))

## 0.0.110

### Commits

- [Dialog] Forward transition events ([4f8e56](https://github.com/techniq/svelte-ux/commit/4f8e5686ab12e91a6314d89c2c16c0fa62f85f8d))
- Add longpress event ([9c5ed9](https://github.com/techniq/svelte-ux/commit/9c5ed9795a267f59c88b03edc782099eeda9f609))

## 0.0.109

### Commits

- [Dialog] Add |local modifier to scale transition ([ee1229](https://github.com/techniq/svelte-ux/commit/ee12291920deb698cc8696470d52d321d0726aca))

## 0.0.108

### Commits

- [DatePickerField] Change width from w-80 (320px) to w-96 (384px) so long selected dates to now cause layout changes and align months better with PeriodType.Month ([2198d4](https://github.com/techniq/svelte-ux/commit/2198d425341cb283491e2d61f2b44e2dc82546ae))

## 0.0.107

### Commits

- [Dialog] Remove unneeded delay ([6b2bcb](https://github.com/techniq/svelte-ux/commit/6b2bcbdef2502227f7c985dab80548da14dbccaa))

## 0.0.106

### Commits

- [DateSelect] Change default selected to null instead of empty DateRange ([f1d6d2](https://github.com/techniq/svelte-ux/commit/f1d6d23ac999a68ac8d1a8e745fc94865400fc05))
- Add pannable action ([ef61d9](https://github.com/techniq/svelte-ux/commit/ef61d9e2fd2dc219e03a099ee08f0400a02e2831))
- Add TODO ([dc7748](https://github.com/techniq/svelte-ux/commit/dc7748ecacf59b4fb40779e39dbaefea0488a39a))
- Update dependencies ([f06742](https://github.com/techniq/svelte-ux/commit/f067429d6eec1ca3ea023ab56b55898034ff0e54))

## 0.0.105

### Commits

- Remove excel.js until more testing can be performed to fix dynamic import of exceljs ([ecb255](https://github.com/techniq/svelte-ux/commit/ecb255723fcf1dfda5e70830bf0fd9336b231faa))

## 0.0.104

### Commits

- Add try/catch around onDataChange and onResponseChange so errors are logged ([f63c48](https://github.com/techniq/svelte-ux/commit/f63c48c2959484ab793e4752a8a79f70f682aec7))

## 0.0.103

### Commits

- Add exportToExcel util ([c13eca](https://github.com/techniq/svelte-ux/commit/c13eca4e8e49043ec4b809d165422bbffe213923))
- Upgrade dependencies ([a723bb](https://github.com/techniq/svelte-ux/commit/a723bb13e0b0826cce53f375175a16b1b642253c))

## 0.0.102

### Commits

- Add saveAs file util ([4f1cbd](https://github.com/techniq/svelte-ux/commit/4f1cbdfaa1bac031c3ddb1d5bd7012a6148749ff))

## 0.0.101

### Commits

- [Avatar] Do not allow to flex shink (maintain circle) ([729984](https://github.com/techniq/svelte-ux/commit/7299845dfaf7c797effb4adef1fa3221d1ac6ab4))

## 0.0.100

### Commits

- [Breadcrumb] Support inline prop (from previous Stack usage) ([e0e31c](https://github.com/techniq/svelte-ux/commit/e0e31c17315d3ff52afd78cb81257e5487bdf4b7))

## 0.0.99

### Commits

- Update matchMedia store to support SSR, take 2 ([40bbc5](https://github.com/techniq/svelte-ux/commit/40bbc573907b7b447e0067d4a7688c751e1499c1))

## 0.0.98

### Commits

- Update matchMedia store to support SSR ([16bea4](https://github.com/techniq/svelte-ux/commit/16bea4eab4b71b0529f7e5a0808d9b0d8129b6cd))
- Add example of disabled expansion panels ([c6c406](https://github.com/techniq/svelte-ux/commit/c6c406b61019d6b50431b3b3144898e3210bde93))
- Remove commented out routing util implementations (unused) ([87ab39](https://github.com/techniq/svelte-ux/commit/87ab39cddb9387ef572e030b571e8d66c2a1b3a8))

## 0.0.97

### Commits

- Remove $app/navigation import ([e31b73](https://github.com/techniq/svelte-ux/commit/e31b738e8903b8162e133b4e3da785612da297ff))

## 0.0.96

### Commits

- Change default list type from "type" to "parent" to simplify common use cases (including mixing ListItem and ExpansionPanel) ([d92bda](https://github.com/techniq/svelte-ux/commit/d92bdae0b51c26d4d22b83b9cb263a6b5c58645f))
- Add more ExpansionPanel with ListItem examples ([f0d87d](https://github.com/techniq/svelte-ux/commit/f0d87d92b988148267504b18208fb6d8d003bf8d))

## 0.0.95

### Commits

- Update Collapse, ExpansionPanel, and ListItem to support `list` prop (replacing nested prop use case as well as more features). Supports same type, same parent, and group. Support mixing ListItem and ExpansionPanels ([9e0472](https://github.com/techniq/svelte-ux/commit/9e047228e3c64ec1524736203df5b10614a9ff61))
- [Collapse] Add example as expansion panel with popout ([08e492](https://github.com/techniq/svelte-ux/commit/08e492b8be4e1fb19ae8ad80128c8b097408bf2e))

## 0.0.94

### Commits

- Fix ListItem avatar prop type ([2c11c8](https://github.com/techniq/svelte-ux/commit/2c11c868b16d3026ee6e8b5716a70e91550ac463))

## 0.0.93

### Commits

- [AppBar] Add Breadcrumb gap ([712b80](https://github.com/techniq/svelte-ux/commit/712b80f49f888caee8d72b532add582175894660))
- [Breadcrumb] Remove Stack and use Tailwind "flex". Remove default gap (opt-in) ([096db6](https://github.com/techniq/svelte-ux/commit/096db6d542da3fd4c597fd1c63db26dc14d7ad2c))
- Add TODO for mdsvex processing of Preview ([e1e86f](https://github.com/techniq/svelte-ux/commit/e1e86fa970307694147052ee7b646cfcd1c7d88a))
- Remove extract <Preview> closing tag ([d80fa0](https://github.com/techniq/svelte-ux/commit/d80fa0b104bc6c98a1f293d2ef762cc1915e3f9e))
- Cleanup datefield example ([c7360e](https://github.com/techniq/svelte-ux/commit/c7360e6060c13068c533c782b62c5159bd9b1084))
- Remove no longer needed svelte-ignore ([c5f82e](https://github.com/techniq/svelte-ux/commit/c5f82e7b59af64de31c2c22bde7eb3f6a5be9c47))
- Update getDuration() / humanizeDuration() to handle date strings ([a8ec5d](https://github.com/techniq/svelte-ux/commit/a8ec5d5e417aa9a5c73c26d9877077206d9d5d25))
- Add menu spacer ([0af842](https://github.com/techniq/svelte-ux/commit/0af842a1401f85f591991fadb02a5eb7ffd18f81))
- Fix max index ([bf36a7](https://github.com/techniq/svelte-ux/commit/bf36a772ee7f2c19e3131546093fbfcd0c60b00b))
- Add example for scrollIntoView action ([3e1afa](https://github.com/techniq/svelte-ux/commit/3e1afaf29424c9515a6978397288fd4e36cf2bc8))
- Lowercase all routes to fix compatibility to netlify ([c88263](https://github.com/techniq/svelte-ux/commit/c88263747b7f6071cb483db44df52757ed36f396))
- Upgrade dependencies ([2e26be](https://github.com/techniq/svelte-ux/commit/2e26be658ec589b2d1185e1d2322154b02695b4f))
- [Dialog] Update async examples to set persistent while loading ([4b5c4f](https://github.com/techniq/svelte-ux/commit/4b5c4f9011db164d46cdb38297035cfee1d83712))

## 0.0.92

### Commits

- [TextField] Add `debounceChange` prop ([0f806c](https://github.com/techniq/svelte-ux/commit/0f806caf264dc7f8b6a71f671764f536113a5c0e))

## 0.0.91

### Commits

- Fix "destroy" typo in debounceEvent() action. Add SvelteActionReturnType return type to all actions. Add actions example to TextField ([93e1df](https://github.com/techniq/svelte-ux/commit/93e1df2103cbf689b6ac9e7baa7c80250454900f))

## 0.0.90

### Commits

- [Input] Fix show unfocused masked value using font-mono ([2b9e95](https://github.com/techniq/svelte-ux/commit/2b9e95b27658a5dc4729cee78acb7b00aac33fe5))
- [Input] Fix showing focused input without mask ([263967](https://github.com/techniq/svelte-ux/commit/2639676e85f4691dc7384602b7e6cda6058fe5ff))

## 0.0.89

### Commits

- [Input] Show input mask on focus (not first character. Only use font-mono when showing mask (not non-mask placeholder) ([3432ae](https://github.com/techniq/svelte-ux/commit/3432ae66673d7c96c3818ace2e0271f9c7068944))

## 0.0.88

### Commits

- [AppBar] Support setting color / other classes ([b920f5](https://github.com/techniq/svelte-ux/commit/b920f5148c21e1bbfff7817e9c96fccb940ad778))

## 0.0.87

### Commits

- Handle null values ([5fb6de](https://github.com/techniq/svelte-ux/commit/5fb6debe3ec0372de005fcdb7adfe739f7349e72))

## 0.0.86

### Commits

- Support changing mask to undefined ([40ffe7](https://github.com/techniq/svelte-ux/commit/40ffe76af19e73d1428655cf5308f4f6add0ae51))

## 0.0.85

### Commits

- [TextField] Support passing mask to underlying <Input> ([9488a2](https://github.com/techniq/svelte-ux/commit/9488a2d90709a5615bc6c7b6996c2a1acccb3961))
- Add custom link (a) and blockquote components for docs ([0e2df6](https://github.com/techniq/svelte-ux/commit/0e2df61d75923cc9d0df70d6254656df42f6d700))
- [TextField] Use <Input> instead of <input> to allow upcoming mask support ([9a4a65](https://github.com/techniq/svelte-ux/commit/9a4a651edbbc86344fd3a83c7acaa5ad6ab56a07))
- Add debounceEvent example ([2621b9](https://github.com/techniq/svelte-ux/commit/2621b91c7eeba213bab5dc167f7c8ca64bfb5f5c))

## 0.0.84

### Commits

- Update portal action to remove moved node if still contained. ([d2e334](https://github.com/techniq/svelte-ux/commit/d2e3348b1d7d4bc87aa6dac7fd364d5f2b903cd1))
- [DateRange / DateSelect] Show month of active date (from / to) ([a81ff2](https://github.com/techniq/svelte-ux/commit/a81ff2a821febc226442dd0185abd5ad2176f110))
- [DateButton] Do not set selected date as this is causing issues with controlled selected (ex. date ranges, arrays, etc) / changing from date to { from: ..., to: ... } ([368dec](https://github.com/techniq/svelte-ux/commit/368decac9f8a932f526f6c8cf5ac2d0e003e6eb4))
- Always render 6 rows to remove height changes between months ([85676d](https://github.com/techniq/svelte-ux/commit/85676d12f105a2bf661aed1b8dd085ed3c681929))
- Remove Grid usage ([bf0280](https://github.com/techniq/svelte-ux/commit/bf028070a192986657030ad3164c750115aabaac))
- Format on initial to handle partial values as well as different (but compatible) formats (ex. phone numbers) ([7653e6](https://github.com/techniq/svelte-ux/commit/7653e625c4f1288b0572ec4d54f70d5cec487003))
- Refine variables and add some comments ([00b905](https://github.com/techniq/svelte-ux/commit/00b9053451455d4bb7519bbca9a95d54e770fa3b))
- Update SvelteKit ([fbbbec](https://github.com/techniq/svelte-ux/commit/fbbbecd77c43fe85092f04fb3f141184bedc670d))

## 0.0.83

### Commits

- Update type on on multi action destory to use object function shorthand ([db8d3b](https://github.com/techniq/svelte-ux/commit/db8d3b2cb85a1a579b1e60afd652f3245e669f07))

## 0.0.82

### Commits

- Add debounceEvent action ([d6ed26](https://github.com/techniq/svelte-ux/commit/d6ed267ffd3b34dcfc39c3abc9cd70e1016a622b))
- Upgrade dependencies ([5b0220](https://github.com/techniq/svelte-ux/commit/5b0220fb21c8e6e1c07b28c35f9a0a35f7f75cda))
- Upgrade dependencies ([c76661](https://github.com/techniq/svelte-ux/commit/c76661ddc99bcfcdaa9a14483971acf2dd27e4c7))

## 0.0.81

### Commits

- [DateField] Add picker prop to opt-in ([e5bf3a](https://github.com/techniq/svelte-ux/commit/e5bf3a0084633135562a6b0a345f10b32e9d46b3))

## 0.0.80

### Commits

- Add Input and DateField to exports ([130332](https://github.com/techniq/svelte-ux/commit/13033204c4901c0aceec8e9f7bfc447e8e926915))

## 0.0.79

### Commits

- Finish DateField and Input for initlal release ([2ed631](https://github.com/techniq/svelte-ux/commit/2ed631005d686e7a1f946bd0bdcd7e92b7208e68))
- [Field] Support non-Array or string values (ex. Date) ([7a5e3f](https://github.com/techniq/svelte-ux/commit/7a5e3f950d54c1a13e96c62a424371a60e1a7e9d))
- [DateField] Only null value on input change if equals mask. ([a41db5](https://github.com/techniq/svelte-ux/commit/a41db552aa79f71d58359f76afd271f067a402c9))
- [DateField] Improve append items (layout with error, DatePickerField, dispatch change on clear and DatePickerField ([9dafe2](https://github.com/techniq/svelte-ux/commit/9dafe236fd5dd49af7b33ca98e5de2076fd73c04))
- Add Input (with mask) and DateField (WIP) ([c9f45a](https://github.com/techniq/svelte-ux/commit/c9f45abe664fc545e2ad9002fc6e7806beb21b12))
- Remove wrapping div and move Dialog to bottom ([148912](https://github.com/techniq/svelte-ux/commit/148912b2b1bdc09894b09f2af2065090aeab18fd))
- Remove unneccessary Stack wrapper ([86375b](https://github.com/techniq/svelte-ux/commit/86375bc775a4ef0ddcc5a642d69f1526ee6c0daa))

## 0.0.78

### Commits

- [DatePickerField] Fix change event on clear ([1b2892](https://github.com/techniq/svelte-ux/commit/1b2892a420f8c7d643c959ade5a645257bef02cd))

## 0.0.77

### Commits

- [json] Parse date-only strings as local date using date-fns parseISO() ([1be4dc](https://github.com/techniq/svelte-ux/commit/1be4dc808f1a727f0e134da728bd74464144e80c))

## 0.0.76

### Commits

- [Backdrop] Set z-index by usage ([c1ccb6](https://github.com/techniq/svelte-ux/commit/c1ccb67ec422d98b6dfa2c363b4ee663a7b9aecf))

## 0.0.75

### Commits

- [Dialog/Drawer] Use portal for Backdrop as well (if enabled) ([97af90](https://github.com/techniq/svelte-ux/commit/97af902e578c8fc290b9e0eb9b5a4cb90b564e0a))

## 0.0.74

### Commits

- Improve json date regex to support offset-based strings (not just UTC/Z) ([7b3dcf](https://github.com/techniq/svelte-ux/commit/7b3dcffd94eef32f9104ead178e7394ddf65d0a8))

## 0.0.73

### Commits

- [graphStore] Use custom JSON reviver to convert Date strings to Date objects ([b41ebb](https://github.com/techniq/svelte-ux/commit/b41ebb8a6c02c25e14dcb485ab9e00bdb4c842ae))

## 0.0.72

### Commits

- [DatePickerField] Support clearable prop ([1ed91d](https://github.com/techniq/svelte-ux/commit/1ed91dcb95c5b0ce3a899e7cd19f95cd4608464e))

## 0.0.71

### Commits

- [DatePickerField] Set min-height so empty value maintains height as value set ([63ce8d](https://github.com/techniq/svelte-ux/commit/63ce8d4a80e738093014e1b9cb3fafedcaa13719))
- [ListItem] Add another radio group example and remove Stack from examples ([5fb8ea](https://github.com/techniq/svelte-ux/commit/5fb8ea5500541afc6f6f3c1b72741b1c3cf19556))

## 0.0.70

### Commits

- [localStore] Fix SSR, take 4 ([659ab8](https://github.com/techniq/svelte-ux/commit/659ab8172a0750a2de402adbbdc62df94f1080fa))

## 0.0.69

### Commits

- [localStore] Fix SSR, take 3 ([eaf0df](https://github.com/techniq/svelte-ux/commit/eaf0df0c2a3e0e0367e8e5d93aec7f7b7e8e9a98))

## 0.0.68

### Commits

- [localStore] Fix SSR, take 2 ([c54f39](https://github.com/techniq/svelte-ux/commit/c54f39fa4e7bc295a2c538d3764a37556cf94baa))

## 0.0.67

### Commits

- [localStore] Fix SSR ([0f8439](https://github.com/techniq/svelte-ux/commit/0f8439f6cda9821061776de29d76eebd0ab364c5))

## 0.0.66

### Commits

- [NavItem] Do not allow icon to flex shink ([e6fb15](https://github.com/techniq/svelte-ux/commit/e6fb1576e520eb29921fd0587fd416d0773f11a2))

## 0.0.65

### Commits

- [NavItem] Support passing on:click event ([aca064](https://github.com/techniq/svelte-ux/commit/aca064e3983dcc1ff28114b1842bf380b543366c))

## 0.0.64

### Commits

- [NavItem] Fix types to support not passing `path` or `text` ([ca9cab](https://github.com/techniq/svelte-ux/commit/ca9cabcfeefaf87d895bf58ed1d6dcc8d23f23c3))

## 0.0.63

### Commits

- Handle null/undefined path ([186454](https://github.com/techniq/svelte-ux/commit/186454fe70092ea5cc4e7d7dfc11c981c5a1d72c))
- [NavItem] Fix active border color and support passing default slot ([34fc65](https://github.com/techniq/svelte-ux/commit/34fc652e756a720445b1e3ba85d042da933044a7))

## 0.0.62

### Commits

- [NavItem] Remove show prop (best to wrap with own component to access path, etc) ([ab6d46](https://github.com/techniq/svelte-ux/commit/ab6d466902f3ceb5962936f153d95e10f9a2d56c))

## 0.0.61

### Commits

- [NavItem] Add show prop to show/hide (based on access, etc) ([e19008](https://github.com/techniq/svelte-ux/commit/e190086154d562c2d68f6b4ca8a841f36e775a51))

## 0.0.60

### Commits

- [Dialog] Do not close if clicking on disabled action (which falls through to actions slot element) ([d392a0](https://github.com/techniq/svelte-ux/commit/d392a09f68645d715a6c5147564a93698fa32250))

## 0.0.59

### Commits

- [formStore] Improve error type (but not exact) ([0646dd](https://github.com/techniq/svelte-ux/commit/0646dd70b17daa70e5d9805540f2904b5ad4c646))

## 0.0.58

### Commits

- Add pick() object helper and refine omit() to have similar implementation using Object.fromEntries() ([2e9d5b](https://github.com/techniq/svelte-ux/commit/2e9d5bd4ba60e424bfd62a2394e364b2a8943fc8))
- [Dialog] Improve examples and show examples of async flows ([791115](https://github.com/techniq/svelte-ux/commit/79111541770f4f5f9e5a65cfbff7f138a8a19362))

## 0.0.57

### Commits

- [Collapse] Use first-of-type: instead of just first: to simplify required markup ([f12611](https://github.com/techniq/svelte-ux/commit/f1261101e72844e7e7ba481db8b2c793cde6dfe8))

## 0.0.56

### Commits

- Upgrade dependencies ([e69d35](https://github.com/techniq/svelte-ux/commit/e69d35adafebf553196d3e9a9dcf3d06d44f4b86))
- Remove Grid from Badge examples ([4da97b](https://github.com/techniq/svelte-ux/commit/4da97bca31e322e4c1ccb0b25cc4f121e316a156))
- Remove Grid from Field examples ([48b67e](https://github.com/techniq/svelte-ux/commit/48b67ed202e4b0bbda2b9b60630dea3302a89410))
- Remove Grid from Popover examples ([c262ab](https://github.com/techniq/svelte-ux/commit/c262abf1cdee0a40642555e570928c7d08153fc2))
- Remove Grid from TextField examples ([9e4235](https://github.com/techniq/svelte-ux/commit/9e4235436b341e6f587376779606ff2646aeb9f9))
- [ExpansionPanel] Use `first-of-type:` to not always require wrapping container ([b1d6f8](https://github.com/techniq/svelte-ux/commit/b1d6f894fd16235155b8bb77c066a0733357d36a))
- [ListItem] Remove use of Stack and $$slots. Use <li> instead of <div> and use `first-of-type:` to not always require wrapping container ([7d5d61](https://github.com/techniq/svelte-ux/commit/7d5d6130a7f3ff69fe9440d1e75c500c91e94759))

## 0.0.55

### Commits

- [SelectField] Show loading indicator in same location as clear/chevron and match size to reduce jumping with append slot actions ([c3ab52](https://github.com/techniq/svelte-ux/commit/c3ab52b43666b298e8b45607e9a887054f79747c))
- [SelectField] Use same icon locatoin for loading as chevron/clear to reduce jump and spacing ([16ae83](https://github.com/techniq/svelte-ux/commit/16ae8387008b48b0dc66a6b81b3cade099ba37c5))

## 0.0.54

### Commits

- [Dialog/Drawer] Move escape closing to root element instead of window to prevent multiple listeners (stop closing all open Modals). Will likely require focus trapping as well to have active element within modal ([82a130](https://github.com/techniq/svelte-ux/commit/82a1308105b1b858e28a6195eb7d08735a55e0a6))
- [SelectField] Do not show menu if disabled (on click, etc) ([872e95](https://github.com/techniq/svelte-ux/commit/872e95cbdf669649606dbb96c7ff74192d4d2478))

## 0.0.53

### Commits

- [TextField] Remove slots props (had regressions) ([dbf756](https://github.com/techniq/svelte-ux/commit/dbf7561a2b5fc73d1acd58aad17afac04a9cc63b))
- [TextField] Use flex (with flex-grow) instead of grid (Stack) with dynamic template for layout. Removes one less dependency on $$slots and simplifies. Also remove other use of Stack ([e82490](https://github.com/techniq/svelte-ux/commit/e82490d76c55df748cdf728f8cb9be9ba7d76c7e))
- Simplify tailwind Stack examples for z-stacking / overlay ([5a7376](https://github.com/techniq/svelte-ux/commit/5a7376d2b58bc03e4727523cd55efe1f7a4cf42e))

## 0.0.52

### Commits

- [TextField] Cleanup "with" and "w/" in docs ([91ad54](https://github.com/techniq/svelte-ux/commit/91ad54410cd2333b76ac9c9cc96bdea83dddb0f2))
- [TextField] Add logging to troubleshoot ([42a764](https://github.com/techniq/svelte-ux/commit/42a764720b5171ae3f865b2ab6852ad121f449ca))

## 0.0.51

### Commits

- [TextField] Rename prop back to `slots` (didn't fix issue). Remove reactivity of hasPrepend/etc in attempt to fix. ([31d6f4](https://github.com/techniq/svelte-ux/commit/31d6f476d35963667cfbd1ba352aff827645e9ba))

## 0.0.50

### Commits

- [TextField] Rename `slots` to `slotsDefined` in attempt to workaround issue ([58b725](https://github.com/techniq/svelte-ux/commit/58b725aae0bb3dba89966762c77120852dc91b45))

## 0.0.49

### Commits

- [TextField] Support passing slots prop as override for $$slots. Workaround for https://github.com/sveltejs/svelte/issues/6059 ([8af774](https://github.com/techniq/svelte-ux/commit/8af7746ce7e4dc44e508ecc69af05ff1d43cd908))
- Reduce logger level ([08b473](https://github.com/techniq/svelte-ux/commit/08b473ff0267feccb5773afb5581d3df7627ddd0))

## 0.0.48

### Commits

- [SelectField] Support append/prepend slots ([839dd3](https://github.com/techniq/svelte-ux/commit/839dd3fa88414e074ea922e8ee9c633e51ceee08))
- [SelectField] Support customizing empty slot ([d91603](https://github.com/techniq/svelte-ux/commit/d9160314ff447b05bc334825ac611cc0234b42f1))
- [Button] Do not apply rounding if `base` set ([333313](https://github.com/techniq/svelte-ux/commit/3333134f118e722664d28d9bae8c66a3eef1b266))
- [TextField] Add autoFocus prop to simplify basic usecase (`actions` if needing more) ([9bc0f5](https://github.com/techniq/svelte-ux/commit/9bc0f59066d69494171463d39ee3dd72e106f268))
- Improve types on input actions to support <textarea> ([5b9171](https://github.com/techniq/svelte-ux/commit/5b917108159f00c23cdcbc3c4b20158e1dacc0a2))
- [Dialog/Drawer] Change `clickAway` to opposite `persistent` (default: false) ([7fe06d](https://github.com/techniq/svelte-ux/commit/7fe06da4102b1fdb7a6e5a302d57af54fb682617))
- [SelectField] Simplify some examples ([ceb529](https://github.com/techniq/svelte-ux/commit/ceb5293ed1e6f3f3e0b2d3c116f5ac1eeffc451f))

## 0.0.47

### Commits

- Upgrade dependencies ([7a888e](https://github.com/techniq/svelte-ux/commit/7a888e777b3a9047ed63c999ac841ff346919c21))

## 0.0.46

### Commits

- Export updatePosition() from Menu/Popover and call when items change on SelectField ([112829](https://github.com/techniq/svelte-ux/commit/11282992e32ec39970e403bc7d99b2a4fe66cdeb))
- Rename setPosition() to updatePosition(). ([4bfe08](https://github.com/techniq/svelte-ux/commit/4bfe0821c93377fec817118b0aeba790562d0bc8))

## 0.0.45

### Commits

- [SelectField] Default maxViewportHeight = true as it makes more sense (but not for underlying Menu/Popover which are typically smaller). Apply same disableTransition default as Menu ([bf21eb](https://github.com/techniq/svelte-ux/commit/bf21ebf0489e402b203bf56688143b1479a65752))
- [Menu] Default disableTransition = true if placement starts with 'top' (currently required). Pull class/style from $$props ([f0b2ea](https://github.com/techniq/svelte-ux/commit/f0b2ea3664b2327bbff212e14896e74635ac438f))

## 0.0.44

### Commits

- [Popover] Set maxHeight on open so available for positioning (top placement, etc) ([ec1259](https://github.com/techniq/svelte-ux/commit/ec125905875eb12c507901eaaaa11657c7243847))
- [Popover] Move all style setting to common/mutable popoverStyles. Extract getPopoverMaxHeight() ([4487b9](https://github.com/techniq/svelte-ux/commit/4487b9d196b40e1d03f5bf0c3b4fc7bfcfbd8f02))
- [Popover] Do not attemot to reposition if resizing (maxViewportHeight) ([53a5ed](https://github.com/techniq/svelte-ux/commit/53a5eddcfa74539d0522987e7e296ae74371dba7))
- [Popover] Do not remove scroll event listener until re-adding is working ([1982c2](https://github.com/techniq/svelte-ux/commit/1982c264b7f0a4f4f8e3099450503e8263ea282d))
- [Popover] Setup logger instance instead of console.log ([51f5d8](https://github.com/techniq/svelte-ux/commit/51f5d8aac76ec47d19a01971cc494d62eeed035c))
- Fix typos and improve description ([7c3824](https://github.com/techniq/svelte-ux/commit/7c3824dfe4553479d98c0ee43c12badf60830dce))
- Add maxViewportHeight up to Popover from Menu which improves some transition scenarios (but not all). Move Menu styling up to Popover parent as well. ([817506](https://github.com/techniq/svelte-ux/commit/8175062b6e54e84e3681144925da54e0d7a42b67))
- Improve layout of h3 after h2 in docs ([aaf888](https://github.com/techniq/svelte-ux/commit/aaf8883f570d0564b6ff2bd4c7c85a8142890d4b))

## 0.0.43

### Commits

- [Popover] Fix $lib import for getScrollParent() ([854056](https://github.com/techniq/svelte-ux/commit/8540568431bf72d1de0997a8c98ad427572f113b))

## 0.0.42

### Commits

- Fix getScrollParent() SSR support ([e83b3b](https://github.com/techniq/svelte-ux/commit/e83b3b47202ec8096f11a5e28adbc804ac0cc465))

## 0.0.41

### Commits

- [SelectField] Add `disableTransition` and`maxViewportHeight` Menu props and arrange exports ([073c0b](https://github.com/techniq/svelte-ux/commit/073c0bea54f201ff6a8cca05a9ea3bf7e0ae2e03))
- [Menu] Add cursor-pointer to all menu item examples ([da90d2](https://github.com/techniq/svelte-ux/commit/da90d22d6ee8b88bd1e8ff3f4e8233afd0b8dc74))
- [Popover/Menu] Expose setPosition to slot and use to update position after transition ends. Add `maxViewportHeight` to Menu to explicitily control (and default to false). ([363dd4](https://github.com/techniq/svelte-ux/commit/363dd4cfd01c1fa508d736b3fdbe942ab98e0284))
- Style h3 (i.e. ###) headers in docs for convenience and consistency ([068211](https://github.com/techniq/svelte-ux/commit/0682111d3657314486db800ac1accd50767365f9))
- [Popover] Update position if scrolling container is not `window` ([20c8d1](https://github.com/techniq/svelte-ux/commit/20c8d1f7335974bca1db78ee1880e03a20e811c8))

## 0.0.40

### Commits

- Add loading state to Dialog and Drawer ([bd727a](https://github.com/techniq/svelte-ux/commit/bd727a434a196f77de792f96bcc5c246d41aa1e8))

## 0.0.39

### Commits

- [SelectField] Pass $$restProps to underlying TextField ([4c1b4e](https://github.com/techniq/svelte-ux/commit/4c1b4e9824d916efa9fa6f2b16c5c4a6d52ed70c))
- [Field] Improve display of <select> example ([6de45d](https://github.com/techniq/svelte-ux/commit/6de45df30e0187755c9c7ee33a454f3cda160245))

## 0.0.38

### Commits

- [ErrorNotification] Show dismiss button as primary if no details ([63bfd8](https://github.com/techniq/svelte-ux/commit/63bfd8ea9ce2b2c3a04b5c1b5212d6c3b31e7e61))

## 0.0.37

### Commits

- Rename immerStore/Immer to formStore/Form and support zod schema validation ([0da816](https://github.com/techniq/svelte-ux/commit/0da816ddeb63dc025886d8fcc19515c0574f2b44))
- [ErrorNotification] Use relative imports ([76b8a5](https://github.com/techniq/svelte-ux/commit/76b8a5e52f8236de627c74aaf1f6f36ca197f938))

## 0.0.36

### Commits

- [graphStore] Initialize fetch client with config when initializingGraphClient ([0e3532](https://github.com/techniq/svelte-ux/commit/0e3532d117436cf3b70e9f5f4c70775e00cbefaa))

## 0.0.35

### Commits

- Always merge into new object to not blend configs ([916975](https://github.com/techniq/svelte-ux/commit/9169758292a5b3c2357a832dcbf571388d545a24))

## 0.0.34

### Commits

- [fetchStore] Do not require context config ([66e6fd](https://github.com/techniq/svelte-ux/commit/66e6fd2b3bdca4746111478cd1de0c0bf9972003))

## 0.0.33

### Commits

- Add initFetchClient() to provide context-level config. Move errors from exported store to context (or local) config. Works around Vite issue with export instances and provides more flexibility (globally disable all fetching, etc). ([58a393](https://github.com/techniq/svelte-ux/commit/58a393634be7903a976aa5a29e415426d4bdd9fc))
- [ErrorNotification] Fix button hover color ([b7988e](https://github.com/techniq/svelte-ux/commit/b7988efa6846168bce2d8b44e183779851ad80b7))

## 0.0.32

### Commits

- [Field] Fix focused and hovered label state by adding explicit state containing both (like TextField) ([ea6bac](https://github.com/techniq/svelte-ux/commit/ea6bac957527a41e21dab00b6cf496472b84615f))

## 0.0.31

### Commits

- [Switch] Support size prop ([a03670](https://github.com/techniq/svelte-ux/commit/a03670ae02adeb6487eb4d63ce480e1cc9d9d8c3))
- Remove Stack from Switch examples ([5c2001](https://github.com/techniq/svelte-ux/commit/5c2001924896f213d0dfba92a472e18642783920))

## 0.0.30

### Commits

- [Popover/Tooltip] Fix offset when used with non top/bottom/left/right placement (ex. bottom-end) ([d726ab](https://github.com/techniq/svelte-ux/commit/d726ab4002950d2f6b3b4e390bed99d34ac112e5))
- [Tooltip] Add offset example ([45f63b](https://github.com/techniq/svelte-ux/commit/45f63b1d58afef422395527bdeb1cb8bb62d8f9a))
- Remove Grid from Tooltip examples ([bee705](https://github.com/techniq/svelte-ux/commit/bee705cacb8ab5c16404a332ac51234dd6c482c6))
- Upgrade dependencies ([d550b2](https://github.com/techniq/svelte-ux/commit/d550b298fa813484b153080de080828ae1150da9))
- Improve ExpansionPanel examples ([59f1e6](https://github.com/techniq/svelte-ux/commit/59f1e66b1db8002507201b8bc8f75845838ee8cf))

## 0.0.29

### Commits

- [TextField] Fix focused and hovered label state by adding explicit state containing both ([13c86c](https://github.com/techniq/svelte-ux/commit/13c86c0db7e374c33b1e4daf9b0398e434903557))

## 0.0.28

### Commits

- Darken top border of expansion panel contents ([d12ccc](https://github.com/techniq/svelte-ux/commit/d12ccc47b4b8aa89c10a66c50758ea182c0df20b))

## 0.0.27

### Commits

- Only show tooltip if title is truthy (not null or empty string) ([00ca52](https://github.com/techniq/svelte-ux/commit/00ca52e776cd468553fb24aa802a02f3464f906b))

## 0.0.26

### Commits

- Fix DateRangeField by using arbitrary value (w-[640px]) instead of non-default theme value (w-160) ([0ee4cd](https://github.com/techniq/svelte-ux/commit/0ee4cd9635ef6a1e9d58751609a1a68f8aace3e7))
- Fix Drawer and Notification examples by using arbitrary width (remove non-default theme value) ([cdfaee](https://github.com/techniq/svelte-ux/commit/cdfaeef4e5c3217851a0b6701fc297498a8ffa9a))

## 0.0.25

### Commits

- Fix background DatePickerFIeld, DateRangeField, and ErrorNotification buttons ([6a4135](https://github.com/techniq/svelte-ux/commit/6a413510bc907daa56e79640b10d62212c109dbd))

## 0.0.24

### Commits

- [DateRange] Remove Grid/Stack and use tailwind-only grid classes ([3a1bf6](https://github.com/techniq/svelte-ux/commit/3a1bf69870f8c7c8db2944372e305d4f92d89d86))
- Add taiwind-only examples of Grid and Stack (considering removing due to css variable inheritance issues) ([367b69](https://github.com/techniq/svelte-ux/commit/367b69ae6fefed11b39c04a3bc43be4c2e352c30))

## 0.0.23

### Commits

- [Badge] Allow value prop to be optional after adding value slot ([32f64b](https://github.com/techniq/svelte-ux/commit/32f64b66178a2f1c810e351ae11935cc7f077bc4))

## 0.0.22

### Commits

- [Badge] Support "value" slot for more control of display ([4060ac](https://github.com/techniq/svelte-ux/commit/4060ac5238858490ee72247e33c5e15a5d119b0f))

## 0.0.21

### Commits

- [Button] Do not apply default hover style if applied via class prop (no guarantee of style order in prod) ([5a018a](https://github.com/techniq/svelte-ux/commit/5a018a30ffa6c15a5be6df8658c4790179ef7af2))

## 0.0.20

### Commits

- Add ErrorNotification component ([ec0dd7](https://github.com/techniq/svelte-ux/commit/ec0dd76a414b90c3803dab6bbca82fdb56659c6a))
- Add scale transitions to Radio and Checkbox icons ([bb481c](https://github.com/techniq/svelte-ux/commit/bb481c54dad9abc34f32a90e375f7f9e57fb51e9))
- Add docs for input actions ([9b310e](https://github.com/techniq/svelte-ux/commit/9b310e9494de11a344323f637eea29b20668ad35))
- Upgrade d3-array ([e3fbfa](https://github.com/techniq/svelte-ux/commit/e3fbfa1cbd7591b29ffc2ce657de811a9e0c8dc9))
- Upgrade dependencies ([74f2a4](https://github.com/techniq/svelte-ux/commit/74f2a4b922113fbbeee129893630504bb3f6b850))

## 0.0.19

### Commits

- [fetchStore] Pass full state as second argument to onResponseChange() ([6a8299](https://github.com/techniq/svelte-ux/commit/6a8299e5c596d746752fd8ee620bdcdcd5a3a3ae))

## 0.0.18

### Commits

- [Dialog] Add classes prop to allow styling slot wrappers ([539dc5](https://github.com/techniq/svelte-ux/commit/539dc547469b28c0a262eebd6f91069f20cb0b79))
- Improve ListItem header docs (proof of concept) ([ec3abc](https://github.com/techniq/svelte-ux/commit/ec3abcd93d3a9b3c6e3c49a9ee9f6e1f2c5f9264))
- Add getDuration example ([bea8aa](https://github.com/techniq/svelte-ux/commit/bea8aa1ce3196ac30ee79dc294917b350ce6362e))
- Refine radio group examples ([362f1b](https://github.com/techniq/svelte-ux/commit/362f1bf90affbc85b9342e356c15da7af935f5ae))

## 0.0.17

### Commits

- [fetchStore] Always handle thrown errors as errors regardless of response status. GraphQL typically returns 200 even if errors are raised (see graphStore) ([706685](https://github.com/techniq/svelte-ux/commit/70668554f8c06be23fbc6fe39eca07802e0c6828))
- Update .prettierrc to use spaces (instead of tabs) and include trailing comas. Execute "npm run format" ([209f1d](https://github.com/techniq/svelte-ux/commit/209f1d5022155b2952506960b8f962ca955c0a6a))

## 0.0.16

### Commits

- [ListItem] Add radio group examples ([810d1e](https://github.com/techniq/svelte-ux/commit/810d1e415a72044f4c698bc6419d690105cc760a))
- [ListItem] Add noShadow prop to fix conflict with `ring` styles (which use box-shadow as well) ([fe1e5f](https://github.com/techniq/svelte-ux/commit/fe1e5fe1d9e117d8ccd2054220ba6b95e24da66e))
- Add Steps (WIP) ([90941a](https://github.com/techniq/svelte-ux/commit/90941aed76a57f3d22e437020b56fef5e16924e6))
- Add TODO to add to add currency suffix mapping (`G` => `B`, for example) ([3c8ccb](https://github.com/techniq/svelte-ux/commit/3c8ccb02a7b80d90b26f89f6a9a354ac91223eda))

## 0.0.15

### Commits

- Add safety handling for "Error: {#each} only iterates over array-like objects." in case null/undefined is passed ([41d594](https://github.com/techniq/svelte-ux/commit/41d5946d91b55a51fdb589f1965e9f235f63957d))
- [Field] Add select example ([bb2903](https://github.com/techniq/svelte-ux/commit/bb290360ea6ca213baec5a1ece1454ca6968a4f8))
- Update custom Field example to use date input ([507754](https://github.com/techniq/svelte-ux/commit/50775462661e7f03bd2b76d81494249257635cc8))

## 0.0.14

### Commits

- [EmptyMessage] Support passing class prop ([c37178](https://github.com/techniq/svelte-ux/commit/c37178c8d06f5ea395f48c389c8f88277a2e2ea5))

## 0.0.13

### Commits

- [ListItem] Forward on:click events ([cd32d8](https://github.com/techniq/svelte-ux/commit/cd32d823da8e4a74bfdee7eb24de23872f759dab))
- [Badge] Fix dot and improve examples ([6a2b9b](https://github.com/techniq/svelte-ux/commit/6a2b9b68e27ac4dfe3dfa70bd9daebcc70746e79))
- Add observer actions and missing Badge export ([7a3fc8](https://github.com/techniq/svelte-ux/commit/7a3fc876cdb27c66ffc7bfb77a9a71f00d92597a))
- Add Badge component ([0ceb2f](https://github.com/techniq/svelte-ux/commit/0ceb2f738bca26ffdcf201fbf34036f7442b1131))

## 0.0.12

### Commits

- Use relative paths to fix package ([188be5](https://github.com/techniq/svelte-ux/commit/188be5a3da18de54fd0552077944ab184cbc4b9e))

## 0.0.11

### Commits

- Add Table (and related) components. Add tableOrderStore and sticky action. ([476cb0](https://github.com/techniq/svelte-ux/commit/476cb01fecdd5df75f8cec307f1ee19305f7ff36))
- Add format, number, and sort utils ([d30dbd](https://github.com/techniq/svelte-ux/commit/d30dbd1a38d26613553dac809b7b1bf1ef5f8c2a))
- Move typeGuards and typeHelpers from utils to types module ([dcbb41](https://github.com/techniq/svelte-ux/commit/dcbb417b361b9bf06d79acae8b6f0584b9594584))
- [graphStore] Handle no client initialized and use default "/graphql" url ([0b10b1](https://github.com/techniq/svelte-ux/commit/0b10b179033d8056791853cfa29db8691ad8e411))
- Export initGraphClient from top-level exports ([e16108](https://github.com/techniq/svelte-ux/commit/e16108529a33e99b417adf3105f56f59ce97403c))
- Add more Icon examples and cleanup undefined class when not set ([ccf0e0](https://github.com/techniq/svelte-ux/commit/ccf0e0e6aa51a1cadaa2ddb075f9ded0cd7246d9))

## 0.0.9

### Commits

- Fix top-level exports of stores ([d9412a](https://github.com/techniq/svelte-ux/commit/d9412a8b540f958452aa834d4a4beef45630f3ea))

## 0.0.8

### Commits

- Return to using $lib for all doc imports to fix paths ([727c55](https://github.com/techniq/svelte-ux/commit/727c55c5836535280969941c678b4499d7706233))
- Move tailwindcss-elevation as devDependencies ([05d6ff](https://github.com/techniq/svelte-ux/commit/05d6ff593aaa561113f5b7d41d153e7f1cb0358a))

## 0.0.7

### Commits

- Remove all use of "$lib" and use relative "../" instead to fix SSR import errors ([8000ef](https://github.com/techniq/svelte-ux/commit/8000ef554fc30b267e7bd4d18c1c16b038a6ae76))

## 0.0.6

### Commits

- Comment out routing utils export until import error is resolved ([d8be8f](https://github.com/techniq/svelte-ux/commit/d8be8f3c2f5947ffdab7b0fc8daad0e970ae5a1a))

## 0.0.5

### Commits

- Change imports to relative to hopefully fix importing from npm (not sure why yet) ([09b029](https://github.com/techniq/svelte-ux/commit/09b02949adf8dfbf1a82c4da13864ea1b2ffd154))
- Fix DatePickerField export ([c88e97](https://github.com/techniq/svelte-ux/commit/c88e97763e8fe783febc539bb1dd0c0fe387efc8))
- Refine npm publish ([48ac0e](https://github.com/techniq/svelte-ux/commit/48ac0e2b3cbb1bb41736e632d9aff688cf9ed885))
- Update README ([91ac68](https://github.com/techniq/svelte-ux/commit/91ac68af65520448fb04f5c0cdf88de86415f82b))

## 0.0.4

### Commits

- Change import to relative ([cd53e5](https://github.com/techniq/svelte-ux/commit/cd53e5b13694be2c40a12c97c475dba7d650ad9c))
- Fix exports of components ([7008d1](https://github.com/techniq/svelte-ux/commit/7008d1b21123e8528da71852e92801b363d1082b))

## 0.0.3

### Commits

- Add publishing docs (until automated) ([b5c0d4](https://github.com/techniq/svelte-ux/commit/b5c0d4e880615499c49d46b19909c4ab4f0b494e))
- Update all top-level exports ([8e3265](https://github.com/techniq/svelte-ux/commit/8e32652a09493f18f132fd4a2809ca2c0e78bb9e))
- Rename MenuItem to NavItem and \_Menu to \_NavMenu ([6b0889](https://github.com/techniq/svelte-ux/commit/6b08894e7ea5b5858b475cce43ac151cd33a603d))
- Add many date components ([981b2b](https://github.com/techniq/svelte-ux/commit/981b2b09d355d3dd276f788c594cf7b17e22f032))
- Update more text-secondary => text-black/50 and bg-black/4 => bg-black/5 ([50d423](https://github.com/techniq/svelte-ux/commit/50d4230290bc941de3aaebd22dd98ff4817aea53))
- Add tailwind colors as CSS variables ([627bcc](https://github.com/techniq/svelte-ux/commit/627bcc0b0e034b9744ca9908e61d0b0005474dc3))
- Fix hover color ([b2a4af](https://github.com/techniq/svelte-ux/commit/b2a4afab08e0be741fa2b8c5a179148a9a3d7aae))
- Add debounceStore and localStore ([6c9519](https://github.com/techniq/svelte-ux/commit/6c951931753e38e789b33e6123ef997ccecccabe))
- Add Immer component and immerStore. Add basic docs for state components ([745298](https://github.com/techniq/svelte-ux/commit/7452981319e70d68c8b6cd16ebba806da137544b))
- Add Paginate and Pagination components. Add paginationStore. ([59d2a0](https://github.com/techniq/svelte-ux/commit/59d2a078ca20e823bd03e11ad08f00a32ce9e4dc))
- Add queryParamsStore and more utils ([ed8422](https://github.com/techniq/svelte-ux/commit/ed842202ac4ee9518c5315bdeb3f7f74b590870c))
- Add fetchStore and graphStore ([c10596](https://github.com/techniq/svelte-ux/commit/c105967712878c607ab86c1c6a248d2ab1c92ce6))
- Add SelectField component. Add logger and promise utils ([c3c81a](https://github.com/techniq/svelte-ux/commit/c3c81a5e0dba9a0bf94a99da4eec37a3f71b1638))
- Add ListItem component ([0a1d08](https://github.com/techniq/svelte-ux/commit/0a1d088ebe1f2527f33f9069d5d41bd0eb088331))
- Add Collapse and ExpansionPanel components. Add "tailwindcss-elevation" plugin (for now) ([34ed80](https://github.com/techniq/svelte-ux/commit/34ed80289c3554f63e3e50044d807672662d14dd))
- Extract Menu into separate component ([960094](https://github.com/techniq/svelte-ux/commit/960094eaee0d47e5749624a25a726e8ee9224952))
- Organize menu ([a148a8](https://github.com/techniq/svelte-ux/commit/a148a83d30006869a20c3077ee3c392f1edb9c00))
- Simplify tailwind purge ([b07b59](https://github.com/techniq/svelte-ux/commit/b07b5967c7ca4fdb0e05d948435dd4854782a30c))
- Add State component ([1b521a](https://github.com/techniq/svelte-ux/commit/1b521a4559617c0cedfa5540707ca5bb99e136cb))
- Add ViewportCenter component ([f1e42f](https://github.com/techniq/svelte-ux/commit/f1e42f3ddf13150f18a2800ad01b1c0b315c3a72))
- Upgrade Svelte and Tailwind to latest ([f11ab3](https://github.com/techniq/svelte-ux/commit/f11ab3582f4c21ef6264d110f9462ff1700d9936))
- Add Menu, Popover, and Tooltip components. Add remainingViewportHeight action and objectToString util ([476fe7](https://github.com/techniq/svelte-ux/commit/476fe72539582aa5de84feae389850dfaae9eca5))
- Fix index route and add menu link ([f7e862](https://github.com/techniq/svelte-ux/commit/f7e862cf3df81b94ec04928cdae75d80bafcaba7))
- Add Field and TextField components ([a5c9a0](https://github.com/techniq/svelte-ux/commit/a5c9a04ea0fb18a13b83bd3b48a517c450490e47))
- Add Switch and Tabs components ([6dedc8](https://github.com/techniq/svelte-ux/commit/6dedc8ba97eface585fdf9792a668eed3fcb8ae0))
- Replace text-secondary with text-black/50 ([186799](https://github.com/techniq/svelte-ux/commit/18679973c74997e370cd202f61644fe9f17a915f))
- Add Checkbox and Radio components ([1fd5d1](https://github.com/techniq/svelte-ux/commit/1fd5d19aeb5568f84648b231899d5dc0539d5a53))
- [Icon] Remove color prop and require to be set by currentColor (which can be passed as class prop). ([324fd5](https://github.com/techniq/svelte-ux/commit/324fd5a5327ef0e49a96fe88b45b8f8bdc72edad))
- Add custom error using layout page ([680689](https://github.com/techniq/svelte-ux/commit/6806898e3bf905d8ce1c410541fa7fedf636811d))
- Add Dialog, Drawer, Notification, and Toggle components. ([44a3be](https://github.com/techniq/svelte-ux/commit/44a3be7b87bb53d53f2d1dd7b756479b116cd750))
- Add Avatar, Card, CircularProgress, and Overlay ([f7087a](https://github.com/techniq/svelte-ux/commit/f7087a832fd3e463980689eff85c3fbb5946de89))
- Move all component docs into directory ([a5cf62](https://github.com/techniq/svelte-ux/commit/a5cf62a9b8607efdce0a873ee6bb7ac875088bc2))
- Fix Breadcrumb and Icon docs ([c57964](https://github.com/techniq/svelte-ux/commit/c579649ee1c5f78a0cf628e828d6d235be54c49b))
- Add MenuItem component. Add scrollIntoView action. Add dom and routing utils. Update layout. ([b9acdb](https://github.com/techniq/svelte-ux/commit/b9acdb79f4c30d5976244c63e06dc65f233bd04f))
- Add sky color to palette ([6c3ee5](https://github.com/techniq/svelte-ux/commit/6c3ee565930ffc2ba0d977d0c050763a5090d166))
- Add AppBar, Breadcrumb, and DividerDot components ([b0efb7](https://github.com/techniq/svelte-ux/commit/b0efb7b30e813b55e7acc34321e3cb9d084396ec))
- Update hover opacity from 4% to 5% to match tailwind defaults ([b79c3c](https://github.com/techniq/svelte-ux/commit/b79c3c98998e7fb1167ae99c7ec3bd5f8d0868f9))
- Disable ssr until layout shift if identified/fixed ([ac4e03](https://github.com/techniq/svelte-ux/commit/ac4e03b72365f68ecfafe0559eceea623766ba71))
- Add @mdi/js ([21432c](https://github.com/techniq/svelte-ux/commit/21432c1f5391279b5c1588ede13305d315ac9804))
- Add AppLayout and Backdrop components. Add matchMedia and portal actions. Add missing component exports ([bdb812](https://github.com/techniq/svelte-ux/commit/bdb812764d5ec965c252e72f73d992cdcff476c3))
- Add Button, Stack, and SectionDivider components ([339859](https://github.com/techniq/svelte-ux/commit/339859db935181589a4872249a75c1dc3933308a))
- Update tailwind to scan \*.md files as well ([90d3b6](https://github.com/techniq/svelte-ux/commit/90d3b659b997504a40bcbfe4cdae342cad50ffec))
- Require wrapping example in <Preview> for better control ([69c963](https://github.com/techniq/svelte-ux/commit/69c96399f1ef3dc89aae8d97a61e3142469a4cb4))
- Adjust header style ([9d0a02](https://github.com/techniq/svelte-ux/commit/9d0a02566862f416ca1d57f88e27e1c3b0e7f90b))
- Setup SvelteKit static adapter ([c5858b](https://github.com/techniq/svelte-ux/commit/c5858bba0b0b7eb2ab2f7d457ef1ba83d153b62e))
- Re-enable code highlighting ([cf7ed7](https://github.com/techniq/svelte-ux/commit/cf7ed7ce8c3c862fda4b76c50ef6a717712c9c69))
- Adjust doc styles ([1c2a95](https://github.com/techniq/svelte-ux/commit/1c2a956288f0cb07d1f2e3dba44167a38cd05ef0))
- Add Grid component and cssVars actions. ([0af92f](https://github.com/techniq/svelte-ux/commit/0af92fb3144135d53c6a898fae04af59433b20c2))
- Add code preview ([7a2751](https://github.com/techniq/svelte-ux/commit/7a27514ffea36f37c8a9af0a9a62d4f9a9d6d9e5))
- Setup Tailwind ([ac4ff6](https://github.com/techniq/svelte-ux/commit/ac4ff60040b5b3a00f6083060f77f08b8edcfb57))
- Add Icon component ([94392a](https://github.com/techniq/svelte-ux/commit/94392aa3c40ef0faff31a7385fd756e7ebea7f56))
- Add "npm run package" and upgrade SvelteKit ([51aa7d](https://github.com/techniq/svelte-ux/commit/51aa7dd74dc3c370b72170f420314e95425710e7))
- Setup mdsvex for docs ([22b1b7](https://github.com/techniq/svelte-ux/commit/22b1b7b7baec2ebcee4093f91c0aaba3657ec5f0))
- Upgrade dependencies ([19d98d](https://github.com/techniq/svelte-ux/commit/19d98db60ca703ebed206b49f064f74d0ebc018f))
- Rename package to svelte-ux ([6889fa](https://github.com/techniq/svelte-ux/commit/6889fa449ff9cadf752ce31828100fcde3263000))
- Add license, author, and repository ([ec1c76](https://github.com/techniq/svelte-ux/commit/ec1c7674881f0c30230066730281dffc98a1bd64))
- Update package name ([b6d586](https://github.com/techniq/svelte-ux/commit/b6d586c86dd1016dbc10edfa7c8adf8863a3bdaa))
- Initial commit ([f62deb](https://github.com/techniq/svelte-ux/commit/f62deb87140f9f4e16942a780663df4f21fa8548))
