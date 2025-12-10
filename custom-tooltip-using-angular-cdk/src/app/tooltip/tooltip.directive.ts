import {Directive, ElementRef, HostListener, inject, input, OnDestroy} from '@angular/core';
import {Overlay, OverlayRef} from '@angular/cdk/overlay';
import {ComponentPortal} from '@angular/cdk/portal';
import {TooltipComponent} from './tooltip.component';

@Directive({
  selector: '[appTooltip]'
})
export class TooltipDirective implements OnDestroy {
  appTooltip = input('');
  private overlayRef?: OverlayRef;
  private element = inject(ElementRef);

  constructor(private overlay: Overlay) {
  }

  @HostListener('mouseenter') onMouseEnter() {
    // Do not display tooltip if there is no tooltip text
    if (!this.appTooltip()) {
      return;
    }

    // Do not display tooltip if the host element is disabled
    if(this.element.nativeElement.disabled) {
      return;
    }

    // 1. Create the overlay position strategy
    this.overlayRef = this.overlay.create({
      positionStrategy: this.overlay.position()
        .flexibleConnectedTo(this.element.nativeElement)
        .withPositions([{
          originX: 'center',
          originY: 'bottom',
          overlayX: 'center',
          overlayY: 'top',
          offsetY: 10
        }])
    });

    // 2. Create a portal to render the tooltip component
    const toolTipPortal = new ComponentPortal(TooltipComponent);

    // 3. Attach the portal to the overlay and set tooltip text to the component instance
    const tooltipRef =  this.overlayRef.attach(toolTipPortal);
    tooltipRef.instance.tooltip = this.appTooltip();
  }

  // Detach the overlay when the mouse leaves the host element
  @HostListener('mouseleave') onMouseLeave() {
    this.overlayRef?.detach();
  }

  // Clean up the overlay when the directive is destroyed
  ngOnDestroy() {
    this.overlayRef?.dispose();
  }
}
