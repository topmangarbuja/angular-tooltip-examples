import { TooltipDirective } from './tooltip.directive';
import {Component, provideZonelessChangeDetection} from '@angular/core';
import {fireEvent, render, screen} from '@testing-library/angular';
import {OverlayModule} from '@angular/cdk/overlay';

describe('TooltipDirective', () => {

  const renderComponent = () => render(TestComponent, {
    imports: [OverlayModule],
    declarations: [TooltipDirective],
    providers: [provideZonelessChangeDetection()]
  });

  beforeEach(async () => {
    await renderComponent();
  });

  it('should display tooltip on the enabled element', async () => {
    const button = screen.getByText('Enabled button');
    fireEvent.mouseEnter(button);

    const tooltip = screen.queryByLabelText('tooltip');
    expect(tooltip?.textContent).toContain('Enabled button Tooltip');
  });

  it('should not display tooltip when mouse leaves on the enabled element', async () => {
    const button = screen.getByText('Enabled button');
    fireEvent.mouseEnter(button);
    fireEvent.mouseLeave(button);

    const tooltip = screen.queryByLabelText('tooltip');
    expect(tooltip).toBeFalsy();
  });

  it('should not display tooltip on the disabled element', async () => {
    const button = screen.getByText('Disabled button');
    fireEvent.mouseEnter(button);

    const tooltip = screen.queryByLabelText('tooltip');
    expect(tooltip).toBeFalsy();
  });

  it('should not display tooltip on the empty tooltip element', async () => {
    const button = screen.getByText('Empty tooltip button');
    fireEvent.mouseEnter(button);

    const tooltip = screen.queryByLabelText('tooltip');
    expect(tooltip).toBeFalsy();
  });

  it('should not display tooltip on the whitespace tooltip element', async () => {
    const button = screen.getByText('Empty tooltip button');
    fireEvent.mouseEnter(button);

    const tooltip = screen.queryByLabelText('tooltip');
    expect(tooltip).toBeFalsy();
  });
});


@Component({
  imports: [
    TooltipDirective
  ],
  template: `
    <button appTooltip="Enabled button Tooltip">Enabled button</button>
    <button appTooltip="Disabled button Tooltip" disabled>Disabled button</button>
    <button appTooltip="">Empty tooltip button</button>
    <button appTooltip="  ">Empty whitespaces tooltip button</button>
  `
})
class TestComponent {
}
