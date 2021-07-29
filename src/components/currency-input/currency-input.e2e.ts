import { newE2EPage } from '@stencil/core/testing';

describe('currency-inputttt', () => {
  it('renders', async () => {
    const page = await newE2EPage({
      html: `
      <currency-input value="00.aa"></currency-input>
        `,
    });

    const integerInput = await page.find('currency-input >>> #integer');
    const classNameError = await integerInput.getProperty('className');

    expect(classNameError).toBe('input-wrapper__input error');
    await integerInput.press('Backspace');
    await integerInput.press('Backspace');
    await integerInput.press('4');

    const classNameClear = await integerInput.getProperty('className');

    expect(classNameClear).toBe('input-wrapper__input');
  });
});
