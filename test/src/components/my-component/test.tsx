import { Component, Prop, h, Host, Element, State, Event, EventEmitter, Listen, Watch } from '@stencil/core';

@Component({
  tag: 'corporate-search',
  styleUrl: 'corporate-search.scss',
  shadow: true,
})
export class CorporateSearch {
  @Element() element: HTMLCorporateSearchElement;

  url  = 'https://pkg-cdn.digitalpfizer.com/corporate/diseases-list.yaml'

  /**
   * Load config from file to query against
   */
  @Prop() public configPath;

  /**
   * Load config directly from in tag
   */
  @Prop() public config;

  /**
   * Load config from to autosuggest or autocomplete
   */
  @Prop() public suggestPath;

  /**
   * Load config directly from in tag
   */
  @Prop() public suggest;

  /**
   * Does the config allow for filters so we know which required config to match.
   */
  @Prop() public hasFilters = false;

  /**
   * track that the index config is loaded
   */
  @State() private configurationQueryLoaded;

  /**
   * provides a visual Ui to let user know to add config
   */
  @State() private configurationNeedsUpdating = false;

  /**
   * track that the autosuggest config is loaded
   */
  @State() private configurationSuggestLoaded;

  /**
   * track the results data received
   */
  @State() private searchResultsRetrieved: boolean;

  /**
   * allow for autcomplete
   */
  @State() private hasAutoComplete: boolean;

  /**
   * saved autocomplete results
   */
  @State() private autoCompleteResults;

  /**
   * trackable state of the autosuggest dropdown
   */
  @State() private suggestedDropdownIsOpen;

  /**
   * if API loading
   */
  @State() private resultsLoading: boolean;

  /**
   * value of input
   */
  @State() value: string;

  /**
   * the submitted value
   */
  @State() submittedValue: string;

  /**
   * the search results
   */
  @State() searchResults;

  /**
   * the fetch information with results
   */
  @State() searchResultsMetadata;

  /**
   * filtering by term
   */
  @State() filterByTerm;

  /**
   * emits event to modal to update UI
   */
  @Event({ bubbles: true }) searchIsRetrieving: EventEmitter;

  /**
   * emits event to modal to update UI
   */
  @Event({ bubbles: true }) searchIsCompleted: EventEmitter;

  // This handler emits an event to say a term has been selected.
  private searchIsRetrievingHandler(loading: boolean): void {
    this.searchIsRetrieving.emit({
      loading,
    });

    // local tracking if needed
    this.resultsLoading = true;
  }

  // This handler emits an event to say a term has been selected.
  private searchIsCompletedHandler(completed: boolean): void {
    this.searchIsCompleted.emit({
      completed,
    });

    // local tracking if needed
    this.resultsLoading = false;
  }

  /**
   * fetch as JSON structure
   */
  private async fetchSrcAsJson(file): Promise<[]> {
    const fetchResponse = await fetch(file).catch();
    const fileResponse = await fetchResponse.json();
    return fileResponse;
  }

  private errorHandler(error) {
    console.log('😔 error', error);
  }

  /**
   * construct the results fetch-able string
   */
  private constructResultsUrl(object, inputText) {
    const { domain, endpoint, index, pageNumber, pageSize, fuzziness } = object;

    // configuration allows for single string for index or array
    const dataIndex = typeof index == 'string' ? index : index.join('%2C');

    return `${domain}${endpoint}?keyword=${inputText}&pageNumber=${pageNumber}&pageSize=${pageSize}&index=${dataIndex}&fuzziness=${fuzziness ? fuzziness : '1'}`;
  }

  /**
   * construct the fetch-able string with filtering
   */
  private constructResultsByFilterUrl(object, inputText) {
    // allowedExposedFilters is available but we are just setting to only 'type' for now
    const { domain, endpoint, index, pageNumber, pageSize, fuzziness, aggregations } = object;

    // remove whitepsace and convert to url friendly
    const availableAggregations = aggregations.replace(new RegExp(' ', 'g'), '').replace(new RegExp(',', 'g'), '%2C');

    // We reference the HTML entity decoded:  { type : THEFILTER } if the filters are not empty or all
    const filterByArg = this.filterByTerm == 'all' ? `` : `&include=%7B%22type%22%3A%22${this.filterByTerm}%22%7D`;

    // configuration allows for single string for index or array
    const dataIndex = typeof index == 'string' ? index : index.join('%2C');
    const standardQueryUrl = `${domain}${endpoint}?keyword=${inputText}&pageNumber=${pageNumber}&pageSize=${pageSize}&index=${dataIndex}&fuzziness=${fuzziness ? fuzziness : '1'}`;

    return `${standardQueryUrl}&aggregations=${availableAggregations}${filterByArg}`;
  }

