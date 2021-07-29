import { Component, Prop, h, Listen } from '@stencil/core';

@Component({
  tag: 'currency-input',
  styleUrl: 'currency-input.css',
  shadow: true,
})
export class CurrencyInput {
  @Prop({ reflect: true, mutable: true }) value: string;
  @Prop({ reflect: true, mutable: true }) currencySymbol: string = '€';
  @Prop({ reflect: true, mutable: true }) separator: string = `,`;

  constructor() {
    if (!this.value || this.value?.trim() === '') {
      const separator = this.separatorOutput();
      this.value = `0${separator}00`;
    }
  }

  private splittedValue(): string[] {
    let separator = this.separatorOutput();
    return `${this.value}`.split(separator);
  }

  @Listen('blur', { capture: true })
  @Listen('onchange', { capture: true })
  handleChange({ target }) {
    const value = `${target.value}`.trim();
    const separator = this.separatorOutput();
    if (target.id === 'integer') {
      this.value = `${value}${separator}${this.splittedValue()[1]}`;
    }

    if (target.id === 'decimal') {
      this.value = `${this.splittedValue()[0]}${separator}${value}`;
    }
  }

  private separatorOutput(): string {
    if (this.separator.match(/\.|\,/) === null) {
      return '.';
    }

    return this.separator;
  }

  render() {
    return (
      <div class="input-wrapper">
        <span class="input-wrapper__text">{this.currencySymbol}</span>
        <input type="number" id="integer" min="0" onKeyUp={this.handleChange.bind(this)} onBlur={this.handleChange.bind(this)} value={this.splittedValue()[0]} />
        <span class="input-wrapper__text">{this.separatorOutput()}</span>
        <input type="number" id="decimal" min="0" max="99" onKeyUp={this.handleChange.bind(this)} onBlur={this.handleChange.bind(this)} value={this.splittedValue()[1]} />
      </div>
    );
  }
}
