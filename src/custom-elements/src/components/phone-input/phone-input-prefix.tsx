import {
  Component,
  Event,
  EventEmitter,
  Prop,
  State,
  Watch,
  h,
  JSX
} from '@stencil/core';
import { prefixes, TnPrefix } from './prefixes';

@Component({
  tag: 'chi-phone-input-prefix',
  styleUrl: 'phone-input.scss'
})
export class ChiInternationalTnPrefix {
  @Event() chiChange: EventEmitter<string>;

  @Prop({ reflect: true }) disabled = false;
  @Prop({ reflect: true }) size: 'sm' | 'md' | 'lg' | 'xl' = 'md';
  @Prop({ reflect: true }) value = '+1';

  @State() _opened = false;
  @State() _prefix: TnPrefix;
  @State() _search = '';

  _clickedOnComponent = false;

  componentWillLoad(): void {
    document.addEventListener('click', this._closeDropdown);
    this.changedPrefix();
  }

  componentDidUnload(): void {
    document.removeEventListener('click', this._closeDropdown);
  }

  @Watch('value')
  changedPrefix(): void {
    const code = this.value.trim().substr(1);
    const selectedPrefix: TnPrefix = prefixes.find(
      prefix => prefix.dialCode === code
    );

    if (selectedPrefix) {
      this._prefix = selectedPrefix;
    }
  }

  private _closeDropdown = (): void => {
    if (this._clickedOnComponent) {
      this._clickedOnComponent = false;
    } else {
      this._opened = false;
    }
  };

  render(): JSX.Element {
    return (
      <div
        class="chi-dropdown"
        onClick={(): void => {
          this._clickedOnComponent = true;
        }}
      >
        <button
          disabled={this.disabled}
          class={`chi-button chi-dropdown__trigger -${this.size}`}
          onClick={(): void => {
            this._opened = !this._opened;
          }}
        >
          {this._prefix
            ? [
                <span class="flag">
                  <img
                    src={`data:image/png;base64, ${this._prefix.flag}`}
                    alt={`${this._prefix.name} flag`}
                  />
                </span>,
                <span>{`+${this._prefix.dialCode}`}</span>
              ]
            : 'Select country code'}
        </button>
        <div class={`chi-dropdown__menu ${this._opened ? '-active' : ''}`}>
          <div class="chi-input__wrapper -icon--left chi-dropdown__menu-item">
            <input
              class="chi-input -sm"
              type="text"
              placeholder="Search"
              value={this._search}
              onInput={(ev): void => {
                this._search = (ev.target as HTMLInputElement).value;
              }}
            />
            <i class="chi-icon icon-search" />
          </div>
          <div class="chi-dropdown__menu-items">
            {prefixes
              .filter(prefix => {
                return (
                  prefix.name
                    .toLowerCase()
                    .indexOf(this._search.toLowerCase()) > -1
                );
              })
              .map(prefix => (
                <a
                  class="chi-dropdown__menu-item"
                  onClick={(): void => {
                    this._prefix = prefix;
                    this._search = '';
                    this.chiChange.emit(prefix.dialCode);
                    this._opened = false;
                  }}
                >
                  <span class="flag">
                    <img
                      src={`data:image/png;base64, ${prefix.flag}`}
                      alt={`${prefix.name} flag`}
                    />
                  </span>
                  <span>{prefix.name}</span>
                  <span class="-text--grey">{`+${prefix.dialCode}`}</span>
                </a>
              ))}
          </div>
        </div>
      </div>
    );
  }
}