  private async handleSearchQuery(configObject, inputText, isFilterable = false): Promise<void> {
    const queryUrl = isFilterable ? this.constructResultsByFilterUrl(configObject, inputText) : this.constructResultsUrl(configObject, inputText);

    try {
      const response = await fetch(queryUrl);

      if (!response.ok) {
        console.error('response error: ', response);
        throw new Error(response.statusText);
      }

      const json = await response.json();

      this.searchResultsRetrieved = true;
      this.submittedValue = inputText;

      this.searchResults = json?.data?.results.length
        ? json.data.results.map(result => {
            return result;
          })
        : false;

      this.searchResultsMetadata = json?.pagination;
      this.searchIsCompletedHandler(true);
    } catch (error) {
      this.errorHandler(error);
      this.searchIsCompletedHandler(true);
    }
  }

  /**
   * constructs the appropriate URL
   */
  private constructSuggestUrl(suggestConfiguration, inputText) {
    const { domain, endpoint, index, size, fuzziness } = suggestConfiguration;
    return `${domain}${endpoint}?text=${inputText ? inputText : ' '}&size=${size}&index=${index}&fuzziness=${fuzziness ? fuzziness : '1'}`;
  }

  private async handleSuggestQuery(inputText): Promise<void> {
    const suggestConfiguration = this.configurationSuggestLoaded;
    const queryUrl = this.constructSuggestUrl(suggestConfiguration, inputText);

    try {
      const response = await fetch(queryUrl);

      if (!response.ok) {
        console.error('response error: ', response);
        throw new Error(response.statusText);
      }

      const json = await response.json();

      const isAvailableSuggestions = json?.data?.length ? true : false;

      if (isAvailableSuggestions) {
        this.autoCompleteResults = json.data.map(result => {
          return result.suggest;
        });
      } else {
        this.clearAutoSuggestResults();
      }
    } catch (error) {
      this.errorHandler(error);
    }
  }

  /**
   * Validates the configuration files when initially loaded
   */
  private validateConfigurationFile(config, requiredKeys) {
    // requiredKeys is temp for now until we have interfaces
    const availableKeys = Object.keys(config);

    return requiredKeys.every(i => {
      return availableKeys.includes(i);
    });
  }

  /**
   * loads the autocomplete config
   */
  private async loadAutocompleteConfiguration(): Promise<void> {
    const inValidSuggestPath = !this.suggestPath || typeof this.suggestPath == 'undefined' || this.suggestPath.length < 5;
    const inValidSuggest = !this.suggest || typeof this.suggest == 'undefined' || this.suggest.length < 5;

    if (inValidSuggestPath && inValidSuggest) {
      this.hasAutoComplete = false;
      return;
    }

    const fileResponse = (this.suggest && JSON.parse(this.suggest)) || (await this.fetchSrcAsJson(this.suggestPath));

    // temporary validation until we have interface or contracts
    const requiredKeys = ['domain', 'endpoint', 'index', 'size'];
    const isValidConfiguration = this.validateConfigurationFile(fileResponse, requiredKeys);

    if (!isValidConfiguration) {
      console.error('an error has occured with your configuration with required values');
      return;
    }

    this.configurationSuggestLoaded = fileResponse;
    this.hasAutoComplete = true;
  }

  /**
   * loads the search config
   */
  private async loadSearchConfiguration(): Promise<void> {
    const inValidConfigPath = !this.configPath || typeof this.configPath == 'undefined' || this.configPath.length < 5;
    const inValidConfig = !this.config || typeof this.config == 'undefined' || this.config.length < 5;

    // detect missing config and notify user
    if (inValidConfigPath && inValidConfig) {
      this.configurationNeedsUpdating = true;

      console.error('missing configuration file for search');
      return;
    }

    const fileResponse = (this.config && JSON.parse(this.config)) || (await this.fetchSrcAsJson(this.configPath));

    this.configurationNeedsUpdating = false;

    // temporary validation until we have interface or contracts
    const requiredKeysForBasicSearch = ['domain', 'endpoint', 'index', 'pageNumber', 'pageSize'];
    const requiredKeysForFilteredSearch = [...requiredKeysForBasicSearch, ...['allowedExposedFilters', 'aggregations']];
    const requiredKeys = this.hasFilters ? requiredKeysForFilteredSearch : requiredKeysForBasicSearch;
    const isValidConfiguration = this.validateConfigurationFile(fileResponse, requiredKeys);

    if (!isValidConfiguration) {
      console.error('an error has occured with your configuration with required values');
      return;
    }

    this.configurationQueryLoaded = fileResponse;
  }

