const PHONE_INPUT_EVENTS = {
  CHI_CHANGE: 'chiChange',
  CHI_INPUT: 'chiInput'
};
const FLOATING_LABEL = '-floating-label';
const SIZES = {
  sm: 'sm',
  md: 'md',
  lg: 'lg',
  xl: 'xl'
};

describe('Phone Input', () => {
  before(() => {
    cy.visit('tests/custom-elements/phone-input.html');
  });

  describe('Base', () => {
    beforeEach(() => {
      cy.get(`[data-cy='phone-input-base']`)
        .as('base')
        .children()
        .first()
        .children()
        .last()
        .find('input')
        .as('phoneInput');
      cy.get(`@base`)
        .find(`.chi-dropdown`)
        .as('dropdownTrigger');
    });

    it('Should have no default prefix set', () => {
      cy.get('@dropdownTrigger')
        .find('button')
        .should('have.text', 'Select country code');
    });

    it(`Should trigger the ${PHONE_INPUT_EVENTS.CHI_CHANGE} event when prefix changes`, () => {
      const spy = cy.spy();

      cy.get('body').then(el => {
        el.on(`${PHONE_INPUT_EVENTS.CHI_CHANGE}`, spy);
      });

      cy.get(`@dropdownTrigger`)
        .click()
        .find('.chi-dropdown__menu-item')
        .eq(3)
        .click()
        .then(() => {
          expect(spy).to.be.calledOnce;
        });
    });

    it(`Should trigger the ${PHONE_INPUT_EVENTS.CHI_CHANGE} event when suffix value changes`, () => {
      const spy = cy.spy();

      cy.get('body').then(el => {
        el.on(`${PHONE_INPUT_EVENTS.CHI_CHANGE}`, spy);
      });

      cy.get('@phoneInput')
        .type('123456789{Enter}')
        .then(() => {
          expect(spy).to.be.calledOnce;
          cy.get('@phoneInput').clear();
        });
    });

    it(`Should trigger the ${PHONE_INPUT_EVENTS.CHI_INPUT} event on input change`, () => {
      const spy = cy.spy();

      cy.get('body').then(el => {
        el.on(`${PHONE_INPUT_EVENTS.CHI_INPUT}`, spy);
      });

      cy.get('@phoneInput')
        .type('1{Enter}')
        .then(() => {
          expect(spy).to.be.calledOnce;
        });
      cy.get('@phoneInput')
        .clear()
        .then(() => {
          expect(spy).to.be.calledTwice;
        });
    });

    it('Should select a new country code successfully', () => {
      cy.get(`@dropdownTrigger`)
        .click()
        .find('.chi-dropdown__menu-item')
        .contains('+46')
        .click()
        .then(() => {
          cy.get('@dropdownTrigger')
            .find('button')
            .children()
            .last()
            .should('have.text', '+46');
          cy
            .get('@dropdownTrigger')
            .find('button')
            .find('.flag img').should.exist;
        });
    });

    it('Should search a country successfully', () => {
      cy.get(`@dropdownTrigger`)
        .click()
        .find('input')
        .as('searchInput')
        .type('af{Enter}')
        .then(() => {
          cy.get('@base')
            .find('.chi-dropdown__menu-items')
            .as('countryCodes')
            .children()
            .should('have.length', 3);
        });
      cy.get('@searchInput')
        .type('g{Enter}')
        .then(() => {
          cy.get('@countryCodes')
            .children()
            .should('have.length', 1);
          cy.get('@countryCodes')
            .children()
            .should('contain', 'Afghanistan');
        });
      cy.get('@searchInput').clear();
      cy.get('@dropdownTrigger').click();
    });

    it('Should reset country codes after a search', () => {
      cy.get(`@dropdownTrigger`)
        .click()
        .find('input')
        .as('searchInput')
        .type('franc{Enter}')
        .then(() => {
          cy.get('@base')
            .find('.chi-dropdown__menu-items')
            .as('countryCodes')
            .children()
            .should('have.length', 1);
          cy.get('@countryCodes')
            .children()
            .first()
            .click();
        });
      cy.get('@dropdownTrigger')
        .click()
        .then(() => {
          cy.get('@countryCodes')
            .children()
            .should('have.length', 243);
        });
      cy.get('@dropdownTrigger').click();
    });

    it('Should have a placeholder', () => {
      cy.get(`@phoneInput`)
        .should('have.attr', 'placeholder', 'Phone Number');
    });

    it(`Should have size -${SIZES.md} by default`, () => {
      cy.get(`@phoneInput`).should('have.class', `-${SIZES.md}`);
      cy.get(`@base`)
        .find(`chi-phone-input-prefix`)
        .should('have.attr', 'size', SIZES.md);
    });
  });

  describe('Default Prefix', () => {
    it('Should have a default prefix set', () => {
      cy.get(`[data-cy='phone-input-no-label']`)
        .find(`.chi-dropdown`)
        .find('button')
        .should('have.text', '+1');
    });
  });

  describe('Disabled', () => {
    it('Should show both the input and the dropdown as disabled', () => {
      cy.get(`[data-cy='phone-input-disabled']`)
        .as('disabledExample')
        .children()
        .first()
        .children()
        .last()
        .find('input')
        .should('have.attr', 'disabled');
      cy.get(`@disabledExample`)
        .find(`chi-phone-input-prefix`)
        .should('have.attr', 'disabled');
    });
  });

  describe('Sizes', () => {
    const sizes = [SIZES.sm, SIZES.md, SIZES.lg, SIZES.xl];

    sizes.forEach(size => {
      it(`Should have size ${size}`, () => {
        cy.get(`[data-cy='phone-input-${size}']`)
          .as('sizeExample')
          .children()
          .first()
          .children()
          .last()
          .find('input')
          .should('have.class', `-${size}`);
        cy.get(`@sizeExample`)
          .find(`chi-phone-input-prefix`)
          .should('have.attr', 'size', size);
      });
    });
  });
});
