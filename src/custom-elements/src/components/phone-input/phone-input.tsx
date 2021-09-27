import { Component, Event, EventEmitter, Prop, h, JSX, State } from '@stencil/core';

const DEFAULT_PREFIX = '+1';

@Component({
  tag: 'chi-phone-input',
  styleUrl: 'phone-input.scss',
  scoped: true
})
export class ChiPhoneInput {
  @Event() chiChange: EventEmitter<string>;
  @Event() chiError: EventEmitter<string>;
  @Event() chiInput: EventEmitter<string>;

  @Prop({ reflect: true }) disabled? = false;
  @Prop({ reflect: true }) error?: string;
  @Prop({ reflect: true }) defaultPrefix? = DEFAULT_PREFIX;
  @Prop({ reflect: true }) size?: 'sm' | 'md' | 'lg' | 'xl' = 'md';
  @Prop({ reflect: true }) placeholder? = 'Phone Number';

  @State() _error: string = null;
  @State() _prefix: string;
  @State() _suffix = '';

  _prefixSelectorChanged = (ev: CustomEvent<string>): void => {
    ev.stopPropagation();
    this._prefix = `+${ev.detail}`;
    this.chiChange.emit(`${this._prefix}${this._suffix}`);
  };

  _suffixInputChanged = (event: Event): void => {
    event.stopPropagation();
    this._suffix = (event.target as HTMLInputElement).value;
    if (this._suffix && this._suffix.trim()) {
      this.chiChange.emit(`${this._prefix}${this._suffix}`);
    } else {
      this.chiChange.emit('');
    }
  };

  _suffixInputted = (event: Event): void => {
    event.stopPropagation();
    this._error = null;
    this._suffix = (event.target as HTMLInputElement).value;
    if (this._suffix && this._suffix.trim()) {
      this.chiInput.emit(`${this._prefix}${this._suffix}`);
    } else {
      this.chiInput.emit('');
    }
  };

  render(): JSX.Element {
    return (
      <div class="chi-phone-input">
        <chi-phone-input-prefix
          disabled={this.disabled}
          class="-mr--1"
          value={this._prefix || this.defaultPrefix || ''}
          size={this.size}
          onChiChange={this._prefixSelectorChanged}
        />
        <div class={`chi-input__wrapper`}>
          <input
            class={`chi-input -${this.size} ${
              this.error || this._error ? '-danger' : ''
            }`}
            type="text"
            disabled={this.disabled}
            placeholder={this.placeholder}
            value={this._suffix}
            onChange={this._suffixInputChanged}
            onInput={this._suffixInputted}
          />
        </div>
      </div>
    );
  }
}
