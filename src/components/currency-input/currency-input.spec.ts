import { newSpecPage } from '@stencil/core/testing';
import { CurrencyInput } from './currency-input';

const testFn = (symbol = '€', separator = '.', value = '0.00') => `
<currency-input currency-symbol="${symbol}" separator="${separator}" valid="" value="${value}">
       <mock:shadow-root>
         <div class="input-wrapper">
           <span class="input-wrapper__text" part="text">
             ${symbol}
           </span>
           <input class="input-wrapper__input" id="integer" min="0" part="input" type="number" value="${value.split(separator)[0]}">
           <span class="input-wrapper__text" part="text">
             ${separator}
           </span>
           <input class="input-wrapper__input" id="decimal" max="99" min="0" part="input" type="number" value="${value.split(separator)[1]}">
          </div>
        </mock:shadow-root>
      </currency-input>
`;

describe('currency-input', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [CurrencyInput],
      html: '<currency-input></currency-input>',
      autoApplyChanges: true,
    });

    // console.log({ root });
    expect(root).toEqualHtml(testFn());
  });

  it('should fallback to the default value (.) in case of undesired separator values', async () => {
    const { root, ...page } = await newSpecPage({
      components: [CurrencyInput],
      html: '<currency-input separator="foo"></currency-input>',
    });

    await page.waitForChanges();
    expect(root).toEqualHtml(`
      <currency-input currency-symbol="€" separator="foo" valid="" value="0.00">
       <mock:shadow-root>
         <div class="input-wrapper">
           <span class="input-wrapper__text" part="text">
             €
           </span>
           <input class="input-wrapper__input" id="integer" min="0" part="input" type="number" value="0">
           <span class="input-wrapper__text" part="text">
             .
           </span>
           <input class="input-wrapper__input" id="decimal" max="99" min="0" part="input" type="number" value="00" >
          </div>
        </mock:shadow-root>
      </currency-input>
`);
  });

  it("should display an error if the value doesn't match the /d+(.|,)d{2}/ pattern", async () => {
    const { root, ...page } = await newSpecPage({
      components: [CurrencyInput],
      html: '<currency-input value=".000"></currency-input>',
    });

    await page.waitForChanges();
    expect(root).toEqualHtml(`
      <currency-input currency-symbol="€" separator="." valid="" value=".000">
       <mock:shadow-root>
         <div class="input-wrapper">
           <span class="input-wrapper__text" part="text">
             €
           </span>
           <input class="error input-wrapper__input" id="integer" min="0" part="input" type="number" value="">
           <span class="input-wrapper__text" part="text">
             .
           </span>
           <input class="error input-wrapper__input" id="decimal" max="99" min="0" part="input" type="number" value="000" >
          </div>
        </mock:shadow-root>
      </currency-input>
    `);
  });

  it('should display an error with wrongful values', async () => {
    const { root, doc, ...page } = await newSpecPage({
      components: [CurrencyInput],
      html: '<currency-input value="00.aa"></currency-input>',
    });

    await page.waitForChanges();
    expect(root).toEqualHtml(`
      <currency-input currency-symbol="€"  separator="." valid="" value="00.aa">
       <mock:shadow-root>
         <div class="input-wrapper">
           <span class="input-wrapper__text" part="text">
             €
           </span>
           <input class="error input-wrapper__input" id="integer" min="0" part="input" type="number" value="00">
           <span class="input-wrapper__text" part="text">
             .
           </span>
           <input class="error input-wrapper__input" id="decimal" max="99" min="0" part="input" type="number" value="aa" >
          </div>
        </mock:shadow-root>
      </currency-input>
    `);
  });
});