  /**
   * receives clearing of all binded states
   */
  private handleClear() {
    // close dropdown
    this.clearAutoSuggestResults();

    this.value = '';
    this.searchResults = false;
    this.searchResultsMetadata = false;
    this.searchResultsRetrieved = false;
  }

  /**
   * handles the submission of the query
   */
  private handleSubmittingOfQuery(submittedPhrase: string) {
    this.clearAutoSuggestResults();
    this.searchIsRetrievingHandler(true);
    this.searchResults = false;
    this.searchResultsRetrieved = false;

    // fire search api ~
    this.handleSearchQuery(this.configurationQueryLoaded, submittedPhrase, this.hasFilters);
  }

  /**
   * Preset list of filters for initial phase
   */
  private loadAvailableFiltersInUi() {
    return [
      {
        label: 'All',
        filter: 'all',
      },
      {
        label: 'Article',
        filter: 'article',
      },
      {
        label: 'Page',
        filter: 'page',
      },
      {
        label: 'Person',
        filter: 'person',
      },
      {
        label: 'Podcast',
        filter: 'podcast',
      },
      {
        label: 'Press Release',
        filter: 'press_release',
      },
      {
        label: 'Product',
        filter: 'product',
      },
    ];
  }

  /**
   * Receives input being updated from <corporate-search-field>
   */
  @Listen('handleSearchInputChange', { target: 'window' })
  protected searchInputChangeEventHandler(event: CustomEvent): void {
    // return if proper config isn't loaded
    if (!this.hasAutoComplete) return;

    if (event?.detail?.searchTerm) {
      this.value = event.detail.searchTerm;
      if (this.value.length < 3) return;

      // fire autosuggest api ~
      this.handleSuggestQuery(this.value);
    }
  }

  /**
   * Receives clear being fired from <corporate-search-field>
   */
  @Listen('handleClearSearch', { target: 'window' })
  protected clearSearchEventHandler(event: CustomEvent): void {
    if (typeof event == 'undefined' || event.type != 'handleClearSearch') return; // doesn't send detail so just get key

    this.handleClear();
  }

  /**
   * Receives submitted search being fired from <corporate-search-field>
   */
  @Listen('handleSearch', { target: 'window' })
  protected searchSubmitEventHandler(event: CustomEvent): void {
    if (event?.detail?.searchTerm) {
      const submittedText = event?.detail?.searchTerm;
      if (submittedText.length < 3) return;

      // submission of search query
      this.handleSubmittingOfQuery(submittedText);
    }
  }

  /**
   * Receives event that dropdown word has been clicked.
   */
  @Listen('suggestedTermSelected', { target: 'window' })
  protected suggestedTermSelectedHandler(event: CustomEvent): void {
    if (event?.detail?.word) {
      const emittedWord = event.detail.word;
      this.value = emittedWord;

      // updates the child component value
      this.setSearchFieldComponentInputValue(this.value);

      // submission of search query
      this.handleSubmittingOfQuery(this.value);
    }
  }

  /**
   * Receives event that filter has been selected.
   */
  @Listen('activatedFilters', { target: 'window' })
  protected activatedFiltersHandler(event: CustomEvent): void {
    if (event?.detail?.filters) {
      const receivedFilter = event?.detail?.filters;

      // enforce we only want to apply 1 filter at once
      if (receivedFilter.length !== 1) return;

      if (receivedFilter[0] != this.filterByTerm) {
        this.filterReceivedUpdateHandler(receivedFilter[0]);
      }
    }
  }

  /**
   * sets filter term and re-fires api query
   */
  private filterReceivedUpdateHandler(filterTerm: string): void {
    if (typeof filterTerm !== 'string') return;

    // do not submit again for same filter since unneeded
    if (this.filterByTerm == filterTerm) return;

    this.filterByTerm = filterTerm;

    // submission of search query
    this.handleSubmittingOfQuery(this.value);
  }

