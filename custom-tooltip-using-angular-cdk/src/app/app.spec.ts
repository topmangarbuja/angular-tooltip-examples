import { provideZonelessChangeDetection } from '@angular/core';
import { App } from './app';
import {fireEvent, render, screen} from '@testing-library/angular';

describe('App', () => {

  const renderComponent = () => render(App, {
    providers: [provideZonelessChangeDetection()]
  });

  beforeEach(async () => {
    await renderComponent();
  });

  it('should render title', () => {
    expect(screen.getByText('Basic custom tooltip example using angular cdk')).toBeTruthy();
  });

  [
    ['Github', 'Go to Github repository'],
    ['Home', 'Go to Home page'],
    ['Exit', 'Exit from the site']
  ]
    .forEach(([label, tooltipText]) => {
      it(`should display tooltip for button with ${label} icon`, async () => {
        const button = screen.getByLabelText(label);
        fireEvent.mouseEnter(button);

        const tooltip = screen.queryByLabelText('tooltip');
        expect(tooltip!.textContent).toContain(tooltipText);
      })
    });

  it('should not display tooltip when hovering over the disable button', async () => {
    const button = screen.getByLabelText('Fire');
    fireEvent.mouseEnter(button);

    const tooltip = screen.queryByLabelText('tooltip');
    expect(tooltip).toBeFalsy();
  });
});
