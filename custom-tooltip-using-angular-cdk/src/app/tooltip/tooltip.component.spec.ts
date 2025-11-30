import { provideZonelessChangeDetection } from '@angular/core';
import {TooltipComponent} from './tooltip.component';
import { render, RenderResult, screen } from '@testing-library/angular';

describe('Tooltip', () => {
  let component: RenderResult<TooltipComponent>;

  const renderComponent = () =>
    render(TooltipComponent, {
      providers: [provideZonelessChangeDetection()]
    });

  beforeEach(async () => {
    component = await renderComponent();
  });

  it('should display tooltip', async () => {
    const tooltipElement = screen.getByLabelText('tooltip');
    expect(tooltipElement).toBeTruthy();
  });

  it('should display tooltip text', async () => {
    const tooltipText = 'Sample Tooltip Text';
    await component.rerender({inputs: { tooltip: tooltipText }});
    component.detectChanges();

    const tooltipElement = screen.getByLabelText('tooltip');
    expect(tooltipElement.textContent).toContain(tooltipText);
  });
});