  /**
   * targets and updates the <corporate-search-field>
   */
  private setSearchFieldComponentInputValue(phrase: string) {
    const searchFieldComponent = this.element.shadowRoot.querySelector('corporate-search-field');

    if (typeof searchFieldComponent !== 'undefined') {
      searchFieldComponent.setSearchValue(phrase);
    }
  }

  /**
   * clears out the autosuggest be resetting the array to empty
   */
  private clearAutoSuggestResults() {
    this.autoCompleteResults = [];
  }

  private configurationComponentLoaders() {
    this.loadAutocompleteConfiguration();
    this.loadSearchConfiguration();
    this.clearAutoSuggestResults();
  }

  /**
   * loading methods
   */
  componentWillLoad(): void {
    // load 'all' filter by default
    this.filterByTerm = 'all';

    this.configurationComponentLoaders();
  }

  @Watch('config')
  @Watch('configPath')
  @Watch('suggest')
  @Watch('suggestPath')
  suggestedTermsWatcher(newValue: string | []): void {
    if (newValue == null || newValue == undefined) return;

    // on config change, make sure to re-instantiate the config
    this.configurationComponentLoaders();
  }

  /**
   * Generate the classes for component.
   */
  private createSearchClassNames(): Record<string, boolean> {
    return {
      'corporate-search': true,
      'corporate-search--has-auto-complete': this.hasAutoComplete,
      'corporate-search--search-results-retrieved': this.searchResultsRetrieved,
      'corporate-search--is-showing-dropdown': this.suggestedDropdownIsOpen,
    };
  }

  private searchResultsCounter(metadata, submittedValue): JSX.Element {
    if (!metadata) return;
    const resultCount = metadata.total_results;

    return (
      <div class="corporate-search--count-results">
        <b>{resultCount}</b> search results for <b>{submittedValue}</b>
      </div>
    );
  }

  render(): JSX.Element {
    this.suggestedDropdownIsOpen = this.autoCompleteResults.length > 0 ? true : false;

    const {
      hasFilters,
      value,
      submittedValue,
      searchResults,
      searchResultsMetadata,
      resultsLoading,
      autoCompleteResults,
      searchResultsRetrieved,
      suggestedDropdownIsOpen,
      filterByTerm,
      configurationNeedsUpdating,
    } = this;

    const retrievedResultsList = searchResultsRetrieved && !suggestedDropdownIsOpen && !resultsLoading;
    // constructing filter in array for now
    const constructedFilter = [filterByTerm];

    return (
      <Host>
        <div class={this.createSearchClassNames()}>
          {/* visual cue to load config */}
          {configurationNeedsUpdating ? (
            <div class="corporate-search--missing-config">
              <p>Search Component: add proper configuration settings to load</p>
            </div>
          ) : (
            <div class="corporate-search--layout">
              {/* corporate-search--layout-top */}
              <div class="corporate-search--layout-top">
                <corporate-search-field placeholder="How can we help you?" showSearchButton={true} showClearButton={true}></corporate-search-field>
              </div>

              {/* corporate-search--layout-middle */}
              <div class="corporate-search--layout-middle">
                {retrievedResultsList && searchResultsMetadata ? this.searchResultsCounter(searchResultsMetadata, submittedValue) : false}

                {suggestedDropdownIsOpen ? (
                  <div class="corporate-search-show-suggestions-wrapper corporate-search-show-suggestions-wrapper--visible">
                    <corporate-search-dropdown suggestedTerms={autoCompleteResults} searchedWord={value}></corporate-search-dropdown>
                  </div>
                ) : null}

                {hasFilters && searchResultsRetrieved && !suggestedDropdownIsOpen ? (
                  <div class="corporate-search-display-filters">
                    <corporate-filter headline="Show More" filters={this.loadAvailableFiltersInUi()} activeFilters={constructedFilter} is-single-select="true"></corporate-filter>
                  </div>
                ) : null}
              </div>

              {/* corporate-search--layout-bottom */}
              <div class="corporate-search--layout-bottom">
                {retrievedResultsList && searchResults.length
                  ? searchResults.map(resultData => {
                      return <corporate-text-search-result dataSource={resultData} highlightedWord={submittedValue}></corporate-text-search-result>;
                    })
                  : null}
              </div>
            </div>
          )}
        </div>
      </Host>
    );
  }
}
